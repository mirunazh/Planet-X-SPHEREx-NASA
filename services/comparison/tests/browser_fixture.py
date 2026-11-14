"""Deterministic browser acceptance ONLY. Run from services/comparison:
.venv/bin/python tests/browser_fixture.py
COMPARISON_SERVICE_URL=http://127.0.0.1:8001 npm run dev -- --port 3100
First search: one fast collection, others delayed. Refresh: archive errors.
No public archive requests or FITS downloads are made by this fixture.
"""
import asyncio
from contextlib import asynccontextmanager
import contextvars
from pathlib import Path
import sys
import tempfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import httpx
import uvicorn
from app import app
from jobs import Coordinator, Store
from transport import ArchiveClient
from previews import PreviewManager
from inventory import Search
from test_previews import fits_fixture
from test_inventory import ROW, votable

current_job = contextvars.ContextVar("fixture_job")
first_job = None
image_attempts = {}


class FixtureArchive(ArchiveClient):
    async def query(self, url, job_id, deadline, progress=lambda **kwargs: None):
        global first_job
        if first_job is None:
            first_job = job_id
        token = current_job.set(job_id)
        try:
            return await super().query(url, job_id, deadline, progress)
        finally:
            current_job.reset(token)


async def handler(request):
    if request.url.path.startswith("/ibe/data/spherex/"):
        filename = request.url.path.rsplit("/", 1)[-1]
        number = int(filename.removeprefix("fixture-").removesuffix(".fits")) if filename != "fixture-later.fits" else 1
        image_attempts[filename] = image_attempts.get(filename, 0) + 1
        if number == 2 and image_attempts[filename] <= 3:
            return httpx.Response(503)
        await asyncio.sleep(.4)
        return httpx.Response(200, content=fits_fixture(Search(0, 0, 10), number % 5))
    if current_job.get(None) != first_job:
        return httpx.Response(200, content=b"Simulated invalid archive metadata")
    collection = request.url.params.get("COLLECTION")
    if collection == "spherex_dr1":
        return httpx.Response(200, content=votable([{**ROW, "obs_id": f"Fixture exposure {n + 1}", "access_url": f"/ibe/data/spherex/dr1/level2/fixture-{n}.fits", "t_min": str(61000 + n / 48), "t_max": str(61000 + n / 48 + 1 / 2880)} for n in range(125)]))
    await asyncio.sleep(12 if collection in ("spherex_dr1_deep", "spherex_qr3") else .2)
    return httpx.Response(200, content=votable([{**ROW, "obs_id": "Later collection exposure", "access_url": "/ibe/data/spherex/qr3/level2/fixture-later.fits", "t_min": "61003", "em_min": "1e-6"}]))


@asynccontextmanager
async def fixture_lifespan(app):
    with tempfile.TemporaryDirectory() as directory:
        store = Store(str(Path(directory) / "fixture.sqlite3"))
        archive = FixtureArchive(httpx.AsyncClient(transport=httpx.MockTransport(handler)), record=store.record)
        app.state.coordinator = Coordinator(store, archive)
        app.state.previews = PreviewManager(store, archive, str(Path(directory) / "previews"))
        try:
            yield
        finally:
            await app.state.previews.close()
            await app.state.coordinator.close()
            await archive.close()
            store.close()


if __name__ == "__main__":
    app.router.lifespan_context = fixture_lifespan
    uvicorn.run(app, host="127.0.0.1", port=8001, log_level="info")
