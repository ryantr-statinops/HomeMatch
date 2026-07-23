import json
from pathlib import Path

from app.main import app


def main() -> None:
    repository_root = Path(__file__).resolve().parents[3]
    output_path = repository_root / "packages" / "api-spec" / "openapi.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(app.openapi(), indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )
    print(f"OpenAPI schema written to {output_path}")


if __name__ == "__main__":
    main()
