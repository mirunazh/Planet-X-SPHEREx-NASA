"""Metadata -> background FITS cutout -> same-origin PNG, using real IRSA data."""
import json
from pathlib import Path
import sys
import time
from urllib.parse import urlencode
from urllib.request import Request, urlopen

base = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3000"

def request(path, body=None):
    req = Request(base + "/api/comparison" + path, data=json.dumps(body).encode() if body is not None else None,
        headers={"Content-Type": "application/json"})
    with urlopen(req, timeout=15) as response:
        return json.load(response)

start = time.monotonic()
job = request('/searches', {"ra": 210.80227, "dec": 54.34895, "size": 6})
print(json.dumps({"search": job["id"], "state": job["state"]}), flush=True)
last = None
while time.monotonic() - start < 180:
    if job.get('version') and job['total']:
        page = request(f'/searches/{job["id"]}/results?' + urlencode({"version": job["version"]}))
        for product in page['products'][:5]:
            print(json.dumps({"total": page['total'], "product": product['title'], "accessUrl": product['accessUrl']}), flush=True)
            preview = request(f'/searches/{job["id"]}/previews', {"version": job['version'], "productId": product['id'], "retry": True})
            while preview['state'] not in ('ready', 'error') and time.monotonic() - start < 240:
                time.sleep(2)
                preview = request('/previews/' + preview['id'])
            print(json.dumps({"preview": preview}), flush=True)
            if preview['state'] != 'ready':
                continue
            with urlopen(base + '/api/comparison/previews/' + preview['id'] + '/image', timeout=15) as response:
                png = response.read()
                assert response.headers['Content-Type'].startswith('image/png')
                assert png.startswith(b'\x89PNG\r\n\x1a\n')
            Path('.comparison-data').mkdir(exist_ok=True)
            Path('.comparison-data/live-slideshow.png').write_bytes(png)
            print(json.dumps({"pngBytes": len(png), "elapsedSeconds": round(time.monotonic() - start, 1)}), flush=True)
            break
        else:
            raise SystemExit('None of the first five live previews could be displayed')
        break
    if job['state'] not in ('queued', 'running'):
        print(json.dumps(job), flush=True)
        raise SystemExit('Live archive search failed; do not infer missing coverage')
    state = [(c['name'], c['state']) for c in job['collections']]
    if state != last:
        print(json.dumps({"state": job['state'], "collections": state}), flush=True)
        last = state
    time.sleep(2)
    job = request('/searches/' + job['id'])
else:
    raise SystemExit('Live test stopped waiting; the background search can continue')
