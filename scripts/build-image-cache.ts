/**
 * build-image-cache.ts — Script 1 lần
 *
 * 1. Đọc toàn bộ path ảnh từ Supabase (PHONGTRO.HinhAnhChinh, HINHANH.HinhAnh)
 * 2. Resolve từng path → Google Drive URL (dùng Drive API)
 * 3. Insert mapping vào table ImageCache
 *
 * Cách chạy:
 *   npx tsx scripts/build-image-cache.ts
 */

import { createClient } from "@supabase/supabase-js";
import { google } from "googleapis";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, "..", ".env.local") });

// --- Config ---
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

const DRIVE_FOLDERS: Record<string, string> = {
  PHONGTRO_Images: "1VIzgVkAuViOCMNdqVI1_7k8pjSHkVm2e",
  HINHANH_Images: "1KxwLP1D-8M71bIj1g-qtvyoOGXX49SIh",
};

const SERVICE_ACCOUNT_PATH = path.resolve(
  __dirname,
  "homematch-service-account.json",
);

// --- Init ---
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function main() {
  console.log("=== BUILD IMAGE CACHE ===\n");

  // 1. Auth Google Drive
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_PATH,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  const drive = google.drive({ version: "v3", auth });

  // 2. Build mapping filename → driveUrl
  console.log("Listing files from Drive folders...");
  const filenameToUrl = new Map<string, string>();

  for (const [folderName, folderId] of Object.entries(DRIVE_FOLDERS)) {
    let pageToken: string | undefined;
    let count = 0;

    do {
      const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields: "nextPageToken, files(id, name)",
        pageSize: 1000,
        pageToken,
      });

      const files = res.data.files || [];
      for (const file of files) {
        if (file.name && file.id) {
          const driveUrl = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;
          filenameToUrl.set(file.name, driveUrl);
          count++;
        }
      }

      pageToken = res.data.nextPageToken ?? undefined;
    } while (pageToken);

    console.log(`  ${folderName}: ${count} files`);
  }

  console.log(`\nTotal unique filenames in Drive: ${filenameToUrl.size}\n`);

  // 3. Read paths from Supabase
  console.log("Reading image paths from Supabase...");
  const paths = new Set<string>();

  const { data: phongtro, error: err1 } = await supabase
    .from("phongtro")
    .select("hinhanhchinh");

  if (err1) {
    console.error("Query phongtro failed:", err1);
    return;
  }
  for (const row of phongtro || []) {
    if (row.hinhanhchinh) paths.add(row.hinhanhchinh);
  }

  const { data: hinhanh, error: err2 } = await supabase
    .from("hinhanh")
    .select("hinhanh");

  if (err2) {
    console.error("Query hinhanh failed:", err2);
    return;
  }
  for (const row of hinhanh || []) {
    if (row.hinhanh) paths.add(row.hinhanh);
  }

  console.log(`Unique paths from DB: ${paths.size}\n`);

  // 4. Build cache entries
  const cacheEntries: { path: string; drive_url: string }[] = [];
  const missed: string[] = [];

  for (const p of paths) {
    const fileName = p.split("/").pop();
    if (!fileName) continue;

    const url = filenameToUrl.get(fileName);
    if (url) {
      cacheEntries.push({ path: p, drive_url: url });
    } else {
      missed.push(p);
    }
  }

  console.log(`Matched: ${cacheEntries.length}`);
  if (missed.length > 0) {
    console.log(`Missed (no file found in Drive): ${missed.length}`);
    for (const m of missed.slice(0, 10)) console.log(`  - ${m}`);
    if (missed.length > 10) console.log(`  ... and ${missed.length - 10} more`);
  }

  // 5. Insert into ImageCache (upsert)
  if (cacheEntries.length === 0) {
    console.log("\nNothing to insert.");
    return;
  }

  console.log(`\nInserting ${cacheEntries.length} entries into imagecache...`);
  const batchSize = 100;
  for (let i = 0; i < cacheEntries.length; i += batchSize) {
    const batch = cacheEntries.slice(i, i + batchSize);
    const { error } = await supabase.from("imagecache").upsert(batch, {
      onConflict: "path",
    });
    if (error) {
      console.error(`Batch ${i / batchSize + 1} failed:`, error);
    } else {
      console.log(`  Batch ${i / batchSize + 1}/${Math.ceil(cacheEntries.length / batchSize)} OK`);
    }
  }

  console.log("\n=== DONE ===");
}

main().catch(console.error);
