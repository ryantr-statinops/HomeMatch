import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = process.cwd();
const frontendRoots = ["src", "public", "apps"];
const forbiddenNames = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "GOOGLE_DRIVE_PRIVATE_KEY",
  "GOOGLE_DRIVE_CLIENT_EMAIL",
];

async function collectFiles(directory) {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    if (["node_modules", ".next", ".venv"].includes(entry.name)) {
      continue;
    }

    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath)));
    } else {
      files.push(entryPath);
    }
  }
  return files;
}

const candidates = [
  path.join(repositoryRoot, ".env.example"),
  ...(await Promise.all(
    frontendRoots.map((root) => collectFiles(path.join(repositoryRoot, root))),
  )).flat(),
];

const violations = [];
for (const file of candidates) {
  const content = await readFile(file, "utf8");
  for (const forbiddenName of forbiddenNames) {
    if (content.includes(forbiddenName)) {
      violations.push(`${path.relative(repositoryRoot, file)}: ${forbiddenName}`);
    }
  }
}

if (violations.length > 0) {
  console.error("Server-only environment names found in frontend files:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Frontend environment boundaries are valid.");
