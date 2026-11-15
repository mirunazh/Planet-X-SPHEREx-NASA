"""Bounded IRSA metadata discovery. This module never downloads an image.

SIA has MAXREC but no offset. We retain a bounded metadata snapshot for stable
100-record pages and explicitly report OVERFLOW and local safety limits.
"""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
import hashlib
import math
import re
from urllib.parse import urlencode, urljoin, urlsplit
import xml.etree.ElementTree as ET

IRSA = "https://irsa.ipac.caltech.edu"
MAX_RECORDS = 2000
MAX_BYTES = 8 * 1024 * 1024
COLLECTIONS = {
    "spherex": ("spherex_dr1", "spherex_qr3"),
}
MJD_EPOCH = datetime(1858, 11, 17, tzinfo=timezone.utc)


@dataclass(frozen=True)
class Search:
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
    nearby_radius: float | None = None

    def __post_init__(self):
        if not all(math.isfinite(v) for v in (self.ra, self.dec, self.size)):
            raise ValueError("Coordinates and size must be finite")
        if not (0 <= self.ra < 360 and -90 <= self.dec <= 90 and 0.5 <= self.size <= 30):
            raise ValueError("Use ICRS RA 0–360°, Dec −90–90°, and width 0.5–30 arcmin")
        if self.mission not in COLLECTIONS:
            raise ValueError("Only SPHEREx image discovery is supported")
        if self.kind not in ("all", "individual", "combined"):
            raise ValueError("Unknown product type")
        if len(self.band) > 80:
            raise ValueError("Band is too long")
        for wave in (self.wave_min, self.wave_max):
            if wave is not None and (not math.isfinite(wave) or not 0 < wave <= 1000):
                raise ValueError("Wavelength must be positive and at most 1000 microns")
        if self.wave_min is not None and self.wave_max is not None and self.wave_min > self.wave_max:
            raise ValueError("Wavelength interval is reversed")
        for date in (self.start, self.end):
            if date:
                datetime.strptime(date, "%Y-%m-%d")
        if self.start and self.end and self.start > self.end:
            raise ValueError("Observation date interval is reversed")
        if self.nearby_radius is not None and (not math.isfinite(self.nearby_radius) or not 1 <= self.nearby_radius <= 5):
            raise ValueError("Nearby search radius must be between 1 and 5 degrees")


def corners(search: Search) -> list[tuple[float, float]]:
    """Inverse TAN corners of a north-up square, valid across RA=0 and poles."""
    ra, dec = math.radians(search.ra), math.radians(search.dec)
    c = (math.cos(dec) * math.cos(ra), math.cos(dec) * math.sin(ra), math.sin(dec))
    east = (-math.sin(ra), math.cos(ra), 0)
    north = (-math.sin(dec) * math.cos(ra), -math.sin(dec) * math.sin(ra), math.cos(dec))
    half = math.tan(math.radians(search.size / 120))
    result = []
    for x, y in ((-half, -half), (half, -half), (half, half), (-half, half)):
        v = [c[i] + x * east[i] + y * north[i] for i in range(3)]
        result.append((math.degrees(math.atan2(v[1], v[0])) % 360,
                       math.degrees(math.atan2(v[2], math.hypot(v[0], v[1])))))
    return result


def polygon(search: Search) -> str:
    return " ".join(f"{v:.10f}" for pair in corners(search) for v in pair)


def safe_irsa_url(value: str) -> str | None:
    url = urljoin(IRSA + "/", value)
    parsed = urlsplit(url)
    try:
        port = parsed.port
    except ValueError:
        return None
    if parsed.scheme != "https" or parsed.hostname != "irsa.ipac.caltech.edu" or port not in (None, 443) or parsed.username or parsed.password:
        return None
    return url


def parse_votable(data: bytes) -> tuple[list[dict], bool]:
    if b"<!DOCTYPE" in data.upper() or b"<!ENTITY" in data.upper():
        raise ValueError("Unsupported XML declarations")
    root = ET.fromstring(data)
    statuses = [e for e in root.iter() if e.tag.split("}")[-1] == "INFO" and e.get("name", "").upper() == "QUERY_STATUS"]
    for status in statuses:
        if status.get("value", "").upper() == "ERROR":
            raise ValueError("IRSA rejected the metadata query")
    overflow = any(e.get("value", "").upper() == "OVERFLOW" for e in statuses)
    table = next((e for e in root.iter() if e.tag.split("}")[-1] == "TABLE"), None)
    if table is None:
        raise ValueError("IRSA returned no metadata table")
    fields = [e.get("name", "").lower() for e in table if e.tag.split("}")[-1] == "FIELD"]
    # Request TABLEDATA explicitly; never silently interpret a binary table as empty.
    tabledata = next((e for e in table.iter() if e.tag.split("}")[-1] == "TABLEDATA"), None)
    if tabledata is None:
        raise ValueError("Unsupported IRSA table encoding")
    rows = []
    for tr in tabledata:
        values = ["".join(td.itertext()).strip() for td in tr]
        if len(values) != len(fields):
            raise ValueError("Malformed IRSA table row")
        rows.append(dict(zip(fields, values)))
    return rows, overflow


def number(value) -> float | None:
    try:
        v = float(value)
        return v if math.isfinite(v) else None
    except (ValueError, TypeError):
        return None


def observed(value) -> str | None:
    v = number(value)
    try:
        return (MJD_EPOCH + timedelta(days=v)).isoformat().replace("+00:00", "Z") if v is not None else None
    except (OverflowError, ValueError):
        return None


def image_center(row: dict) -> dict | None:
    """Use archive ICRS centres, or a spherical centroid of a convex image footprint."""
    ra, dec = number(row.get("s_ra")), number(row.get("s_dec"))
    if ra is not None and dec is not None and 0 <= ra < 360 and -90 <= dec <= 90:
        return {"ra": ra, "dec": dec}
    footprint = str(row.get("s_region") or row.get("poly") or "").strip()
    match = re.fullmatch(r"(POLYGON|CIRCLE)\s+(?:ICRS\s+)?([\d.eE+\-\s]+)", footprint, re.IGNORECASE)
    if not match:
        return None
    try:
        values = [float(v) for v in match[2].split()]
    except ValueError:
        return None
    if not all(math.isfinite(v) for v in values):
        return None
    if match[1].upper() == "CIRCLE":
        if len(values) == 3 and 0 <= values[0] < 360 and -90 <= values[1] <= 90 and 0 <= values[2] <= 180:
            return {"ra": values[0], "dec": values[1]}
        return None
    if len(values) < 6 or len(values) % 2:
        return None
    pairs = list(zip(values[::2], values[1::2]))
    if any(not 0 <= lon <= 360 or not -90 <= lat <= 90 for lon, lat in pairs):
        return None
    if pairs[-1] == pairs[0]:
        pairs.pop()
    vectors = [(math.cos(math.radians(lat)) * math.cos(math.radians(lon)),
                math.cos(math.radians(lat)) * math.sin(math.radians(lon)), math.sin(math.radians(lat))) for lon, lat in pairs]
    x, y, z = (sum(v[i] for v in vectors) for i in range(3))
    if math.sqrt(x*x + y*y + z*z) < 1e-10:
        return None
    longitude = math.degrees(math.atan2(y, x)) % 360
    return {"ra": 0 if longitude >= 360 else longitude, "dec": math.degrees(math.atan2(z, math.hypot(x, y)))}


def nearby_distance(product: dict, search: Search) -> float:
    """Angular distance to the image centre, in degrees; unknown centres sort last."""
    center = product.get("center")
    if not center:
        return math.inf
    a, b = math.radians(search.dec), math.radians(center["dec"])
    dra = math.radians(center["ra"] - search.ra)
    h = math.sin((b-a)/2)**2 + math.cos(a)*math.cos(b)*math.sin(dra/2)**2
    return math.degrees(2 * math.asin(math.sqrt(max(0, min(1, h)))))


def normalize(row: dict, mission: str, collection: str, source: str) -> dict | None:
    if mission != "spherex" or collection not in (*COLLECTIONS["spherex"], "spherex_native", "spherex_dr1_deep", "spherex_qr3_deep", "spherex_dr1_cube"):
        return None
    def get(*keys):
        return next((row[k] for k in keys if row.get(k) not in (None, "")), None)
    dtype = (get("dataproduct_type") or "image").lower()
    fmt = (get("access_format", "contenttype") or "").lower()
    qualifier = (get("dataproduct_subtype", "producttype", "content_qualifier") or "").lower()
    raw_url = get("access_url", "uri")
    if dtype not in ("image", "cube") or (fmt and "fits" not in fmt and "gzip" not in fmt):
        return None
    # SIA also returns uncertainty, mask, coverage, and artifact files.
    if any(word in qualifier for word in ("uncert", "mask", "coverage", "noise", "artifact", "variance", "weight")):
        return None
    if not raw_url:
        return None
    url = safe_irsa_url(raw_url)
    if not url:
        return None
    name = urlsplit(url).path.lower()
    if not fmt and not name.endswith((".fits", ".fit", ".fts", ".fits.gz", ".fits.fz")):
        return None
    if any(word in name for word in ("-unc-", "-cov-", "-msk-", "_bunc", "_bimsk", "_unc.", "_mask.")):
        return None
    level = number(get("calib_level", "calibrationlevel"))
    combined = collection == "spherex_dr1_cube"
    kind = "combined" if combined or (level is not None and level >= 3) else "individual" if level == 2 else "unknown"
    lo, hi = number(get("em_min", "energy_bounds_lower")), number(get("em_max", "energy_bounds_upper"))
    title = get("obs_title", "obs_id", "obs_publisher_did", "planeid") or urlsplit(url).path.rsplit("/", 1)[-1]
    return {
        "id": hashlib.sha256(url.encode()).hexdigest(),
        "mission": mission, "collection": collection, "title": str(title),
        "band": get("energy_bandpassname", "bandpass", "filter"),
        "wavelengthMin": lo * 1e6 if lo is not None else None,
        "wavelengthMax": hi * 1e6 if hi is not None else None,
        "observedStart": observed(get("t_min", "time_bounds_lower")),
        "observedEnd": observed(get("t_max", "time_bounds_upper")),
        "kind": kind, "coverage": "Intersects search region; crop coverage checked when displayed",
        "footprint": get("s_region", "poly"), "sourceUrl": source, "accessUrl": url,
        "center": image_center(row),
    }


def matches(product: dict, search: Search) -> bool:
    if search.kind != "all" and product["kind"] != search.kind:
        return False
    if search.band and search.band.casefold() not in (product["band"] or "").casefold():
        return False
    lo, hi = product["wavelengthMin"], product["wavelengthMax"]
    if search.wave_min is not None and (hi is None or hi < search.wave_min):
        return False
    if search.wave_max is not None and (lo is None or lo > search.wave_max):
        return False
    start, end = product["observedStart"], product["observedEnd"]
    if search.start and (not (end or start) or (end or start)[:10] < search.start):
        return False
    if search.end and (not (start or end) or (start or end)[:10] > search.end):
        return False
    return True


def sia_params(search: Search, collection: str) -> list[tuple[str, str]]:
    radius = search.nearby_radius or math.degrees(math.atan(math.sqrt(2) * math.tan(math.radians(search.size / 120))))
    params = [("COLLECTION", collection), ("POS", f"CIRCLE {search.ra} {search.dec} {radius:.10f}"),
              ("MAXREC", str(MAX_RECORDS + 1)), ("RESPONSEFORMAT", "VOTABLE")]
    if search.wave_min is not None or search.wave_max is not None:
        params.append(("BAND", f"{search.wave_min * 1e-6 if search.wave_min else '-Inf'} {search.wave_max * 1e-6 if search.wave_max else '+Inf'}"))
    if search.start or search.end:
        def mjd(date):
            return (datetime.strptime(date, "%Y-%m-%d").replace(tzinfo=timezone.utc) - MJD_EPOCH).total_seconds() / 86400
        params.append(("TIME", f"{mjd(search.start) if search.start else '-Inf'} {mjd(search.end) + 1 if search.end else '+Inf'}"))
    return params


def spherex_tap_url(search: Search) -> str:
    """Mission adapter for the native SPHEREx plane/artifact inventory."""
    vertices = ",".join(str(v) for pair in corners(search) for v in pair)
    region = f"CIRCLE('ICRS',{search.ra},{search.dec},{search.nearby_radius})" if search.nearby_radius else f"POLYGON('ICRS',{vertices})"
    query = (f"SELECT TOP {MAX_RECORDS + 1} p.*, a.uri FROM spherex.plane p "
             "JOIN spherex.artifact a ON p.planeid=a.planeid "
             f"WHERE INTERSECTS(p.poly,{region})=1")
    return IRSA + "/TAP/sync?" + urlencode({"REQUEST": "doQuery", "LANG": "ADQL", "QUERY": query, "FORMAT": "VOTABLE", "MAXREC": MAX_RECORDS + 1})

