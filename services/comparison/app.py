"""Internal service. Exactly one uvicorn worker owns the durable job queue."""
from contextlib import asynccontextmanager
import os
import logging
import math
from pathlib import Path


from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse
from pydantic import BaseModel, ConfigDict, Field

from inventory import Search
from jobs import Coordinator, Store, public
from transport import ArchiveClient
from previews import PreviewManager, PreviewBusy
from challenges import WeeklyChallenge


def timeout_setting(name, default):
    seconds = float(os.environ.get(name, default))
    if not math.isfinite(seconds) or seconds < 0:
        raise ValueError(f"{name} must be zero (disabled) or a positive number")
    return seconds or None


@asynccontextmanager
async def lifespan(app):
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s %(message)s")
    logging.getLogger("httpx").setLevel(logging.WARNING)
    # Pruning recomputes the cache size on the event loop; at 256 MiB that blocked every request for
    # about 34 s, at 32 MiB it takes a few seconds at worst.
    store = Store(os.environ.get("COMPARISON_DB", "/data/inventory.sqlite3"),
        limit=int(os.environ.get("METADATA_CACHE_BYTES", str(32 * 1024 * 1024))))
    # IRSA's SIA often needs about 25 s and sometimes much longer, so a 25 s attempt limit failed half
    # the searches. These limits still stop one stuck request from holding the workers for good.
    request_timeout = timeout_setting("IRSA_REQUEST_TIMEOUT_SECONDS", 60)
    execution_timeout = timeout_setting("SEARCH_EXECUTION_TIMEOUT_SECONDS", 180)
    queue_timeout = timeout_setting("SEARCH_QUEUE_TIMEOUT_SECONDS", 60)
    archive = ArchiveClient(record=store.record, attempt_timeout=request_timeout)
    archive.last = store.last_archive()
    app.state.coordinator = Coordinator(store, archive, queue_budget=queue_timeout, execution_budget=execution_timeout)
    app.state.previews = PreviewManager(store, archive,
        os.environ.get("PREVIEW_CACHE_DIR", str(Path(os.environ.get("COMPARISON_DB", "/data/inventory.sqlite3")).parent / "previews")),
        limit=int(os.environ.get("PREVIEW_CACHE_BYTES", 128 * 1024 * 1024)))
    challenge_directory = Path(os.environ.get("COMPARISON_DB", "/data/inventory.sqlite3")).parent / "challenge"
    app.state.challenge_previews = PreviewManager(store, archive, challenge_directory / "images", limit=16 * 1024 * 1024)
    app.state.challenge_previews.worker = app.state.previews.worker
    app.state.challenge = WeeklyChallenge(app.state.coordinator, app.state.challenge_previews, challenge_directory)
    app.state.challenge.start()
    try:
        yield
    finally:
        await app.state.challenge.close()
        await app.state.challenge_previews.close()
        await app.state.previews.close()
        await app.state.coordinator.close()
        await archive.close()
        store.close()


app = FastAPI(title="IRSA comparison inventory", docs_url=None, redoc_url=None, lifespan=lifespan)


class SearchInput(BaseModel):
    model_config = ConfigDict(extra="forbid", allow_inf_nan=False)
    ra: float
    dec: float
    size: float
    mission: str = "spherex"
    band: str = ""
    wave_min: float | None = None
    wave_max: float | None = None
    start: str = ""
    end: str = ""
    kind: str = "all"
    refresh: bool = False


@app.get("/health")
async def health():
    coordinator = app.state.coordinator
    return {"ok": True, "stage": "inventory", "irsa": coordinator.archive.last, "activeSearches": len(coordinator.tasks), "timeouts": {"requestSeconds": coordinator.archive.attempt_timeout,
        "executionSeconds": coordinator.execution_budget, "queueSeconds": coordinator.queue_budget}}


@app.post("/searches", status_code=202)
async def create_search(body: SearchInput):
    try:
        values = body.model_dump()
        refresh = values.pop("refresh")
        return app.state.coordinator.start(Search(**values), refresh)
    except ValueError as error:
        raise HTTPException(400, str(error)) from error


@app.get("/searches/{job_id}")
async def search_progress(job_id: str):
    try:
        return public(app.state.coordinator.store.get(job_id))
    except KeyError as error:
        raise HTTPException(404, error.args[0]) from error


@app.get("/searches/{job_id}/results")
async def search_results(job_id: str, version: str = Query(max_length=100), cursor: str = Query(default="", max_length=10)):
    try:
        return app.state.coordinator.store.page(job_id, version, cursor)
    except KeyError as error:
        raise HTTPException(404, error.args[0]) from error
    except ValueError as error:
        raise HTTPException(400, str(error)) from error


@app.get("/inventory")
async def old_inventory():
    raise HTTPException(410, "Use POST /searches and versioned /searches/{id}/results")


class PreviewInput(BaseModel):
    model_config = ConfigDict(extra="forbid")
    version: str = Field(pattern=r"^[\w-]{1,100}$")
    productId: str = Field(pattern=r"^[a-f0-9]{64}$")
    retry: bool = False


@app.post("/searches/{job_id}/previews", status_code=202)
async def create_preview(job_id: str, body: PreviewInput):
    try:
        return app.state.previews.ensure(job_id, body.version, body.productId, body.retry)
    except KeyError as error:
        raise HTTPException(404, error.args[0]) from error
    except ValueError as error:
        raise HTTPException(400, str(error)) from error
    except PreviewBusy as error:
        raise HTTPException(429, str(error)) from error


@app.get("/previews/{preview_id}")
async def preview_progress(preview_id: str):
    try:
        return app.state.previews.state(preview_id)
    except KeyError as error:
        raise HTTPException(404, error.args[0]) from error


@app.get("/previews/{preview_id}/image")
async def preview_image(preview_id: str):
    try:
        return FileResponse(app.state.previews.image(preview_id), media_type="image/png",
            headers={"Cache-Control": "private, max-age=86400, immutable"})
    except KeyError as error:
        raise HTTPException(404, error.args[0]) from error


@app.get("/challenge")
async def weekly_challenge():
    return app.state.challenge.snapshot()


@app.get("/challenge/previews/{preview_id}")
async def challenge_preview_progress(preview_id: str):
    try:
        return app.state.challenge_previews.state(preview_id)
    except KeyError as error:
        raise HTTPException(404, error.args[0]) from error


@app.get("/challenge/previews/{preview_id}/image")
async def challenge_preview_image(preview_id: str):
    try:
        return FileResponse(app.state.challenge_previews.image(preview_id), media_type="image/png",
            headers={"Cache-Control": "private, max-age=86400, immutable"})
    except KeyError as error:
        raise HTTPException(404, error.args[0]) from error
