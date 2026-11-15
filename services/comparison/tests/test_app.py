import asyncio
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import httpx
from app import app, timeout_setting
from jobs import Coordinator, Store
from transport import ArchiveClient
from test_inventory import ROW, votable


class AppTests(unittest.IsolatedAsyncioTestCase):
    async def test_timeout_settings_can_be_disabled_without_changing_defaults(self):
        with patch.dict("os.environ", {}, clear=True):
            self.assertEqual(timeout_setting("TEST_TIMEOUT", 25), 25)
        with patch.dict("os.environ", {"TEST_TIMEOUT": "0"}):
            self.assertIsNone(timeout_setting("TEST_TIMEOUT", 25))
        for invalid in ("-1", "nan", "inf"):
            with patch.dict("os.environ", {"TEST_TIMEOUT": invalid}):
                with self.assertRaises(ValueError):
                    timeout_setting("TEST_TIMEOUT", 25)

    async def test_http_contract_and_service_health_independent_of_archive(self):
        with tempfile.TemporaryDirectory() as directory:
            store = Store(str(Path(directory) / "test.sqlite3"))
            archive = ArchiveClient(httpx.AsyncClient(transport=httpx.MockTransport(lambda _: httpx.Response(200, content=votable([ROW])))))
            coordinator = Coordinator(store, archive)
            app.state.coordinator = coordinator
            try:
                async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
                    bad = await client.post('/searches', json={"ra": 0, "dec": 0, "size": 10, "mission": "unsupported"})
                    self.assertEqual(bad.status_code, 400)
                    self.assertEqual((await client.post('/searches', json={"ra": 0, "dec": 0, "size": 10, "extra": True})).status_code, 422)
                    self.assertEqual((await client.post('/searches', json={"ra": 0, "dec": 91, "size": 10})).status_code, 400)
                    self.assertEqual((await client.post('/searches', json={"ra": 0, "dec": 0, "size": 10, "nearby_radius": 6})).status_code, 400)
                    created = await client.post('/searches', json={"ra": 0, "dec": 0, "size": 10})
                    self.assertEqual(created.status_code, 202)
                    job_id = created.json()["id"]
                    await asyncio.gather(*coordinator.tasks)
                    progress = (await client.get(f'/searches/{job_id}')).json()
                    self.assertEqual(progress["status"], "complete")
                    self.assertTrue(all("products" not in c for c in progress["collections"]))
                    results = await client.get(f'/searches/{job_id}/results', params={"version": progress["version"]})
                    self.assertEqual(results.json()["total"], 1)
                    self.assertEqual((await client.get(f'/searches/{job_id}/results', params={"version": progress["version"], "cursor": "1"})).status_code, 400)
                    self.assertEqual((await client.get('/searches/missing')).status_code, 404)
                    self.assertEqual((await client.get('/inventory')).status_code, 410)
                    nearby = await client.post('/searches', json={"ra": 0, "dec": 0, "size": 10, "nearby_radius": 1})
                    self.assertEqual(nearby.status_code, 202)
                    await asyncio.gather(*coordinator.tasks)
                    archive.last = {"ok": False, "error": "Simulated outage"}
                    health = (await client.get('/health')).json()
                    self.assertTrue(health["ok"])
                    self.assertFalse(health["irsa"]["ok"])
            finally:
                await coordinator.close()
                await archive.close()
                store.close()
