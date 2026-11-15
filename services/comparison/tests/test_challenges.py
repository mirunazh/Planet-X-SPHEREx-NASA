import asyncio
from datetime import datetime, timezone
from pathlib import Path
import tempfile
import unittest

import httpx
from app import app
from challenges import WeeklyChallenge, candidates, weekly_target, FRAME_LIMIT
from inventory import Search
from jobs import Coordinator, Store
from previews import PreviewManager
from transport import ArchiveClient
from test_inventory import ROW, votable
from test_previews import fits_fixture


def timestamp(value):
    return datetime.fromisoformat(value).replace(tzinfo=timezone.utc).timestamp()


class WeeklyTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.now = [timestamp('2026-11-15T12:00:00')]
        self.count, self.downloads = 14, 0
        self.archive_fails = False
        self.store = Store(str(Path(self.directory.name) / 'inventory.sqlite3'), clock=lambda: self.now[0])
        self.archive = ArchiveClient(httpx.AsyncClient(transport=httpx.MockTransport(self.handler)), record=self.store.record)
        self.coordinator = Coordinator(self.store, self.archive)
        self.previews = PreviewManager(self.store, self.archive, Path(self.directory.name) / 'images')
        self.challenge = WeeklyChallenge(self.coordinator, self.previews, self.directory.name,
            clock=lambda: self.now[0], sleep=lambda _: asyncio.sleep(.001))

    async def handler(self, request):
        if request.url.path == '/SIA':
            if self.archive_fails:
                return httpx.Response(200, content=b'Archive unavailable')
            return httpx.Response(200, content=votable([{**ROW, 'access_url': f'/ibe/data/spherex/dr1/level2/frame-{i}.fits',
                'obs_id': str(i), 't_min': str(61000+i), 't_max': str(61000+i+.001)} for i in range(self.count)]))
        self.downloads += 1
        region = self.challenge.manifest['region']
        return httpx.Response(200, content=fits_fixture(Search(**region)))

    async def asyncTearDown(self):
        await self.challenge.close()
        await self.previews.close()
        await self.coordinator.close()
        await self.archive.close()
        self.store.close()
        self.directory.cleanup()

    async def test_prepares_twelve_once_survives_restart_and_serves_without_archive(self):
        await self.challenge.prepare()
        snapshot = self.challenge.snapshot()
        self.assertEqual(snapshot['ready'], FRAME_LIMIT)
        self.assertEqual(snapshot['newThisWeek'], 0)
        self.assertEqual(snapshot['state'], 'ready')
        self.assertEqual(self.downloads, FRAME_LIMIT)
        self.assertNotIn('knownIds', snapshot)
        restored = WeeklyChallenge(self.coordinator, self.previews, self.directory.name, clock=lambda: self.now[0])
        self.assertEqual(restored.snapshot()['ready'], FRAME_LIMIT)
        self.assertEqual(len(self.previews.protected), FRAME_LIMIT)
        app.state.challenge = restored
        app.state.challenge_previews = self.previews
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url='http://test') as client:
            self.assertEqual((await client.get('/challenge')).json()['ready'], FRAME_LIMIT)
            preview = snapshot['frames'][0]['previewId']
            self.assertEqual((await client.get(f'/challenge/previews/{preview}')).json()['state'], 'ready')
            image = await client.get(f'/challenge/previews/{preview}/image')
            self.assertTrue(image.content.startswith(b'\x89PNG'))
        self.assertEqual(self.downloads, FRAME_LIMIT)

    async def test_new_week_keeps_same_region_and_cache_counts_only_new_products(self):
        await self.challenge.prepare()
        old = self.challenge.snapshot()
        self.now[0] = timestamp('2026-11-16T12:00:00')
        self.challenge.rollover()
        new = self.challenge.snapshot()
        self.assertNotEqual(old['id'], new['id'])
        self.assertEqual(old['region'], new['region'])
        self.assertEqual(new['ready'], FRAME_LIMIT)
        self.count += 1
        await self.challenge.prepare()
        self.assertEqual(self.challenge.snapshot()['newThisWeek'], 1)
        self.assertIn('14', [f['product']['title'] for f in self.challenge.snapshot()['frames']])
        # Repeated metadata is not counted twice.
        self.challenge.manifest['checkedAt'] = None
        await self.challenge.prepare()
        self.assertEqual(self.challenge.snapshot()['newThisWeek'], 1)

    async def test_partial_archive_keeps_prepared_images(self):
        await self.challenge.prepare()
        self.now[0] += 86400
        self.archive_fails = True
        await self.challenge.prepare()
        self.assertEqual(self.challenge.snapshot()['ready'], FRAME_LIMIT)
        self.assertEqual(self.challenge.snapshot()['inventoryStatus'], 'partial')

    async def test_successful_empty_baseline_counts_first_new_images(self):
        self.count = 0
        await self.challenge.prepare()
        self.assertTrue(self.challenge.manifest['baselineEstablished'])
        self.assertEqual(self.challenge.snapshot()['newThisWeek'], 0)
        self.count = 2
        self.now[0] += 21601
        await self.challenge.prepare()
        self.assertEqual(self.challenge.snapshot()['newThisWeek'], 2)
        self.assertEqual(self.challenge.snapshot()['ready'], 2)

    async def test_restart_preserves_next_check_deadline(self):
        await self.challenge.prepare()
        self.now[0] += 21540
        restored = WeeklyChallenge(self.coordinator, self.previews, self.directory.name, clock=lambda: self.now[0])
        await restored.prepare()
        self.assertAlmostEqual(restored.next_delay(), 60)
        self.assertEqual(restored.snapshot()['state'], 'ready')

    def test_week_boundaries_and_sampling(self):
        sunday = weekly_target(timestamp('2026-12-27T23:59:59'))
        monday = weekly_target(timestamp('2026-12-28T00:00:00'))
        self.assertNotEqual(sunday['id'], monday['id'])
        self.assertEqual(sunday['region'], monday['region'])
        rows = [{'id': str(i), 'band': 'SPHEREx-D3', 'observedStart': f'{i:04d}'} for i in range(200)]
        rows += [{'id': f'd4-{i}', 'band': 'SPHEREx-D4'} for i in range(300)]
        chosen = candidates(rows)
        self.assertEqual(len(chosen), 24)
        self.assertEqual(chosen[11]['id'], '199')
        self.assertEqual({p['band'] for p in chosen}, {'SPHEREx-D3'})
