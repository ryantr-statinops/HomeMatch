/**
 * utils.js — Helper functions cho Apps Script API
 */

/**
 * Format số thành tiền tệ VND.
 * @param {number} amount
 * @returns {string}
 */
function formatCurrency(amount) {
  if (!amount) return "0₫";
  return amount.toLocaleString("vi-VN") + "₫";
}

/**
 * Kiểm tra chuỗi có empty không.
 * @param {*} value
 * @returns {boolean}
 */
function isEmpty(value) {
  return value === null || value === undefined || String(value).trim() === "";
}

/**
 * Safe get: lấy giá trị từ object với fallback.
 * @param {Object} obj
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
function safeGet(obj, key, defaultValue = "") {
  if (!obj) return defaultValue;
  return obj[key] !== undefined && obj[key] !== null ? obj[key] : defaultValue;
}

/**
 * Parse boolean từ nhiều định dạng.
 * @param {*} value
 * @returns {boolean}
 */
function parseBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return ["true", "yes", "1", "x"].includes(value.toLowerCase().trim());
  }
  return !!value;
}

/**
 * Tạo slug từ chuỗi (cho URL).
 * @param {string} text
 * @returns {string}
 */
function createSlug(text) {
  if (!text) return "";
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
