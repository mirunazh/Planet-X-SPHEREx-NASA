"""A weekly observing prompt and a small, durable set of prepared sky images."""
import asyncio
from datetime import datetime, timedelta, timezone
import json
import logging
from pathlib import Path
import time

from inventory import Search
from jobs import ACTIVE
from previews import PreviewBusy

log = logging.getLogger("comparison.challenges")
TARGET = ("M101 · the Pinwheel Galaxy", 210.80227, 54.34895, 6)
FRAME_LIMIT = 12
CHECK_INTERVAL = 6 * 3600


def weekly_target(now):
    date = datetime.fromtimestamp(now, timezone.utc).date()
    monday = date - timedelta(days=date.weekday())
    week = date.isocalendar()
    title, ra, dec, size = TARGET
    return {"id": f"{week.year}-W{week.week:02d}", "title": title,
        "startsAt": f"{monday.isoformat()}T00:00:00+00:00",
        "endsAt": f"{(monday + timedelta(days=7)).isoformat()}T00:00:00+00:00",
        "region": {"ra": ra, "dec": dec, "size": size}}


def candidates(products, preferred_band=None):
    # Keep one detector range so scrolling is more useful for visual comparison.
    groups = {}
    for product in products:
        if product.get("band"):
            groups.setdefault(product["band"], []).append(product)
    if not groups:
        return []
    band = preferred_band if preferred_band in groups else "SPHEREx-D3" if len(groups.get("SPHEREx-D3", [])) >= 2 else max(groups, key=lambda b: (len(groups[b]), b))
    items = sorted(groups[band], key=lambda p: (p.get("observedStart") or p.get("observedEnd") or "", p["id"]))
    # Spread the prepared set across observing dates; include the newest exposure.
    count = min(len(items), FRAME_LIMIT)
    primary = [round(i * (len(items) - 1) / max(1, count - 1)) for i in range(count)]
    backups = [i for i in range(len(items) - 1, -1, -1) if i not in primary]
    return [items[i] for i in (primary + backups)[:FRAME_LIMIT * 2]]


class WeeklyChallenge:
    def __init__(self, coordinator, previews, directory, clock=time.time, sleep=asyncio.sleep):
        self.coordinator, self.previews = coordinator, previews
        self.clock, self.sleep = clock, sleep
        self.path = Path(directory) / "weekly-challenge.json"
        self.path.parent.mkdir(parents=True, exist_ok=True)
        try:
            self.manifest = json.loads(self.path.read_text())
        except (FileNotFoundError, ValueError):
            self.manifest = {}
        self.task = None
        self.rollover()
        self.previews.protected = {frame["previewId"] for frame in self.manifest["frames"]}

    def rollover(self):
        target = weekly_target(self.clock())
        if self.manifest.get("id") != target["id"]:
            previous = self.manifest
            self.manifest = {**target, "state": "preparing", "checkedAt": previous.get("checkedAt"), "error": None,
                "frames": previous.get("frames", []), "found": previous.get("found", 0), "band": previous.get("band"),
                "inventoryStatus": previous.get("inventoryStatus"), "knownIds": previous.get("knownIds", []),
                "newIds": [], "baselineEstablished": previous.get("baselineEstablished", bool(previous.get("knownIds"))),
                "latestObservation": previous.get("latestObservation")}
            self.save()

    def save(self):
        self.previews.protected = {frame["previewId"] for frame in self.manifest["frames"]}
        temporary = self.path.with_suffix(".tmp")
        temporary.write_text(json.dumps(self.manifest))
        temporary.replace(self.path)

    def snapshot(self):
        self.rollover()
        frames = []
        for frame in self.manifest["frames"]:
            try:
                if self.previews.state(frame["previewId"])["state"] == "ready":
                    frames.append(frame)
            except KeyError:
                pass
        return {**{k: v for k, v in self.manifest.items() if k not in ("knownIds", "newIds", "baselineEstablished")}, "newThisWeek": len(self.manifest.get("newIds", [])), "frames": frames, "ready": len(frames), "target": FRAME_LIMIT,
            "prompt": "Watch this patch of sky. Scroll through the exposures and look for a source that moves or changes. Check the observation dates and detector range before drawing conclusions."}

    def next_delay(self):
        now = self.clock()
        checked = self.manifest.get("checkedAt")
        due = datetime.fromisoformat(checked).timestamp() + CHECK_INTERVAL if checked else now + CHECK_INTERVAL
        rollover_at = datetime.fromisoformat(weekly_target(now)["endsAt"]).timestamp()
        return max(1, min(CHECK_INTERVAL, due - now, rollover_at - now))

    def start(self):
        self.task = asyncio.create_task(self.run())

    async def run(self):
        while True:
            failed = False
            try:
                self.rollover()
                await self.prepare()
            except asyncio.CancelledError:
                raise
            except Exception:
                failed = True
                log.exception("Weekly challenge preparation failed")
                self.manifest.update(state="partial" if self.snapshot()["ready"] else "unavailable",
                    error="The archive could not be checked. Prepared images remain available; another check runs automatically.")
                self.save()
            await self.sleep(CHECK_INTERVAL if failed else self.next_delay())

    async def prepare(self):
        manifest = self.manifest
        if manifest.get("checkedAt") and self.clock() - datetime.fromisoformat(manifest["checkedAt"]).timestamp() < CHECK_INTERVAL and self.snapshot()["ready"] >= FRAME_LIMIT:
            manifest.update(state="ready")
            self.save()
            return
        manifest.update(state="preparing", error=None)
        self.save()
        created = self.coordinator.start(Search(**manifest["region"]), refresh=bool(manifest.get("checkedAt")))
        job_id = created["id"]
        while True:
            job = self.coordinator.store.get(job_id)
            if job["state"] not in ACTIVE:
                break
            await self.sleep(2)
        if not job.get("version"):
            raise ValueError("Archive inventory unavailable")
        products, cursor = [], ""
        while True:
            page = self.coordinator.store.page(job_id, job["version"], cursor)
            products.extend(page["products"])
            cursor = page["nextCursor"]
            if not cursor:
                break
        manifest.update(checkedAt=datetime.fromtimestamp(self.clock(), timezone.utc).isoformat(), found=len(products), inventoryStatus=page["status"])
        known = set(manifest.get("knownIds", []))
        discovered = {p["id"] for p in products}
        has_baseline = manifest.get("baselineEstablished", bool(known))
        new_ids = set(manifest.get("newIds", [])) | (discovered - known if has_baseline else set())
        manifest.update(baselineEstablished=has_baseline or bool(products) or page["status"] in ("complete", "empty"), knownIds=sorted(known | discovered)[-10000:], newIds=sorted(new_ids),
            latestObservation=max((p.get("observedEnd") or p.get("observedStart") or "" for p in products), default="") or manifest.get("latestObservation"))
        selected = candidates(products, manifest.get("band"))
        if not selected:
            manifest.update(state="partial" if manifest["frames"] else "unavailable",
                error="No suitable exposures are available for this region yet. The archive will be checked again.")
            self.save()
            return
        prepared, failed = [], 0
        for product in selected:
            if weekly_target(self.clock())["id"] != manifest["id"]:
                return
            while True:
                try:
                    entry = self.previews.ensure(job_id, job["version"], product["id"], retry=True)
                    break
                except PreviewBusy:
                    await self.sleep(2)
            while entry["state"] not in ("ready", "error"):
                await self.sleep(1)
                entry = self.previews.state(entry["id"])
            if entry["state"] == "ready" and entry.get("coverageFraction", 0) >= .5:
                prepared.append({"product": product, "previewId": entry["id"]})
                # Publish usable images immediately; keep last prepared set during rechecks.
                manifest.update(frames=prepared + [f for f in manifest["frames"] if f["product"]["id"] not in {p["product"]["id"] for p in prepared}][:FRAME_LIMIT-len(prepared)], band=product["band"])
                self.save()
            else:
                failed += 1
            if len(prepared) >= FRAME_LIMIT:
                break
            await self.sleep(.1)
        manifest.update(state="ready" if len(manifest["frames"]) >= FRAME_LIMIT else "partial" if manifest["frames"] else "unavailable",
            error=f"{failed} exposure(s) could not be prepared. Available images can be explored now." if failed else None)
        self.save()

    async def close(self):
        if self.task:
            self.task.cancel()
            await asyncio.gather(self.task, return_exceptions=True)
