import asyncio
from datetime import datetime, timezone
import math
import unittest
from urllib.parse import parse_qs, urlsplit
from urllib.error import HTTPError, URLError
from xml.sax.saxutils import escape

from inventory import COLLECTIONS, Search, corners, matches, normalize, parse_votable, safe_irsa_url, sia_params


def votable(rows, status="OK"):
    fields = list(rows[0]) if rows else ["access_url"]
    return ("<VOTABLE><RESOURCE><INFO name='QUERY_STATUS' value='OK'/><TABLE>" +
            "".join(f"<FIELD name='{field}'/>" for field in fields) + "<DATA><TABLEDATA>" +
            "".join("<TR>" + "".join(f"<TD>{escape(str(row.get(field, '')))}</TD>" for field in fields) + "</TR>" for row in rows) +
            f"</TABLEDATA></DATA></TABLE><INFO name='QUERY_STATUS' value='{status}'/></RESOURCE></VOTABLE>").encode()


ROW = {"access_url": "https://irsa.ipac.caltech.edu/data/test/int.fits", "access_format": "image/fits", "dataproduct_type": "image",
       "obs_id": "frame1", "calib_level": "2", "em_min": "3e-6", "em_max": "4e-6", "energy_bandpassname": "SPHEREx-D4", "t_min": "61000", "t_max": "61001"}


class InventoryTests(unittest.TestCase):
    def test_only_spherex_is_supported(self):
        self.assertEqual(Search(0, 0, 10).mission, "spherex")
        self.assertEqual(list(COLLECTIONS), ["spherex"])
        self.assertEqual(COLLECTIONS["spherex"], ("spherex_dr1", "spherex_qr3"))
        for mission in ("wise", "twomass", "spitzer"):
            with self.assertRaisesRegex(ValueError, "Only SPHEREx"):
                Search(0, 0, 10, mission)
            self.assertIsNone(normalize(ROW, mission, "spherex_dr1", "source"))

    def test_region_validation(self):
        for values in [(float("nan"), 0, 10), (360, 0, 10), (0, 91, 10), (0, 0, 31)]:
            with self.assertRaises(ValueError):
                Search(*values, "spherex")
        with self.assertRaises(ValueError):
            Search(0, 0, 10, "spherex", start="2025-02-30")

    def test_tan_square_wrap_and_poles(self):
        for ra, dec in ((0, 0), (359.999, 40), (20, 90), (150, -90)):
            result = corners(Search(ra, dec, 30, "spherex"))
            self.assertEqual(len(result), 4)
            for lon, lat in result:
                cosine = math.sin(math.radians(dec)) * math.sin(math.radians(lat)) + math.cos(math.radians(dec)) * math.cos(math.radians(lat)) * math.cos(math.radians(ra - lon))
                self.assertAlmostEqual(math.degrees(math.acos(cosine)), 0.3535511, places=5)
                self.assertTrue(0 <= lon < 360 and -90 <= lat <= 90)

    def test_votable_overflow_and_errors(self):
        rows, overflow = parse_votable(votable([ROW], "OVERFLOW"))
        self.assertTrue(overflow)
        self.assertEqual(rows[0]["obs_id"], "frame1")
        with self.assertRaises(ValueError):
            parse_votable(votable([], "ERROR"))
        with self.assertRaises(ValueError):
            parse_votable(b"<VOTABLE><RESOURCE><TABLE><DATA><BINARY/></DATA></TABLE></RESOURCE></VOTABLE>")

    def test_normalization_and_no_fabricated_dates(self):
        product = normalize(ROW, "spherex", "spherex_dr1", "https://irsa.ipac.caltech.edu/SIA")
        self.assertEqual(product["kind"], "individual")
        self.assertAlmostEqual(product["wavelengthMin"], 3)
        self.assertEqual(product["observedStart"][:10], "2025-11-21")
        unknown = normalize({"access_url": ROW["access_url"]}, "spherex", "spherex_dr1", "source")
        self.assertIsNone(unknown["observedStart"])
        self.assertIsNone(unknown["wavelengthMin"])
        self.assertFalse(matches(unknown, Search(0, 0, 10, "spherex", start="2020-01-01")))
        self.assertEqual(normalize(ROW, "spherex", "spherex_dr1_cube", "source")["kind"], "combined")
        self.assertIsNone(normalize({**ROW, "content_qualifier": "#uncertainty"}, "spherex", "spherex_dr1", "source"))

    def test_url_validation(self):
        for url in ("https://evil.test/a.fits", "http://irsa.ipac.caltech.edu/a", "https://irsa.ipac.caltech.edu.evil.test/a", "https://user@irsa.ipac.caltech.edu/a", "https://irsa.ipac.caltech.edu:444/a"):
            self.assertIsNone(safe_irsa_url(url))
        self.assertEqual(safe_irsa_url("/data/a.fits"), "https://irsa.ipac.caltech.edu/data/a.fits")

    def test_native_tap_rejects_non_fits_artifacts(self):
        for uri in ("/data/preview.jpg", "/data/readme.txt", "/data/metadata.xml"):
            self.assertIsNone(normalize({"uri": uri}, "spherex", "spherex_native", "source"))
        self.assertIsNotNone(normalize({"uri": "/data/science.fits"}, "spherex", "spherex_native", "source"))

    def test_filter_intervals_and_query(self):
        product = normalize(ROW, "spherex", "spherex_dr1", "source")
        self.assertTrue(matches(product, Search(0, 0, 10, "spherex", band="spherex-d4", wave_min=3.5, wave_max=5, start="2025-11-22")))
        self.assertFalse(matches(product, Search(0, 0, 10, "spherex", wave_min=5)))
        params = dict(sia_params(Search(0, 90, 10, "spherex", wave_min=3, end="2020-01-01"), "spherex_dr1"))
        self.assertEqual(params["COLLECTION"], "spherex_dr1")
        self.assertTrue(params["POS"].startswith("CIRCLE "))
        self.assertAlmostEqual(float(params["POS"].split()[-1]), math.degrees(math.atan(math.sqrt(2) * math.tan(math.radians(10 / 120)))), places=9)
        self.assertIn("TIME", params)



if __name__ == "__main__":
    unittest.main()
