import asyncio
from datetime import datetime, timezone
import json
from pathlib import Path
import tempfile
import time
import unittest
from urllib.parse import parse_qs, urlsplit

import httpx
from inventory import Search
from jobs import Coordinator, DAY, Store, public, search_key
from transport import ArchiveClient, Suspended
from test_inventory import ROW, votable


class JobTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.path = str(Path(self.directory.name) / "metadata.sqlite3")
        self.store = Store(self.path)
        self.archive = None
        self.coordinator = None

    async def asyncTearDown(self):
        if self.coordinator:
            await self.coordinator.close()
        if self.archive:
            await self.archive.close()
        self.store.close()
        self.directory.cleanup()

    def setup(self, handler, **kwargs):
        self.archive = ArchiveClient(httpx.AsyncClient(transport=httpx.MockTransport(handler)), record=self.store.record,
            sleep=lambda _: asyncio.sleep(0), jitter=lambda: 0)
        self.coordinator = Coordinator(self.store, self.archive, **kwargs)
        return self.coordinator

    async def finish(self):
        await asyncio.gather(*self.coordinator.tasks)

    async def test_progressive_deduplication_shared_job_global_limit_and_stable_pages(self):
        release = asyncio.Event()
        ready = asyncio.Event()
        active, maximum, requests = 0, 0, 0
        async def handler(request):
            nonlocal active, maximum, requests
            active += 1
            maximum = max(maximum, active)
            requests += 1
            collection = request.url.params.get("COLLECTION")
            try:
                if collection != "spherex_dr1":
                    ready.set()
                    await release.wait()
                    return httpx.Response(200, content=votable([{**ROW, "access_url": "/data/earlier.fits", "em_min": "1e-6"}]))
                await asyncio.sleep(0)
                return httpx.Response(200, content=votable([{**ROW, "access_url": f"/data/{n}.fits"} for n in range(205)]))
            finally:
                active -= 1
        coordinator = self.setup(handler)
        first = coordinator.start(Search(0, 0, 10))
        duplicate = coordinator.start(Search(0.0, 0, 10), True)
        self.assertEqual(first["id"], duplicate["id"])
        await ready.wait()
        await asyncio.sleep(0)
        job = self.store.get(first["id"])
        self.assertEqual(job["total"], 205)
        self.assertEqual(job["state"], "running")
        page = self.store.page(job["id"], job["version"])
        release.set()
        await self.finish()
        final = self.store.get(first["id"])
        self.assertEqual(final["total"], 206)
        second = self.store.page(job["id"], page["version"], page["nextCursor"])
        third = self.store.page(job["id"], page["version"], second["nextCursor"])
        self.assertEqual([len(p["products"]) for p in (page, second, third)], [100, 100, 5])
        self.assertEqual(len({p["id"] for p in page["products"] + second["products"] + third["products"]}), 205)
        self.assertEqual(requests, 2)
        self.assertEqual(maximum, 2)
        with self.assertRaises(KeyError):
            self.store.page("wrong", page["version"])

    async def test_restart_preserves_results_and_marks_interrupted(self):
        coordinator = self.setup(lambda _: httpx.Response(200, content=votable([ROW])))
        first = coordinator.start(Search(0, 0, 10))
        await self.finish()
        job = self.store.get(first["id"])
        job["state"] = "running"
        job["collections"]["spherex_dr1"]["state"] = "running"
        self.store.save(job)
        self.store.close()
        self.store = Store(self.path)
        self.store.record({"jobId": "cancelled", "endpoint": "/SIA", "error": "Request interrupted", "httpStatus": None})
        self.assertTrue(self.store.last_archive()["ok"])
        recovered = self.store.get(first["id"])
        self.assertEqual(recovered["state"], "interrupted")
        self.assertEqual(recovered["collections"]["spherex_dr1"]["state"], "interrupted")
        self.assertEqual(len(self.store.page(job["id"], job["version"])["products"]), 1)

    async def test_failed_refresh_retains_products_and_retries_only_failed_collections(self):
        mode = "ok"
        seen = []
        async def handler(request):
            name = request.url.params.get("COLLECTION", "tap")
            seen.append(name)
            if mode == "fail" and name != "spherex_dr1":
                return httpx.Response(200, content=b"invalid xml")
            return httpx.Response(200, content=votable([ROW]))
        coordinator = self.setup(handler)
        first = coordinator.start(Search(0, 0, 10))
        await self.finish()
        mode = "fail"
        refresh = coordinator.start(Search(0, 0, 10), True)
        self.assertEqual(refresh["total"], 1)
        await self.finish()
        failed = self.store.get(refresh["id"])
        self.assertEqual(public(failed)["status"], "partial")
        self.assertEqual(failed["total"], 1)
        seen.clear()
        coordinator.start(Search(0, 0, 10), True)
        await self.finish()
        self.assertNotIn("spherex_dr1", seen)

    async def test_positive_negative_expiry_and_no_error_negative_cache(self):
        now = time.time()
        self.store.clock = lambda: now
        rows, fail, count = [], False, 0
        async def handler(_):
            nonlocal count
            count += 1
            return httpx.Response(400 if fail else 200, content=votable(rows))
        coordinator = self.setup(handler)
        search = Search(0, 0, 10)
        first = coordinator.start(search)
        await self.finish()
        self.assertEqual(coordinator.start(search)["id"], first["id"])
        now += 901
        second = coordinator.start(search)
        self.assertNotEqual(second["id"], first["id"])
        await self.finish()
        rows = [ROW]
        positive = coordinator.start(search, True)
        await self.finish()
        now = time.time() + DAY - 1
        self.assertEqual(coordinator.start(search)["id"], positive["id"])
        now += 2
        stale = coordinator.start(search)
        self.assertEqual(stale["total"], 1)
        self.assertTrue(stale["stale"])
        await self.finish()
        fail = True
        error = coordinator.start(Search(1, 0, 10))
        await self.finish()
        self.assertEqual(public(self.store.get(error["id"]))["status"], "error")
        self.assertNotEqual(coordinator.start(Search(1, 0, 10))["id"], error["id"])
        await self.finish()

    async def test_total_execution_and_queue_budgets_preserve_partial(self):
        async def handler(request):
            if request.url.params.get("COLLECTION") != "spherex_dr1":
                await asyncio.sleep(10)
            return httpx.Response(200, content=votable([ROW]))
        coordinator = self.setup(handler, queue_budget=.01, execution_budget=.05)
        start = time.monotonic()
        first = coordinator.start(Search(0, 0, 10))
        second = coordinator.start(Search(1, 0, 10))
        await self.finish()
        self.assertLess(time.monotonic() - start, .5)
        job = self.store.get(first["id"])
        self.assertEqual(job["total"], 1)
        self.assertEqual(job["state"], "timed_out")
        self.assertEqual(self.store.get(second["id"])["state"], "timed_out")
        coordinator.queue_budget = 0
        expired = coordinator.start(Search(2, 0, 10))
        await self.finish()
        self.assertEqual(self.store.get(expired["id"])["state"], "timed_out")
        self.assertEqual(self.store.get(expired["id"])["total"], 0)

    async def test_cache_eviction_and_exact_key(self):
        coordinator = self.setup(lambda _: httpx.Response(200, content=votable([ROW])))
        first = coordinator.start(Search(0, 0, 10))
        await self.finish()
        second = coordinator.start(Search(.0000001, 0, 10))
        await self.finish()
        self.assertNotEqual(search_key(Search(0, 0, 10)), search_key(Search(.0000001, 0, 10)))
        self.store.limit = 1
        self.store.prune(protect=second["id"])
        with self.assertRaises(KeyError):
            self.store.get(first["id"])
        self.store.get(second["id"])
        self.store.clock = lambda: time.time() + 8 * DAY
        self.store.prune()
        with self.assertRaises(KeyError):
            self.store.get(second["id"])

    async def test_stale_successes_are_revalidated_and_page_dates_stay_frozen(self):
        seen = []
        def handler(request):
            name = request.url.params.get("COLLECTION", "tap")
            seen.append(name)
            return httpx.Response(400) if name == "spherex_qr3" or name == "tap" else httpx.Response(200, content=votable([ROW]))
        coordinator = self.setup(handler)
        first = coordinator.start(Search(0, 0, 10))
        await self.finish()
        job = self.store.get(first["id"])
        old_version = job["version"]
        old_date = self.store.page(job["id"], old_version)["verifiedAt"]
        seen.clear()
        self.store.clock = lambda: time.time() + DAY + 1
        refresh = coordinator.start(Search(0, 0, 10), True)
        self.assertTrue(refresh["stale"])
        await self.finish()
        self.assertIn("spherex_dr1", seen)
        old_page = self.store.page(job["id"], old_version)
        self.assertEqual(old_page["verifiedAt"], old_date)
        self.assertTrue(old_page["stale"])

    async def test_cache_admission_bounds_active_jobs_and_utf8_metadata(self):
        self.store.limit = 1024 * 1024
        self.store.collection_bytes = 8192
        self.store.job_reserve = 128 * 1024
        coordinator = self.setup(lambda _: httpx.Response(200, content=votable([{**ROW, "obs_id": "星" * 3000}])))
        for n in range(4):
            coordinator.start(Search(n, 0, 10))
        with self.assertRaisesRegex(ValueError, "queue is full"):
            coordinator.start(Search(5, 0, 10))
        await self.finish()
        stored = sum(self.store.db.execute(f"SELECT COALESCE(SUM(length(CAST(body AS BLOB))),0) FROM {t}").fetchone()[0] for t in ("jobs", "versions", "requests"))
        self.assertLessEqual(stored, self.store.limit)
        job = self.store.latest(search_key(Search(0, 0, 10)))
        self.assertTrue(job["truncated"])
        self.assertEqual(public(job)["status"], "partial")

    async def test_unbounded_search_waits_and_keeps_publishing_progress(self):
        release, waiting = asyncio.Event(), asyncio.Event()
        async def handler(request):
            if request.url.params.get("COLLECTION") != "spherex_dr1":
                waiting.set()
                await release.wait()
            return httpx.Response(200, content=votable([ROW]))
        coordinator = self.setup(handler, queue_budget=None, execution_budget=None)
        self.archive.attempt_timeout = None
        first = coordinator.start(Search(0, 0, 10))
        second = coordinator.start(Search(1, 0, 10))
        await waiting.wait()
        await asyncio.sleep(.06)
        self.assertEqual(self.store.get(first["id"])["state"], "running")
        self.assertEqual(self.store.get(first["id"])["total"], 1)
        self.assertEqual(self.store.get(second["id"])["state"], "queued")
        release.set()
        await self.finish()
        self.assertEqual(self.store.get(first["id"])["state"], "finished")


class TransportTests(unittest.IsolatedAsyncioTestCase):
    async def test_unbounded_http_configuration_disables_every_httpx_timeout(self):
        archive = ArchiveClient(attempt_timeout=None)
        try:
            self.assertEqual(archive.client.timeout.as_dict(), {"connect": None, "read": None, "write": None, "pool": None})
        finally:
            await archive.close()

    async def test_retry_after_and_bounded_attempts(self):
        delays, events = [], []
        count = 0
        async def handler(_):
            nonlocal count
            count += 1
            return httpx.Response(503, headers={"Retry-After": "3"}) if count < 3 else httpx.Response(200, content=votable([ROW]))
        async def sleep(delay):
            delays.append(delay)
        archive = ArchiveClient(httpx.AsyncClient(transport=httpx.MockTransport(handler)), sleep=sleep, record=events.append)
        try:
            rows, _ = await archive.query("https://irsa.ipac.caltech.edu/SIA", "job", time.monotonic() + 20)
            self.assertEqual(len(rows), 1)
            self.assertEqual(delays, [3, 3])
            self.assertEqual([e["httpStatus"] for e in events], [503, 503, 200])
            self.assertEqual(events[-1]["resultCount"], 1)
            self.assertTrue(archive.last["ok"])
        finally:
            await archive.close()

    async def test_circuit_cooldown_single_probe_and_total_budget(self):
        mode = "fail"
        entered, release = asyncio.Event(), asyncio.Event()
        async def handler(_):
            if mode == "probe":
                entered.set()
                await release.wait()
                return httpx.Response(200, content=votable([]))
            return httpx.Response(503)
        archive = ArchiveClient(httpx.AsyncClient(transport=httpx.MockTransport(handler)), sleep=lambda _: asyncio.sleep(0))
        url = "https://irsa.ipac.caltech.edu/SIA"
        try:
            for _ in range(2):
                with self.assertRaises(RuntimeError):
                    await archive.query(url, "job", time.monotonic() + 30)
            circuit = archive.circuits["/SIA"]
            self.assertEqual(circuit.failures, 5)
            with self.assertRaises(Suspended):
                await archive.query(url, "job", time.monotonic() + 30)
            circuit.until = time.monotonic() - 1
            mode = "probe"
            probe = asyncio.create_task(archive.query(url, "job", time.monotonic() + 30))
            await entered.wait()
            with self.assertRaises(Suspended):
                await archive.query(url, "job", time.monotonic() + 30)
            release.set()
            await probe
            self.assertEqual(circuit.failures, 0)
        finally:
            await archive.close()
        archive = ArchiveClient(httpx.AsyncClient(transport=httpx.MockTransport(lambda _: httpx.Response(429, headers={"Retry-After": "100"}))))
        try:
            with self.assertRaises(TimeoutError):
                await archive.query(url, "job", time.monotonic() + .01)
        finally:
            await archive.close()

    async def test_invalid_xml_unsafe_redirect_and_network_retry(self):
        for response in (httpx.Response(200, content=b"broken"), httpx.Response(302, headers={"location": "https://example.com/file.fits"})):
            archive = ArchiveClient(httpx.AsyncClient(transport=httpx.MockTransport(lambda _: response)))
            try:
                with self.assertRaisesRegex(RuntimeError, "metadata unavailable or invalid"):
                    await archive.query("https://irsa.ipac.caltech.edu/SIA", "job", time.monotonic() + 5)
            finally:
                await archive.close()
        count = 0
        def handler(_):
            nonlocal count
            count += 1
            raise httpx.ConnectError("offline")
        archive = ArchiveClient(httpx.AsyncClient(transport=httpx.MockTransport(handler)), sleep=lambda _: asyncio.sleep(0))
        try:
            with self.assertRaises(RuntimeError):
                await archive.query("https://irsa.ipac.caltech.edu/SIA", "job", time.monotonic() + 30)
            self.assertEqual(count, 3)
        finally:
            await archive.close()
