import {test} from "node:test";
import assert from "node:assert/strict";
import {inspect} from "./check-env-boundaries.mjs";
test("allows public API origin", () => assert.deepEqual(inspect("import.meta.env.VITE_API_BASE_URL"), []));
test("rejects public secret and server access without exposing values", () => {
  for (const input of ["VITE_SECRET=private", "process.env.TOKEN", "import.meta.env['TOKEN']", "-----BEGIN PRIVATE KEY-----"]) assert.ok(inspect(input).length);
});
