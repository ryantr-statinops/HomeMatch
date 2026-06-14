/**
 * sheets.js — Kết nối và đọc/ghi Google Sheet
 *
 * Sheet ID được lưu trong Script Properties để không hardcode.
 * Cách set: File → Project properties → Script properties → Thêm key "SHEET_ID"
 */

/**
 * Lấy Sheet ID từ Script Properties.
 * Nếu chưa set, trả về null và log warning.
 */
function getSheetId() {
  const id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
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
  const sheetId = getSheetId();
  if (!sheetId) return null;
  const ss = SpreadsheetApp.openById(sheetId);
  return ss.getSheetByName(sheetName);
}

/**
 * Đọc toàn bộ dữ liệu từ một sheet, trả về mảng objects.
 * Dòng đầu tiên được dùng làm header/key.
 *
 * @param {string} sheetName
 * @returns {Array<Object>}
 */
function readSheet(sheetName) {
  const sheet = openSheet(sheetName);
  if (!sheet) return [];

  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return []; // Chỉ có header, không có data

  const headers = rows[0].map(normalizeHeader);
  const result = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const obj = {};
    headers.forEach((key, idx) => {
      obj[key] = row[idx];
    });
    result.push(obj);
  }

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
  const sheet = openSheet(sheetName);
  if (!sheet) return null;

  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return null;

  const headers = rows[0].map(normalizeHeader);
  const colIndex = headers.indexOf(normalizeHeader(columnName));
  if (colIndex === -1) return null;

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][colIndex]) === String(value)) {
      const obj = {};
      headers.forEach((key, idx) => {
        obj[key] = rows[i][idx];
      });
      return obj;
    }
  }
  return null;
}

/**
 * Ghi một dòng mới vào cuối sheet.
 *
 * @param {string} sheetName
 * @param {Object} data - Object với key trùng header
 * @returns {boolean}
 */
function appendRow(sheetName, data) {
  const sheet = openSheet(sheetName);
  if (!sheet) return false;

  const headers = sheet.getDataRange().getValues()[0].map(normalizeHeader);
  const newRow = headers.map((h) => data[h] ?? "");
  sheet.appendRow(newRow);
  return true;
}

/**
 * Chuẩn hoá header: trim khoảng trắng, lowercase.
 * VD: "IDPhong" → "idphong", "Hinh Anh" → "hinh anh"
 */
function normalizeHeader(header) {
  return String(header).trim().toLowerCase();
}
