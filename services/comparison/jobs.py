"""Single-process search coordinator and durable, immutable inventory versions."""
import asyncio
from dataclasses import asdict
from datetime import datetime, timezone
import hashlib
import json
import logging
from pathlib import Path
import secrets
import sqlite3
import time
from urllib.parse import urlencode

from inventory import COLLECTIONS, IRSA, MAX_RECORDS, Search, matches, nearby_distance, normalize, sia_params, spherex_tap_url
from transport import Suspended

ADAPTER_VERSION = "spherex-slideshow-5-nearby"
DAY = 86400
ACTIVE = ("queued", "running")
log = logging.getLogger("comparison.jobs")


def stamp():
    return datetime.now(timezone.utc).isoformat()


def search_key(search):
    values = asdict(search)
    for field in ("ra", "dec", "size", "wave_min", "wave_max", "nearby_radius"):
        if values[field] is not None:
            values[field] = float(values[field])
    return hashlib.sha256(json.dumps([ADAPTER_VERSION, values], sort_keys=True).encode()).hexdigest()


class Store:
    def __init__(self, path, limit=256 * 1024 * 1024, clock=time.time):
        if limit < 1024 * 1024:
            raise ValueError("Metadata cache must be at least 1 MiB")
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        self.db = sqlite3.connect(path)
        self.db.execute("PRAGMA auto_vacuum=FULL")
        self.db.execute("PRAGMA journal_mode=WAL")
        self.db.executescript('''
          CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, key TEXT, created REAL, accessed REAL, body TEXT);
          CREATE INDEX IF NOT EXISTS jobs_key ON jobs(key, created);
          CREATE TABLE IF NOT EXISTS versions (id TEXT PRIMARY KEY, job TEXT, created REAL, accessed REAL, body TEXT);
          CREATE INDEX IF NOT EXISTS versions_job ON versions(job);
          CREATE TABLE IF NOT EXISTS requests (created REAL, body TEXT);
        ''')
        self.limit, self.clock = limit, clock
        self.collection_bytes = max(256, min(1024 * 1024, limit // 128))
        self.job_reserve = 2 * (6 * (self.collection_bytes + 2048) + 4096)
        for (raw,) in self.db.execute("SELECT body FROM jobs").fetchall():
            job = json.loads(raw)
            if job["state"] in ACTIVE:
                job["state"] = "interrupted"
                for collection in job["collections"].values():
                    if collection["state"] not in ("complete", "partial"):
                        collection.update(state="interrupted", error="Search interrupted by service restart")
                self.save(job)
        self.prune()

    def close(self):
        self.db.close()

    def save(self, job):
        job["updatedAt"] = stamp()
        with self.db:
            self.db.execute("INSERT INTO jobs VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET body=excluded.body, accessed=excluded.accessed",
                (job["id"], job["key"], job["created"], self.clock(), json.dumps(job)))

    def get(self, job_id):
        row = self.db.execute("SELECT body FROM jobs WHERE id=?", (job_id,)).fetchone()
        if not row:
            raise KeyError("Search expired or does not exist. Run the search again.")
        with self.db:
            self.db.execute("UPDATE jobs SET accessed=? WHERE id=?", (self.clock(), job_id))
        return json.loads(row[0])

    def latest(self, key):
        row = self.db.execute("SELECT id FROM jobs WHERE key=? ORDER BY created DESC, rowid DESC LIMIT 1", (key,)).fetchone()
        return self.get(row[0]) if row else None

    def publish(self, job):
        products = {}
        for collection in job["collections"].values():
            for product in collection.get("products", []):
                products.setdefault(product["id"], product)
        items = sorted(products.values(), key=lambda p: (not (p["observedStart"] or p["observedEnd"]), p["observedStart"] or p["observedEnd"] or "", p["id"]))
        search = Search(**job["search"])
        if search.nearby_radius:
            items.sort(key=lambda p: (nearby_distance(p, search), p["id"]))
        job["truncated"] = len(items) > MAX_RECORDS or any(c.get("truncated", False) for c in job["collections"].values())
        job["total"] = min(len(items), MAX_RECORDS)
        version = secrets.token_urlsafe(18)
        dates = [c.get("verifiedAt") for c in job["collections"].values() if c.get("verifiedAt")]
        body = {"products": items[:MAX_RECORDS], "retrievedAt": stamp(), "truncated": job["truncated"],
            "verifiedAt": min(dates) if dates else None, "status": result_status(job)}
        with self.db:
            self.db.execute("INSERT INTO versions VALUES (?,?,?,?,?)", (version, job["id"], self.clock(), self.clock(), json.dumps(body)))
        job["version"] = version
        self.save(job)
        self.prune(protect=job["id"])

    def page(self, job_id, version, cursor=""):
        self.get(job_id)
        try:
            offset = int(cursor) if cursor else 0
            if offset < 0 or offset % 100:
                raise ValueError()
        except ValueError:
            raise ValueError("Invalid result cursor") from None
        row = self.db.execute("SELECT body FROM versions WHERE id=? AND job=?", (version, job_id)).fetchone()
        if not row:
            raise KeyError("Inventory version expired. Refresh the search.")
        with self.db:
            self.db.execute("UPDATE versions SET accessed=? WHERE id=?", (self.clock(), version))
        body = json.loads(row[0])
        items = body["products"]
        if offset and offset >= len(items):
            raise ValueError("Invalid result cursor")
        return {**body, "version": version, "products": items[offset:offset + 100], "total": len(items),
            "nextCursor": str(offset + 100) if offset + 100 < len(items) else None,
            "stale": bool(body.get("verifiedAt") and self.clock() - datetime.fromisoformat(body["verifiedAt"]).timestamp() >= (900 if body["status"] == "empty" else DAY)), "warnings": []}

    def product(self, job_id, version, product_id):
        job = self.get(job_id)
        row = self.db.execute("SELECT body FROM versions WHERE id=? AND job=?", (version, job_id)).fetchone()
        if row:
            product = next((p for p in json.loads(row[0])["products"] if p["id"] == product_id), None)
            if product:
                return Search(**job["search"]), product
        raise KeyError("Product or inventory version expired. Refresh the inventory.")

    def record(self, event):
        with self.db:
            self.db.execute("INSERT INTO requests VALUES (?,?)", (self.clock(), json.dumps(event)))
            self.db.execute("DELETE FROM requests WHERE rowid NOT IN (SELECT rowid FROM requests ORDER BY rowid DESC LIMIT 1000)")

    def last_archive(self):
        rows = self.db.execute("SELECT created,body FROM requests ORDER BY rowid DESC LIMIT 1000").fetchall()
        row = next((r for r in rows if json.loads(r[1]).get("error") != "Request interrupted"), None)
        if not row:
            return None
        event = json.loads(row[1])
        return {"ok": event.get("error") is None and event.get("httpStatus") == 200,
            "endpoint": event["endpoint"], "checkedAt": datetime.fromtimestamp(row[0], timezone.utc).isoformat(),
            "httpStatus": event.get("httpStatus"), "error": event.get("error")}

    def prune(self, protect=None, target=None):
        # Evict expired metadata first, then least recently used versions/jobs.
        # SQLite reuses freed pages; FULL auto-vacuum and bounded WAL avoid disk growth.
        now = self.clock()
        target = self.limit if target is None else target
        with self.db:
            for job_id, raw in self.db.execute("SELECT id,body FROM jobs WHERE created < ?", (now - 7 * DAY,)).fetchall():
                if json.loads(raw)["state"] not in ACTIVE and job_id != protect:
                    self.db.execute("DELETE FROM versions WHERE job=?", (job_id,))
                    self.db.execute("DELETE FROM jobs WHERE id=?", (job_id,))
            while True:
                size = sum(self.db.execute(f"SELECT COALESCE(SUM(length(CAST(body AS BLOB))),0) FROM {table}").fetchone()[0] for table in ("jobs", "versions", "requests"))
                if size <= target:
                    break
                # Old immutable versions may be evicted too. The current version is pinned.
                current = {json.loads(r[0]).get("version") for r in self.db.execute("SELECT body FROM jobs")}
                candidates = self.db.execute("SELECT id FROM versions ORDER BY accessed").fetchall()
                obsolete = next((v[0] for v in candidates if v[0] not in current), None)
                if obsolete:
                    self.db.execute("DELETE FROM versions WHERE id=?", (obsolete,))
                    continue
                candidate = next((r[0] for r in self.db.execute("SELECT id,body FROM jobs ORDER BY accessed").fetchall() if r[0] != protect and json.loads(r[1])["state"] not in ACTIVE), None)
                if not candidate:
                    break
                self.db.execute("DELETE FROM versions WHERE job=?", (candidate,))
                self.db.execute("DELETE FROM jobs WHERE id=?", (candidate,))
        self.db.execute("PRAGMA wal_checkpoint(TRUNCATE)")


def result_status(job):
    collections = list(job["collections"].values())
    complete = all(c["state"] == "complete" for c in collections if c["name"] != "spherex_native")
    if complete and not job["truncated"]:
        return "complete" if job["total"] else "empty"
    return "partial" if job["total"] or any(c["state"] in ("complete", "partial") for c in collections) else "error"


def public(job, now=time.time):
    collections = [{k: v for k, v in c.items() if k != "products"} for c in job["collections"].values()]
    dates = [c.get("verifiedAt") for c in collections if c.get("verifiedAt")]
    verified = min(dates) if dates else None
    status = result_status(job)
    ttl = 900 if status == "empty" else DAY
    age = now() - datetime.fromisoformat(verified).timestamp() if verified else None
    return {"id": job["id"], "state": job["state"], "status": status, "collections": collections,
        "updatedAt": job["updatedAt"], "verifiedAt": verified, "stale": age is not None and age >= ttl,
        "version": job.get("version"), "total": job["total"], "truncated": job["truncated"], "queueMs": job.get("queueMs")}


class Coordinator:
    def __init__(self, store, archive, queue_budget=30, execution_budget=120):
        self.store, self.archive = store, archive
        self.queue_budget, self.execution_budget = queue_budget, execution_budget
        self.worker = asyncio.Semaphore(1)
        self.tasks = set()

    def start(self, search, refresh=False):
        key = search_key(search)
        previous = self.store.latest(key)
        if previous and previous["state"] in ACTIVE:
            return public(previous, self.store.clock)
        if previous:
            view = public(previous, self.store.clock)
            verified = view["verifiedAt"]
            age = self.store.clock() - datetime.fromisoformat(verified).timestamp() if verified else float("inf")
            if age >= 7 * DAY:
                previous = None
            elif not refresh and view["status"] in ("complete", "empty") and not view["stale"]:
                return view
        if len(self.tasks) >= min(4, max(1, self.store.limit // self.store.job_reserve)):
            raise ValueError("Search queue is full. Retry shortly.")
        # Reserve bounded space for the new job and its current version before admission.
        self.store.prune(target=max(0, self.store.limit - self.store.job_reserve))
        collections = {}
        retry_only = previous and result_status(previous) in ("partial", "error")
        for name in COLLECTIONS[search.mission]:
            old = previous["collections"].get(name, {}) if previous else {}
            verified = old.get("verifiedAt")
            fresh = verified and self.store.clock() - datetime.fromisoformat(verified).timestamp() < DAY
            keep = retry_only and old.get("state") == "complete" and fresh
            collections[name] = {"name": name, "state": "complete" if keep else "queued", "attempts": 0,
                "error": None, "products": old.get("products", []), "verifiedAt": old.get("verifiedAt"),
                "truncated": old.get("truncated", False), "endpoint": "/SIA", "resultCount": len(old.get("products", []))}
        if previous and "spherex_native" in previous["collections"]:
            collections["spherex_native"] = previous["collections"]["spherex_native"]
        job = {"id": secrets.token_urlsafe(18), "key": key, "search": asdict(search), "created": self.store.clock(),
            "state": "queued", "collections": collections, "total": 0, "truncated": False, "version": None}
        self.store.save(job)
        if previous and previous["total"]:
            self.store.publish(job)
        queued = time.monotonic()
        task = asyncio.create_task(self.run(job, search, queued))
        self.tasks.add(task)
        task.add_done_callback(self.tasks.discard)
        return public(job, self.store.clock)

    async def close(self):
        for task in self.tasks:
            task.cancel()
        await asyncio.gather(*self.tasks, return_exceptions=True)

    async def run(self, job, search, queued):
        acquired = False
        try:
            remaining_queue = self.queue_budget - (time.monotonic() - queued) if self.queue_budget is not None else None
            if remaining_queue is not None and remaining_queue <= 0:
                raise TimeoutError("Queue budget exhausted")
            async with asyncio.timeout(remaining_queue):
                await self.worker.acquire()
            acquired = True
            job.update(state="running", queueMs=round((time.monotonic() - queued) * 1000))
            self.store.save(job)
            log.info("search_started job=%s queue_ms=%s", job["id"], job["queueMs"])
            deadline = time.monotonic() + self.execution_budget if self.execution_budget is not None else None
            async with asyncio.timeout(self.execution_budget):
                await asyncio.gather(*(self.collection(job, search, name, deadline) for name in COLLECTIONS[search.mission]
                    if job["collections"][name]["state"] != "complete"))
                # TAP cannot certify an individual SIA release. Keep failed states visible.
                if any(c["state"] != "complete" for n, c in job["collections"].items() if n != "spherex_native") and (deadline is None or time.monotonic() < deadline):
                    job["collections"]["spherex_native"] = {"name": "spherex_native", "state": "queued", "attempts": 0,
                        "products": job["collections"].get("spherex_native", {}).get("products", []),
                        "verifiedAt": job["collections"].get("spherex_native", {}).get("verifiedAt"), "error": None, "endpoint": "/TAP/sync"}
                    await self.collection(job, search, "spherex_native", deadline)
                elif all(job["collections"][n]["state"] == "complete" for n in COLLECTIONS[search.mission]):
                    job["collections"].pop("spherex_native", None)
            job["state"] = "finished"
        except TimeoutError:
            job["state"] = "timed_out"
            for c in job["collections"].values():
                if c["state"] in ("queued", "running", "retrying"):
                    c.update(state="error", error="Execution budget exhausted" if acquired else "Queue budget exhausted (30 seconds)")
        except asyncio.CancelledError:
            job["state"] = "interrupted"
            for c in job["collections"].values():
                if c["state"] in ("queued", "running", "retrying"):
                    c.update(state="interrupted", error="Search interrupted by service restart")
            raise
        except Exception:
            log.exception("search_failed job=%s", job["id"])
            job["state"] = "interrupted"
            for c in job["collections"].values():
                if c["state"] in ("queued", "running", "retrying"):
                    c.update(state="error", error="Search could not finish; retry")
        finally:
            job["queueMs"] = job.get("queueMs", round((time.monotonic() - queued) * 1000))
            self.store.publish(job)
            if acquired:
                self.worker.release()

    async def collection(self, job, search, name, deadline):
        collection = job["collections"][name]
        def progress(**changes):
            collection.update(changes)
            self.store.save(job)
        url = spherex_tap_url(search) if name == "spherex_native" else IRSA + "/SIA?" + urlencode(sia_params(search, name))
        try:
            rows, overflow = await self.archive.query(url, job["id"], deadline, progress)
            products = {}
            for row in rows:
                product = normalize(row, search.mission, name, url)
                if product and matches(product, search):
                    products.setdefault(product["id"], product)
            bounded, used, limited = [], 0, False
            ordered = sorted(products.values(), key=lambda p: (nearby_distance(p, search), p["id"])) if search.nearby_radius else products.values()
            for product in ordered:
                size = len(json.dumps(product).encode("utf-8"))
                if len(bounded) >= MAX_RECORDS or used + size > self.store.collection_bytes:
                    limited = True
                    break
                bounded.append(product)
                used += size
            collection.update(products=bounded, verifiedAt=stamp(),
                state="partial" if limited or overflow or len(rows) > MAX_RECORDS or name == "spherex_native" else "complete",
                error="Native TAP release/product equivalence is unverified" if name == "spherex_native" else None,
                truncated=limited or overflow or len(rows) > MAX_RECORDS, resultCount=len(products))
            self.store.publish(job)
        except asyncio.CancelledError:
            raise
        except Exception as error:
            collection.update(state="suspended" if isinstance(error, Suspended) else "error", error=str(error), resultCount=len(collection.get("products", [])))
            self.store.save(job)
