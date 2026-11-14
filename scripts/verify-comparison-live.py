"""Live metadata-only acceptance, against the web proxy (stdlib only)."""
import json
import sys
import time
from urllib.request import Request, urlopen

base = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3000"

def request(path, data=None):
    req = Request(base + "/api/comparison" + path, data=json.dumps(data).encode() if data else None,
        headers={"Content-Type": "application/json"})
    with urlopen(req, timeout=15) as response:
        return json.load(response)

started = time.monotonic()
job = request("/searches", {"ra": 210.86253, "dec": 54.35504, "size": 10, "refresh": True})
print(json.dumps({"postMs": round((time.monotonic() - started) * 1000), "id": job["id"], "state": job["state"]}), flush=True)
job_id = job["id"]
last_progress = None
while job["state"] in ("queued", "running") and time.monotonic() - started < 160:
    time.sleep(2)
    job = request("/searches/" + job_id)
    summary = {"seconds": round(time.monotonic() - started, 1), "state": job["state"], "status": job["status"], "total": job["total"],
        "collections": [{k: c.get(k) for k in ("name", "state", "attempts", "error")} for c in job["collections"]]}
    signature = json.dumps({k: v for k, v in summary.items() if k != "seconds"}, sort_keys=True)
    if signature != last_progress:
        print(json.dumps(summary), flush=True)
        last_progress = signature
if job["version"]:
    page = request(f'/searches/{job_id}/results?version={job["version"]}')
    print(json.dumps({"pageSize": len(page["products"]), "total": page["total"], "version": page["version"]}), flush=True)
print(json.dumps({"health": request("/health")}), flush=True)
