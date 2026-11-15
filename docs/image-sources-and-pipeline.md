# SPHEREx images and processing

The application displays SPHEREx images only. NASA/IPAC IRSA is the archive used for maps, spectral images and cutouts. Named-place coordinates come from recorded NED, IRSA and IAU reference metadata; the two named-star reference positions retain their NASA Exoplanet Archive provenance.

## Data used now

| Surface | SPHEREx product | Access |
| --- | --- | --- |
| Navigator | DR1 all-sky spectral cube, 102 channels | HiPS tiles streamed from IRSA |
| Introduction | DR1 map projection around the south ecliptic pole, 2.19 µm | Bundled JPEG generated from SPHEREx HiPS |
| Slideshow | Individual spectral images from DR1 and QR3 | IRSA SIA metadata, followed by FITS cutouts |
| Weekly challenge | Up to twelve prepared images of the M101 region | Persistent server-side PNG cache |

The map and slideshow have different resolutions and loading paths. Map pixels are about 12.9 arcseconds; deeper zoom magnifies them. Individual exposure cutouts are processed separately and are not substituted into the map.

## Navigator and introduction

The browser requests SPHEREx HiPS tiles from:

```text
https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube
```

`src/lib/sky/surveys.ts` defines the single supported survey, wavelengths, usable channels and credits. The wavelength slider skips the two blank channels.

`npm run data:intro` rebuilds the bundled introduction projection. `public/intro/sources.json` records the SPHEREx source, channel, projection, processing and retrieval time. A small gap in the original map is filled with the local sky level for display and is described in the introduction. This projection is for orientation, not measurement.

## Slideshow processing

1. Choose an ICRS position and a square width between 0.5 and 30 arcminutes.
2. The Python service queries IRSA SIA for `spherex_dr1` and `spherex_qr3`. Its search circle encloses the requested square.
3. Versioned metadata pages retain product URLs, collection, detector range and observation dates.
4. The service requests a FITS cutout for the current exposure, reads its `IMAGE` extension and celestial WCS, and resamples onto a common north-up/east-left grid.
5. A per-image asinh contrast stretch produces a display PNG; missing pixels remain transparent.
6. The browser displays the current frame and preloads one successor. PNGs are cached separately from metadata.

The slideshow labels the spectral interval as a detector range: the precise wavelength at the target position is not computed in this stage. Per-frame brightness differences cannot establish variability because display contrast and wavelength can differ. Overlay, subtraction, source classification and automated discovery are future work.

## Weekly challenge

The challenge keeps the same 6′ square around M101. Its week starts Monday at 00:00 UTC; background archive checks are due every six hours while the service runs. IRSA errors can delay them.

The first successful inventory establishes the baseline. Products first seen later are counted for the current week, separately from their observation dates. Up to twelve usable frames are selected across dates in one detector range, preferring D3, and stored in a dedicated persistent cache. Existing prepared frames remain available during refreshes.

## Provenance and credits

- SPHEREx: NASA/JPL-Caltech; SPHEREx Science Data Center, Caltech/IPAC.
- Archive: NASA/IPAC Infrared Science Archive.
- Coordinate reference services: NED, the NASA Exoplanet Archive for the named-star positions, and recorded IAU coordinate definitions.
- Image provenance is preserved; display transformations are labelled rather than presented as raw science pixels.

The project is not endorsed by NASA.

## References

- [SPHEREx mission at IRSA](https://irsa.ipac.caltech.edu/Missions/spherex.html)
- [SPHEREx all-sky HiPS properties](https://irsa.ipac.caltech.edu/data/hips/SPHEREx/spherex_allsky_cube/properties)
- [SPHEREx first all-sky map](https://www.jpl.nasa.gov/images/pia26600-spherexs-first-all-sky-map/)
- [SPHEREx data access](https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-access/)
- [SPHEREx releases](https://irsa.ipac.caltech.edu/spherex-archive-documentation/spherex-data-releases/)
- [SPHEREx cutout tutorial](https://caltech-ipac.github.io/irsa-tutorials/spherex-cutouts/)
