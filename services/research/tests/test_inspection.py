import json
import tempfile
import unittest
from pathlib import Path
from research.__main__ import DEFAULT_FIXTURE, inspect_fixture

class InspectionTests(unittest.TestCase):
    def test_reject_malformed_objects(self):
        original = json.loads(DEFAULT_FIXTURE.read_text(encoding="utf-8"))
        for value in [None, [], {**original, "candles": [None]}, {**original, "instruments": [None]}]:
            with self.subTest(value=value), tempfile.TemporaryDirectory() as directory:
                path = Path(directory) / "market.json"
                path.write_text(json.dumps(value), encoding="utf-8")
                with self.assertRaises(ValueError):
                    inspect_fixture(path)

    def test_repository_fixture(self):
        result = inspect_fixture(DEFAULT_FIXTURE)
        self.assertEqual(result["instrument_count"], 2)
        self.assertEqual(result["candle_count"], 2)
        self.assertTrue(result["is_synthetic"])

    def test_reject_non_synthetic(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "market.json"
            data = json.loads(DEFAULT_FIXTURE.read_text(encoding="utf-8"))
            data["is_synthetic"] = False
            path.write_text(json.dumps(data), encoding="utf-8")
            with self.assertRaises(ValueError):
                inspect_fixture(path)

    def test_reject_unclosed_candle(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "market.json"
            data = json.loads(DEFAULT_FIXTURE.read_text(encoding="utf-8"))
            data["candles"][0]["is_closed"] = False
            path.write_text(json.dumps(data), encoding="utf-8")
            with self.assertRaises(ValueError):
                inspect_fixture(path)
