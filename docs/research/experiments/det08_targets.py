"""Experiment 08: target astrometry and predicted positions (proper motion + parallax).

Predicted position = barycentric space motion to the epoch, then the direction as seen
from the geocentre (SPHEREx is in low Earth orbit, so geocentric parallax is what matters).
Aberration is NOT applied: SPHEREx WCS is ICRS (astrometric), like Gaia.
"""
import numpy as np
import astropy.units as u
from astropy.coordinates import SkyCoord, Distance, get_body_barycentric, CartesianRepresentation
from astropy.time import Time

TARGETS = {
    # Gaia DR3 (epoch 2016.0), values from the brief; match Gaia DR3 as remembered.
    "barnard": dict(ra=269.44850, dec=4.73981, pmra=-801.6, pmdec=10362.4, plx=547.0,
                    rv=-110.6, epoch=Time(2016.0, format="jyear", scale="tdb")),
    # Reference position = AllWISE J085510.74-071442.5 (IRSA allwise_p3as_psd), AllWISE
    # positions are at epoch MJD 55400.0 (2010.56). The challenge coordinates
    # (133.795129, -7.245147) agree with it to 1.3", so they are epoch ~2010.5, NOT 2014.
    # pm/plx from the brief (literature, Luhman & Esplin 2016 / Kirkpatrick et al.).
    "w0855": dict(ra=133.7947597, dec=-7.2451456, pmra=-8123.0, pmdec=673.0, plx=439.0,
                  rv=0.0, epoch=Time(55400.0, format="mjd", scale="tdb")),
}
# The brief's assumption, kept to quantify how wrong "epoch 2014" would be.
W0855_BRIEF = dict(TARGETS["w0855"], ra=133.795129, dec=-7.245147,
                   epoch=Time(2014.0, format="jyear", scale="tdb"))


def predict(name, mjd, params=None):
    """Return (ra, dec) arrays in deg of the target as seen from the geocentre at MJD(s)."""
    p = params or TARGETS[name]
    c = SkyCoord(ra=p["ra"] * u.deg, dec=p["dec"] * u.deg,
                 distance=Distance(parallax=p["plx"] * u.mas),
                 pm_ra_cosdec=p["pmra"] * u.mas / u.yr, pm_dec=p["pmdec"] * u.mas / u.yr,
                 radial_velocity=p["rv"] * u.km / u.s, obstime=p["epoch"], frame="icrs")
    t = Time(np.atleast_1d(mjd), format="mjd", scale="tdb")
    moved = c.apply_space_motion(new_obstime=t).cartesian
    earth = get_body_barycentric("earth", t)
    topo = CartesianRepresentation(moved.x - earth.x, moved.y - earth.y, moved.z - earth.z)
    s = SkyCoord(topo, frame="icrs")
    return s.ra.deg, s.dec.deg


if __name__ == "__main__":
    # sanity: Barnard moves ~10.4"/yr north; WISE 0855 ~8.15"/yr west
    r0, d0 = predict("barnard", 57388.5)  # ~2016.0
    r1, d1 = predict("barnard", 57388.5 + 365.25)
    dy = (d1 - d0)[0] * 3600
    assert 9.5 < dy < 11.5, dy
    for name in TARGETS:
        print(name, [f"{a:.5f},{b:.5f}" for a, b in zip(*predict(name, [60800, 61000, 61300]))])
    print("w0855 brief-epoch-2014 assumption:",
          [f"{a:.5f},{b:.5f}" for a, b in zip(*predict("w0855", [60800, 61000, 61300], W0855_BRIEF))])
