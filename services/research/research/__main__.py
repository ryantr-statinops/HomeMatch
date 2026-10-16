"""Inspect a synthetic fixture, without training or network access."""
import argparse
import json
from pathlib import Path

DEFAULT_FIXTURE = Path(__file__).resolve().parents[3] / "data" / "fixtures" / "market.json"

def inspect_fixture(path: Path) -> dict:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("Fixture must be an object")
    if data.get("is_synthetic") is not True or data.get("source_id") != "fixture-only":
        raise ValueError("Only synthetic fixture-only datasets are accepted")
    if data.get("schema_version") != "1":
        raise ValueError("Unsupported fixture schema")
    instruments, candles = data.get("instruments"), data.get("candles")
    if not isinstance(instruments, list) or not isinstance(candles, list):
        raise ValueError("Fixture requires instrument and candle arrays")
    if any(not isinstance(item, dict) for item in instruments + candles):
        raise ValueError("Instrument and candle entries must be objects")
    ids = {item["instrument_id"] for item in instruments}
    if any(row.get("instrument_id") not in ids or row.get("is_closed") is not True for row in candles):
        raise ValueError("Fixture contains unknown instruments or unclosed candles")
    return {"schema_version": data["schema_version"], "is_synthetic": True,
            "source_id": data["source_id"], "instrument_count": len(instruments),
            "candle_count": len(candles), "mode": "inspection-only"}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--fixture", type=Path, default=DEFAULT_FIXTURE)
    args = parser.parse_args()
    try:
        print(json.dumps(inspect_fixture(args.fixture), sort_keys=True))
    except (OSError, ValueError, KeyError, TypeError) as exc:
        parser.exit(2, f"Invalid fixture: {exc}\n")

if __name__ == "__main__":
    main()
