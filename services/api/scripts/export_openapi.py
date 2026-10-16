"""Export deterministic fixture-only schema from repository root or this service."""
import json
import sys
from pathlib import Path

service_root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(service_root))
from app.main import app

if __name__ == "__main__":
    target = service_root.parents[1] / "packages" / "contracts" / "openapi.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(app.openapi(), ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(target)
