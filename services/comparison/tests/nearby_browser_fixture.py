"""Deterministic nearby-search browser acceptance; no NASA requests.

From services/comparison: .venv/bin/python tests/nearby_browser_fixture.py
Then: COMPARISON_SERVICE_URL=http://127.0.0.1:8002 npm run dev -- --port 3100
Compare at RA 0 for success, 10 for archive errors, 20 for empty 1-degree searches,
30 for an expanded-search archive failure, and 40 for partial exact coverage.
"""
import asyncio
from contextlib import asynccontextmanager
from pathlib import Path
import sys
import tempfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import httpx
import uvicorn
from app import app
from inventory import Search
from jobs import Coordinator, Store
from previews import PreviewManager
from transport import ArchiveClient
from test_inventory import ROW, votable
from test_previews import fits_fixture


async def handler(request):
    if request.url.path.startswith('/ibe/data/spherex/'):
        center = request.url.params['center'].removesuffix('deg').split(',')
        return httpx.Response(200, content=fits_fixture(Search(float(center[0]), float(center[1]), 2)))
    if request.url.path.startswith('/TAP'):
        return httpx.Response(503)
    _, ra, dec, radius = request.url.params['POS'].split()
    ra, radius = float(ra), float(radius)
    if ra == 10 or ra == 30 and radius >= 1 or ra == 40 and request.url.params['COLLECTION'] == 'spherex_qr3':
        return httpx.Response(400)
    if ra in (0, 20, 30, 40) and radius < (2 if ra == 20 else 1):
        return httpx.Response(200, content=votable([]))
    near = request.url.params['COLLECTION'] == 'spherex_qr3'
    if near:
        await asyncio.sleep(.3)
    center = ra + (.1 if near else .8) if radius >= 1 else ra
    rows = [{**ROW, 'access_url': f'/ibe/data/spherex/dr1/level2/fixture-{center}.fits',
             'energy_bandpassname': 'SPHEREx-D3', 's_ra': str(center), 's_dec': '0',
             't_min': str(61002 if near else 61000)}]
    return httpx.Response(200, content=votable(rows))


@asynccontextmanager
async def fixture_lifespan(app):
    with tempfile.TemporaryDirectory() as directory:
        store = Store(str(Path(directory) / 'nearby.sqlite3'))
        archive = ArchiveClient(httpx.AsyncClient(transport=httpx.MockTransport(handler)), record=store.record,
            sleep=lambda _: asyncio.sleep(0))
        app.state.coordinator = Coordinator(store, archive)
        app.state.previews = PreviewManager(store, archive, str(Path(directory) / 'previews'))
        try:
            yield
        finally:
            await app.state.previews.close()
            await app.state.coordinator.close()
            await archive.close()
            store.close()


if __name__ == '__main__':
    app.router.lifespan_context = fixture_lifespan
    uvicorn.run(app, host='127.0.0.1', port=8002)
