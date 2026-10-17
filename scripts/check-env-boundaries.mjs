import {readFile, readdir} from "node:fs/promises";
import path from "node:path";
import {pathToFileURL} from "node:url";

export function inspect(content) {
  const failures = [];
  if (/process\s*\.\s*env|import\.meta\.env\s*\[/.test(content)) failures.push("dynamic/server environment access");
  for (const name of content.match(/\bVITE_[A-Z0-9_]+\b/g) ?? []) {
    if (name !== "VITE_API_BASE_URL") failures.push("unapproved public environment name");
  }
  if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(content)) failures.push("server credential marker");
  return [...new Set(failures)];
}
async function collect(directory) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(file));
    else files.push(file);
  }
  return files;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const files = [...await collect("apps/web/src"), "apps/web/.env.example"];
  const violations = [];
  for (const file of files) for (const failure of inspect(await readFile(file, "utf8"))) violations.push(`${file}: ${failure}`);
  if (violations.length) { console.error(violations.join("\n")); process.exitCode = 1; }
  else console.log("Frontend environment boundaries valid.");
}
