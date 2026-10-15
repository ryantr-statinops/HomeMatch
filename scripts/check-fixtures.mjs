import {readFile} from "node:fs/promises";
import assert from "node:assert/strict";
const load = async name => JSON.parse(await readFile(`data/fixtures/${name}.json`, "utf8"));
const news = await load("news"), market = await load("market");
for (const fixture of [news, market]) {
  assert.equal(fixture.schema_version, "1"); assert.equal(fixture.is_synthetic, true); assert.equal(fixture.source_id, "fixture-only");
}
const ids = new Set(market.instruments.map(item => item.instrument_id));
assert.equal(ids.size, market.instruments.length);
assert.equal(new Set(news.articles.map(item => item.id)).size, news.articles.length);
for (const article of news.articles) {
  assert.equal(article.url, null);
  for (const id of article.instrument_ids) assert.ok(ids.has(id));
  assert.ok(Date.parse(article.first_seen_at) >= Date.parse(article.published_at));
}
for (const bar of market.candles) {
  assert.ok(ids.has(bar.instrument_id)); assert.equal(bar.is_closed, true);
  assert.ok(Date.parse(bar.close_time) > Date.parse(bar.open_time));
  const [o,h,l,c,v] = [bar.open,bar.high,bar.low,bar.close,bar.volume].map(Number);
  assert.ok([o,h,l,c,v].every(Number.isFinite)); assert.ok(l <= Math.min(o,c) && h >= Math.max(o,c) && v >= 0);
}
console.log("Synthetic fixtures valid; no source access performed.");

