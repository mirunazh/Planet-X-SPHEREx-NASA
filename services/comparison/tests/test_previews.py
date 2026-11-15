import asyncio
import io
import json
from pathlib import Path
import struct
import tempfile
import unittest
from urllib.parse import parse_qs, urlsplit
import zlib

import httpx
import numpy as np
from astropy.io import fits
from astropy.wcs import WCS

from app import app
from inventory import Search, normalize
from jobs import Coordinator, Store
from previews import PreviewManager, PREVIEW_SIZE, cutout_url, render_preview
from transport import ArchiveClient
from test_inventory import ROW, votable

SCIENCE_URL = "https://irsa.ipac.caltech.edu/ibe/data/spherex/dr1/level2/example.fits"


def fits_fixture(search=Search(0, 0, 10), variant=0):
    size = 80
    yy, xx = np.indices((size, size), dtype=float)
    data = (np.exp(-((xx - 25 - variant * 3) ** 2 + (yy - 52) ** 2) / 8) * 500
            + np.exp(-((xx - 58) ** 2 + (yy - 22) ** 2) / 6) * 100).astype(np.float32)
    data[:3, :] = np.nan
    wcs = WCS(naxis=2)
    wcs.wcs.ctype = ["RA---TAN", "DEC--TAN"]
    wcs.wcs.crval = [search.ra, search.dec]
    wcs.wcs.crpix = [(size + 1) / 2] * 2
    wcs.wcs.cdelt = [-search.size / 60 / size, search.size / 60 / size]
    out = io.BytesIO()
    fits.HDUList([fits.PrimaryHDU(), fits.ImageHDU(data, header=wcs.to_header(), name="IMAGE")]).writeto(out)
    return out.getvalue()


def decode_png(data):
    position, compressed = 8, b""
    width = height = None
    while position < len(data):
        length = struct.unpack(">I", data[position:position + 4])[0]
        name = data[position + 4:position + 8]
        body = data[position + 8:position + 8 + length]
        if name == b"IHDR":
            width, height = struct.unpack(">II", body[:8])
        if name == b"IDAT":
            compressed += body
        position += length + 12
    rows = np.frombuffer(zlib.decompress(compressed), dtype=np.uint8).reshape(height, width * 4 + 1)
    assert not rows[:, 0].any()
    return rows[:, 1:].reshape(height, width, 4)


class RenderTests(unittest.TestCase):
    def test_common_crop_north_up_missing_pixels_and_real_png(self):
        for search in (Search(359.999, 30, 10), Search(0, 0, 10), Search(20, 89.9, 10)):
            png, metadata = render_preview(fits_fixture(search), search)
            self.assertTrue(png.startswith(b"\x89PNG\r\n\x1a\n"))
            pixels = decode_png(png)
            self.assertEqual(pixels.shape, (PREVIEW_SIZE, PREVIEW_SIZE, 4))
            y, x = np.unravel_index(pixels[:, :, 0].argmax(), (PREVIEW_SIZE, PREVIEW_SIZE))
            self.assertLess(y, PREVIEW_SIZE // 2)  # source's northern star stays above centre
            self.assertLess(x, PREVIEW_SIZE // 2)
            self.assertTrue((pixels[:, :, 3] == 0).any())
            self.assertGreater(metadata["coverageFraction"], .8)
            self.assertEqual(metadata["orientation"], "north-up-east-left")

    def test_rejects_non_image_missing_wcs_and_oversized_image(self):
        from unittest.mock import patch
        for hdul in (fits.HDUList([fits.PrimaryHDU()]), fits.HDUList([fits.PrimaryHDU(), fits.ImageHDU(np.ones((8, 8)), name="IMAGE")])):
            out = io.BytesIO(); hdul.writeto(out)
            with self.assertRaises(ValueError):
                render_preview(out.getvalue(), Search(0, 0, 10))
        with patch("previews.MAX_SOURCE_PIXELS", 10):
            with self.assertRaisesRegex(ValueError, "oversized"):
                render_preview(fits_fixture(), Search(0, 0, 10))

    def test_cutout_only_uses_irsa_spherex_and_exact_search_region(self):
        product = {"accessUrl": SCIENCE_URL}
        url = cutout_url(product, Search(359.9, -89, 10))
        query = parse_qs(urlsplit(url).query)
        self.assertEqual(query["center"], ["359.9,-89deg"])
        self.assertEqual(query["gzip"], ["false"])
        for value in ("https://evil.test/image.fits", "https://irsa.ipac.caltech.edu/ibe/data/unsupported/a.fits", "https://irsa.ipac.caltech.edu/ibe/data/spherex/%2e%2e/secret.fits"):
            with self.assertRaises(ValueError):
                cutout_url({"accessUrl": value}, Search(0, 0, 10))


class PreviewTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.store = Store(str(Path(self.directory.name) / "metadata.sqlite3"))
        self.image_requests = 0
        self.mode = "ok"
        self.release = asyncio.Event()
        self.entered = asyncio.Event()
        self.archive = ArchiveClient(httpx.AsyncClient(transport=httpx.MockTransport(self.handler)), record=self.store.record)
        self.coordinator = Coordinator(self.store, self.archive)
        self.manager = PreviewManager(self.store, self.archive, str(Path(self.directory.name) / "previews"), sleep=lambda _: asyncio.sleep(0))
        created = self.coordinator.start(Search(0, 0, 10))
        await asyncio.gather(*self.coordinator.tasks)
        self.job = self.store.get(created["id"])
        self.product = self.store.page(self.job["id"], self.job["version"])["products"][0]

    async def asyncTearDown(self):
        await self.manager.close()
        await self.coordinator.close()
        await self.archive.close()
        self.store.close()
        self.directory.cleanup()

    async def handler(self, request):
        if request.url.path == "/SIA":
            return httpx.Response(200, content=votable([{**ROW, "access_url": SCIENCE_URL}]))
        self.assertIn("application/fits", request.headers["accept"])
        self.image_requests += 1
        self.entered.set()
        if self.mode == "delayed":
            await self.release.wait()
        if self.mode == "transient" and self.image_requests == 1:
            return httpx.Response(503)
        if self.mode == "invalid":
            return httpx.Response(200, content=b"Not a FITS file")
        if self.mode == "redirect":
            return httpx.Response(302, headers={"Location": "https://evil.test/image.fits"})
        return httpx.Response(200, content=fits_fixture())

    def ensure(self, **kwargs):
        return self.manager.ensure(self.job["id"], self.job["version"], self.product["id"], **kwargs)

    async def finish(self):
        await asyncio.gather(*self.manager.tasks.values())

    async def test_dedup_persisted_cache_and_product_membership(self):
        first, duplicate = self.ensure(), self.ensure()
        self.assertEqual(first["id"], duplicate["id"])
        await self.finish()
        ready = self.manager.state(first["id"])
        self.assertEqual(ready["state"], "ready")
        self.assertEqual(self.image_requests, 1)
        self.assertTrue(self.manager.image(first["id"]).read_bytes().startswith(b"\x89PNG"))
        restored = PreviewManager(self.store, self.archive, self.manager.directory)
        self.assertEqual(restored.state(first["id"])["state"], "ready")
        self.assertEqual(restored.ensure(self.job["id"], self.job["version"], self.product["id"])["state"], "ready")
        with self.assertRaises(KeyError):
            self.manager.ensure(self.job["id"], self.job["version"], "0" * 64)
        with self.assertRaises(KeyError):
            self.manager.ensure("another-job", self.job["version"], self.product["id"])

    async def test_slow_fits_does_not_block_status_and_shares_global_irsa_slots(self):
        self.mode = "delayed"
        first = self.ensure()
        await self.entered.wait()
        self.assertEqual(self.manager.state(first["id"])["state"], "downloading")
        self.assertEqual(self.archive.slots._value, 1)
        self.release.set()
        await self.finish()
        self.assertEqual(self.manager.state(first["id"])["state"], "ready")

    async def test_invalid_fits_and_unsafe_redirect_can_be_retried(self):
        for mode in ("invalid", "redirect"):
            self.mode = mode
            entry = self.ensure(retry=True)
            await self.finish()
            self.assertEqual(self.manager.state(entry["id"])["state"], "error")
        self.mode = "ok"
        entry = self.ensure(retry=True)
        await self.finish()
        self.assertEqual(self.manager.state(entry["id"])["state"], "ready")

    async def test_transient_image_failure_retries_without_losing_the_frame(self):
        self.mode = "transient"
        entry = self.ensure()
        await self.finish()
        self.assertEqual(self.image_requests, 2)
        self.assertEqual(self.manager.state(entry["id"])["state"], "ready")

    async def test_png_http_contract_and_missing_preview(self):
        app.state.previews = self.manager
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
            response = await client.post(f'/searches/{self.job["id"]}/previews', json={"version": self.job["version"], "productId": self.product["id"]})
            self.assertEqual(response.status_code, 202)
            key = response.json()["id"]
            await self.finish()
            self.assertEqual((await client.get(f'/previews/{key}')).json()["state"], "ready")
            image = await client.get(f'/previews/{key}/image')
            self.assertEqual(image.headers["content-type"], "image/png")
            self.assertTrue(image.content.startswith(b"\x89PNG"))
            self.assertEqual((await client.get('/previews/missing')).status_code, 404)
            invalid = await client.post(f'/searches/{self.job["id"]}/previews', json={"version": self.job["version"], "productId": self.product["id"], "url": "https://evil.test"})
            self.assertEqual(invalid.status_code, 422)
