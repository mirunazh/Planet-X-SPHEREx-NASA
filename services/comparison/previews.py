"""On-demand SPHEREx FITS cutouts rendered on a common north-up sky grid."""
import asyncio
from collections import OrderedDict
import hashlib
import io
import json
import math
from pathlib import Path
import re
import struct
import time
from urllib.parse import parse_qsl, unquote, urlencode, urljoin, urlsplit, urlunsplit
import zlib

import httpx
import numpy as np
from astropy.io import fits
from astropy.wcs import WCS

from inventory import Search, safe_irsa_url
from transport import MAX_RETRY_AFTER_SECONDS

RENDER_VERSION = "spherex-png-1"
MAX_FITS_BYTES = 64 * 1024 * 1024
MAX_SOURCE_PIXELS = 2048 * 2048
PREVIEW_SIZE = 384


class PreviewBusy(Exception):
    pass


def cutout_url(product, search):
    url = product["accessUrl"]
    parts = urlsplit(url)
    path = unquote(parts.path)
    if not safe_irsa_url(url) or not path.startswith("/ibe/data/spherex/") or ".." in path.split("/"):
        raise ValueError("This product has no supported SPHEREx cutout URL")
    # The cutout is in detector axes. The diagonal covers a rotated square crop.
    params = {k: v for k, v in parse_qsl(parts.query) if k not in ("center", "size", "gzip")}
    params.update(center=f"{search.ra},{search.dec}deg", size=f"{search.size / 60 * math.sqrt(2)}deg", gzip="false")
    return urlunsplit((parts.scheme, parts.netloc, parts.path, urlencode(params), ""))


def sky_grid(search, size=PREVIEW_SIZE):
    target = WCS(naxis=2)
    target.wcs.ctype = ["RA---TAN", "DEC--TAN"]
    target.wcs.crval = [search.ra, search.dec]
    target.wcs.crpix = [(size + 1) / 2, (size + 1) / 2]
    target.wcs.cdelt = [-search.size / 60 / size, search.size / 60 / size]
    return target


def png_bytes(rgba):
    height, width, _ = rgba.shape
    def chunk(name, data):
        return struct.pack(">I", len(data)) + name + data + struct.pack(">I", zlib.crc32(name + data) & 0xffffffff)
    scanlines = b"".join(b"\0" + row.tobytes() for row in rgba)
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(scanlines)) + chunk(b"IEND", b"")


def render_preview(data, search):
    # Decode bytes already fetched by our allowlisted async client, never remote FITS URLs.
    with fits.open(io.BytesIO(data), memmap=False, lazy_load_hdus=True) as hdul:
        if "IMAGE" not in hdul:
            raise ValueError("The FITS file has no SPHEREx IMAGE extension")
        hdu = hdul["IMAGE"]
        width, height = hdu.header.get("NAXIS1", 0), hdu.header.get("NAXIS2", 0)
        if hdu.header.get("NAXIS") != 2 or width <= 0 or height <= 0 or width * height > MAX_SOURCE_PIXELS:
            raise ValueError("Unsupported or oversized SPHEREx image dimensions")
        spatial = WCS(hdu.header, fobj=hdul).celestial
        if not spatial.has_celestial:
            raise ValueError("The exposure has no usable sky coordinates")
        image = np.asarray(hdu.data, dtype=np.float32)
        yy, xx = np.indices((PREVIEW_SIZE, PREVIEW_SIZE), dtype=float)
        ra, dec = sky_grid(search).pixel_to_world_values(xx, yy)
        x, y = spatial.world_to_pixel_values(ra, dec)
        inside = np.isfinite(x) & np.isfinite(y) & (x >= 0) & (y >= 0) & (x <= width - 1) & (y <= height - 1)
        # Bilinear display resampling; NaNs remain transparent instead of becoming signal.
        x0 = np.floor(np.where(inside, x, 0)).astype(int)
        y0 = np.floor(np.where(inside, y, 0)).astype(int)
        x1, y1 = np.minimum(x0 + 1, width - 1), np.minimum(y0 + 1, height - 1)
        dx, dy = np.where(inside, x - x0, 0), np.where(inside, y - y0, 0)
        values = ((1 - dx) * (1 - dy) * image[y0, x0] + dx * (1 - dy) * image[y0, x1]
                  + (1 - dx) * dy * image[y1, x0] + dx * dy * image[y1, x1])
        valid = inside & np.isfinite(values)
        if not valid.any():
            raise ValueError("This exposure has no valid pixels in the selected crop. Try the next image.")
        low, high = np.percentile(values[valid], [0.5, 99.5])
        normalized = np.clip((np.where(valid, values, low) - low) / (high - low), 0, 1) if high > low else np.full(values.shape, .5)
        display = np.round(np.arcsinh(normalized * 10) / np.arcsinh(10) * 255).astype(np.uint8)
        rgba = np.stack((display, display, display, valid.astype(np.uint8) * 255), axis=-1)
        # FITS y increases northwards; browser rows increase downwards.
        png = png_bytes(np.flipud(rgba))
        return png, {"width": PREVIEW_SIZE, "height": PREVIEW_SIZE,
            "coverageFraction": round(float(valid.mean()), 4), "stretch": "asinh-per-image", "orientation": "north-up-east-left"}


class PreviewManager:
    def __init__(self, store, archive, directory, limit=128 * 1024 * 1024, sleep=asyncio.sleep):
        self.store, self.archive = store, archive
        self.directory = Path(directory)
        self.directory.mkdir(parents=True, exist_ok=True)
        self.limit = limit
        self.sleep = sleep
        self.entries = OrderedDict()
        self.tasks = {}
        self.protected = set()
        self.worker = asyncio.Semaphore(1)
        self.prune()

    def prune(self):
        files = sorted(self.directory.glob("*.png"), key=lambda p: p.stat().st_mtime)
        total = sum(path.stat().st_size for path in files)
        for path in files:
            if total <= self.limit:
                break
            if path.stem in self.tasks or path.stem in self.protected:
                continue
            total -= path.stat().st_size
            path.unlink(missing_ok=True)
            path.with_suffix(".json").unlink(missing_ok=True)
            self.entries.pop(path.stem, None)

    def state(self, key):
        if not re.fullmatch(r"[a-f0-9]{64}", key):
            raise KeyError("Preview does not exist. Load the image again.")
        entry = self.entries.get(key)
        if entry is None or entry["state"] == "ready" and not (self.directory / f"{key}.png").is_file():
            try:
                entry = json.loads((self.directory / f"{key}.json").read_text())
                if not (self.directory / f"{key}.png").is_file():
                    raise FileNotFoundError()
            except (FileNotFoundError, ValueError):
                raise KeyError("Preview expired. Load the image again.") from None
            self.entries[key] = entry
        self.entries.move_to_end(key)
        if entry["state"] == "ready":
            (self.directory / f"{key}.png").touch()
        return dict(entry)

    def ensure(self, job_id, version, product_id, retry=False):
        search, product = self.store.product(job_id, version, product_id)
        url = cutout_url(product, search)
        key = hashlib.sha256(f"{RENDER_VERSION}|{url}".encode()).hexdigest()
        try:
            entry = self.state(key)
            if entry["state"] != "error" or not retry:
                return entry
        except KeyError:
            pass
        if len(self.tasks) >= 8:
            raise PreviewBusy("Image queue is full. Try again after the current image loads.")
        entry = {"id": key, "state": "queued", "error": None}
        self.entries[key] = entry
        while len(self.entries) > 128:
            expired = next((k for k in self.entries if k not in self.tasks and k != key), None)
            if expired is None:
                break
            self.entries.pop(expired)
        task = asyncio.create_task(self.produce(key, url, search, job_id))
        self.tasks[key] = task
        task.add_done_callback(lambda _: self.tasks.pop(key, None))
        return dict(entry)

    async def download(self, url):
        for attempt in range(3):
            try:
                return await self.download_once(url)
            except (httpx.TransportError, httpx.HTTPStatusError) as error:
                transient = isinstance(error, httpx.TransportError) or error.response.status_code in (429, 502, 503, 504)
                if not transient or attempt == 2:
                    raise
                delay = 2 ** attempt
                if isinstance(error, httpx.HTTPStatusError):
                    try:
                        delay = max(delay, float(error.response.headers.get("retry-after", delay)))
                    except ValueError:
                        pass
                # The image worker is shared: never let an archive's Retry-After stall it for long.
                await self.sleep(min(delay, MAX_RETRY_AFTER_SECONDS))

    async def download_once(self, url):
        async with self.archive.slots:
            async with asyncio.timeout(self.archive.attempt_timeout):
                for _ in range(4):
                    if not safe_irsa_url(url):
                        raise ValueError("Archive redirected outside IRSA")
                    async with self.archive.client.stream("GET", url, timeout=self.archive.attempt_timeout,
                        headers={"Accept": "application/fits, application/octet-stream;q=0.9, */*;q=0.5"}) as response:
                        if response.is_redirect:
                            url = urljoin(url, response.headers.get("location", ""))
                            continue
                        response.raise_for_status()
                        chunks, size = [], 0
                        async for chunk in response.aiter_bytes():
                            size += len(chunk)
                            if size > MAX_FITS_BYTES:
                                raise ValueError("The cutout exceeds the 64 MiB image limit. Choose a smaller region.")
                            chunks.append(chunk)
                        return b"".join(chunks)
                raise ValueError("Too many archive redirects")

    async def produce(self, key, url, search, job_id):
        entry = self.entries[key]
        started = time.monotonic()
        try:
            async with self.worker:
                entry["state"] = "downloading"
                data = await self.download(url)
                entry["state"] = "rendering"
                png, metadata = await asyncio.to_thread(render_preview, data, search)
                if len(png) > self.limit:
                    raise ValueError("Preview exceeds the configured image cache capacity")
                entry.update(metadata, state="ready")
                path = self.directory / f"{key}.png"
                temporary = path.with_suffix(".tmp")
                temporary.write_bytes(png)
                temporary.replace(path)
                path.with_suffix(".json").write_text(json.dumps(entry))
                self.prune()
        except asyncio.CancelledError:
            entry.update(state="error", error="Image loading was interrupted. Retry the image.")
            raise
        except Exception as error:
            reason = f"IRSA image request failed (HTTP {error.response.status_code}). Retry the image." if isinstance(error, httpx.HTTPStatusError) else str(error) if isinstance(error, ValueError) else "The image could not be loaded from IRSA. Retry or choose another exposure."
            entry.update(state="error", error=reason)
        finally:
            self.store.record({"jobId": job_id, "endpoint": "/ibe/data/spherex", "attempt": 1,
                "durationMs": round((time.monotonic() - started) * 1000), "httpStatus": 200 if entry["state"] == "ready" else None,
                "error": entry.get("error"), "resultCount": 1 if entry["state"] == "ready" else 0})

    def image(self, key):
        if self.state(key)["state"] != "ready":
            raise KeyError("The image is still loading")
        return self.directory / f"{key}.png"

    async def close(self):
        for task in self.tasks.values():
            task.cancel()
        await asyncio.gather(*self.tasks.values(), return_exceptions=True)
