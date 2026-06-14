/**
 * leads.js — Xử lý API endpoints cho lead tracking
 *
 * Endpoints:
 *   createLead → Ghi nhận lead mới khi người dùng bấm Zalo
 */

/**
 * POST /leads — Ghi nhận lead từ website.
 *
 * @param {Object} data
 * @param {string} data.sourceType - "ROOM" | "ROOMMATE"
 * @param {string} data.sourceId - ID của phòng hoặc bài đăng
 * @returns {Object}
 */
function handleCreateLead(data) {
  const { sourceType, sourceId } = data;

  if (!sourceType || !sourceId) {
    throw new Error("Thiếu thông tin: sourceType và sourceId là bắt buộc.");
  }

  const validTypes = ["ROOM", "ROOMMATE"];
  if (!validTypes.includes(sourceType.toUpperCase())) {
    throw new Error("sourceType không hợp lệ. Chấp nhận: ROOM, ROOMMATE.");
  }

  // Tạo Lead ID tự động (timestamp + random suffix tránh trùng)
  const now = new Date();
  const timestamp = now.getTime();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  const leadId = `LEAD${timestamp}${random}`;

  const leadData = {
    leadid: leadId,
    sourcetype: sourceType.toUpperCase(),
    sourceid: sourceId,
    createdat: now.toISOString(),
  };

  const success = appendRow("LEAD", leadData);
  if (!success) {
    throw new Error("Không thể ghi lead vào sheet.");
  }

  return {
    success: true,
    leadId,
    message: "Lead đã được ghi nhận.",
  };
}
