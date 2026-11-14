"""One reusable, cancellable metadata client; two IRSA requests across all jobs."""
import asyncio
from dataclasses import dataclass
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
import logging
import random
import time
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit

import httpx
from inventory import MAX_BYTES, parse_votable, safe_irsa_url

log = logging.getLogger("comparison.requests")
TRANSIENT = {429, 502, 503, 504}


class Suspended(Exception):
    pass


@dataclass
class Circuit:
    failures: int = 0
    until: float = 0
    probing: bool = False


class ArchiveClient:
    def __init__(self, client=None, record=lambda event: None, sleep=asyncio.sleep, jitter=random.random, attempt_timeout=25):
        self.attempt_timeout = attempt_timeout
        self.client = client or httpx.AsyncClient(timeout=attempt_timeout, follow_redirects=False,
            limits=httpx.Limits(max_connections=2, max_keepalive_connections=2),
            headers={"User-Agent": "SPHEREx-Sky-Navigator/0.2", "Accept": "application/x-votable+xml"})
        self.slots = asyncio.Semaphore(2)
        self.circuits = {}
        self.record, self.sleep, self.jitter = record, sleep, jitter
        self.last = None

    async def close(self):
        await self.client.aclose()

    async def _read(self, url):
        for _ in range(4):
            if not safe_irsa_url(url):
                raise ValueError("Untrusted archive URL")
            async with self.client.stream("GET", url, timeout=self.attempt_timeout) as response:
                if response.is_redirect:
                    from urllib.parse import urljoin
                    url = urljoin(url, response.headers.get("location", ""))
                    continue
                response.raise_for_status()
                chunks, size = [], 0
                async for chunk in response.aiter_bytes():
                    size += len(chunk)
                    if size > MAX_BYTES:
                        raise ValueError("IRSA metadata exceeded the response limit; narrow the search")
                    chunks.append(chunk)
                return parse_votable(b"".join(chunks))
        raise ValueError("Too many archive redirects")

    async def query(self, url, job_id, deadline, progress=lambda **kwargs: None):
        endpoint = urlsplit(url).path.rstrip("/")
        circuit = self.circuits.setdefault(endpoint, Circuit())
        for attempt in range(1, 4):
            remaining = deadline - time.monotonic() if deadline is not None else None
            if remaining is not None and remaining <= 0:
                raise TimeoutError("Execution budget exhausted")
            async with asyncio.timeout(remaining):
                async with self.slots:
                    now = time.monotonic()
                    if circuit.until > now or circuit.probing:
                        progress(state="suspended", error="Archive endpoint suspended; retry after its 60 second cooldown.")
                        raise Suspended("Archive endpoint suspended for 60 seconds")
                    probe = circuit.failures >= 5
                    if probe:
                        circuit.probing = True
                    started, status, reason, retry_after, count = now, None, None, None, 0
                    progress(state="running", attempts=attempt, endpoint=endpoint, error=None)
                    try:
                        request_budget = self.attempt_timeout
                        if deadline is not None:
                            request_budget = min(request_budget, deadline - now) if request_budget is not None else deadline - now
                        async with asyncio.timeout(request_budget):
                            result = await self._read(url)
                        count = len(result[0])
                        circuit.failures, circuit.until = 0, 0
                        self.last = {"ok": True, "endpoint": endpoint, "checkedAt": datetime.now(timezone.utc).isoformat(), "httpStatus": 200}
                        return result
                    except asyncio.CancelledError:
                        reason = "Request interrupted"
                        raise
                    except Exception as error:
                        status = error.response.status_code if isinstance(error, httpx.HTTPStatusError) else 200 if isinstance(error, (ValueError, ET.ParseError)) else None
                        transient = isinstance(error, (httpx.TransportError, TimeoutError)) or status in TRANSIENT
                        reason = f"Archive HTTP {status}" if isinstance(error, httpx.HTTPStatusError) else "Archive request timed out" if isinstance(error, (httpx.TimeoutException, TimeoutError)) else "Archive metadata unavailable or invalid"
                        circuit.failures += 1
                        if circuit.failures >= 5:
                            circuit.until = time.monotonic() + 60
                        self.last = {"ok": False, "endpoint": endpoint, "checkedAt": datetime.now(timezone.utc).isoformat(), "httpStatus": status, "error": reason}
                        if status in TRANSIENT:
                            raw = error.response.headers.get("retry-after", "")
                            try:
                                retry_after = max(0, float(raw))
                            except ValueError:
                                try:
                                    retry_after = max(0, (parsedate_to_datetime(raw) - datetime.now(timezone.utc)).total_seconds())
                                except (ValueError, TypeError, OverflowError):
                                    pass
                        if not transient or attempt == 3 or circuit.until > time.monotonic():
                            raise RuntimeError(reason) from error
                    finally:
                        circuit.probing = False
                        event = {"jobId": job_id, "endpoint": endpoint, "attempt": attempt, "durationMs": round((time.monotonic() - started) * 1000), "httpStatus": status or (200 if reason is None else None), "error": reason, "resultCount": count}
                        self.record(event)
                        log.info("archive_request %s", event)
            delay = retry_after if retry_after is not None else 2 ** (attempt - 1) + self.jitter()
            if deadline is not None and delay >= deadline - time.monotonic():
                raise TimeoutError("Retry delay exceeds execution budget")
            progress(state="retrying", error=reason)
            await self.sleep(delay)
