/**
 * sheets.js — Kết nối và đọc/ghi Google Sheet
 *
 * Sheet ID được lưu trong Script Properties để không hardcode.
 * Cách set: File → Project properties → Script properties → Thêm key "SHEET_ID"
 *
 * Cache: Dùng CacheService.getScriptCache() để cache kết quả readSheet()
 * trong 30 giây, giảm số lần đọc sheet thực tế.
 */

var SHEET_CACHE_TTL = 30;

function getSheetCache() {
  return CacheService.getScriptCache();
}

function getSheetCacheKey(sheetName) {
  return "sheet_" + sheetName;
}

/**
 * Lấy Sheet ID từ Script Properties.
 * Nếu chưa set, trả về null và log warning.
 */
function getSheetId() {
  var id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (!id) {
    console.warn("SHEET_ID chưa được set trong Script Properties.");
  }
  return id;
}

/**
 * Mở Google Sheet theo tên sheet (tab).
 * @param {string} sheetName - Tên sheet (VD: "PHONGTRO")
 * @returns {Sheet | null}
 */
function openSheet(sheetName) {
  var sheetId = getSheetId();
  if (!sheetId) return null;
  var ss = SpreadsheetApp.openById(sheetId);
  return ss.getSheetByName(sheetName);
}

/**
 * Đọc toàn bộ dữ liệu từ một sheet, trả về mảng objects.
 * Dòng đầu tiên được dùng làm header/key.
 *
 * Kết quả được cache trong 30 giây qua CacheService.
 *
 * @param {string} sheetName
 * @returns {Array<Object>}
 */
function readSheet(sheetName) {
  var cache = getSheetCache();
  var cacheKey = getSheetCacheKey(sheetName);
  var cached = cache.get(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      // ignore parse error, read fresh
    }
  }

  var sheet = openSheet(sheetName);
  if (!sheet) return [];

  var rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return []; // Chỉ có header, không có data

  var headers = rows[0].map(normalizeHeader);
  var result = [];

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var obj = {};
    headers.forEach(function (key, idx) {
      obj[key] = row[idx];
    });
    result.push(obj);
  }

  cache.put(cacheKey, JSON.stringify(result), SHEET_CACHE_TTL);
  return result;
}

/**
 * Đọc một dòng dữ liệu theo giá trị của một cột.
 *
 * @param {string} sheetName
 * @param {string} columnName - Tên cột để lookup
 * @param {*} value - Giá trị cần tìm
 * @returns {Object | null}
 */
function readRowByColumn(sheetName, columnName, value) {
  var sheet = openSheet(sheetName);
  if (!sheet) return null;

  var rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return null;

  var headers = rows[0].map(normalizeHeader);
  var colIndex = headers.indexOf(normalizeHeader(columnName));
  if (colIndex === -1) return null;

  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][colIndex]) === String(value)) {
      var obj = {};
      headers.forEach(function (key, idx) {
        obj[key] = rows[i][idx];
      });
      return obj;
    }
  }
  return null;
}

/**
 * Ghi một dòng mới vào cuối sheet.
 * Sau khi ghi, xoá cache của sheet đó để lần đọc sau lấy data mới.
 *
 * @param {string} sheetName
 * @param {Object} data - Object với key trùng header
 * @returns {boolean}
 */
function appendRow(sheetName, data) {
  var sheet = openSheet(sheetName);
  if (!sheet) return false;

  var headers = sheet.getDataRange().getValues()[0].map(normalizeHeader);
  var newRow = headers.map(function (h) { return data[h] ?? ""; });
  sheet.appendRow(newRow);

  // Xoá cache để data mới được đọc lại
  var cache = getSheetCache();
  cache.remove(getSheetCacheKey(sheetName));
  return true;
}

/**
 * Chuẩn hoá header: trim khoảng trắng, lowercase.
 * VD: "IDPhong" → "idphong", "Hinh Anh" → "hinh anh"
 */
function normalizeHeader(header) {
  return String(header).trim().toLowerCase();
}
