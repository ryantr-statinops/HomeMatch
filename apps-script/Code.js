/**
 * MatchHome API — Google Apps Script
 *
 * Entry point cho tất cả API endpoints.
 * Website gọi đến URL deploy + query parameters.
 *
 * Cách dùng:
 *   GET  ?action=getRooms&khuVuc=Q1&giaMax=3000000
 *   GET  ?action=getRoomDetail&id=ROOM001
 *   GET  ?action=getRoommatePosts
 *   GET  ?action=getRoommatePostDetail&id=POST001
 *   POST ?action=createLead  (body: { sourceType, sourceId })
 */

const SHEET_NAME = {
  PHONGTRO: "PHONGTRO",
  HINHANH: "HINHANH",
  ROOMMATE: "ROOMMATE",
  LEAD: "LEAD",
};

/**
 * Xử lý GET request từ website.
 */
function doGet(e) {
  const action = e?.parameter?.action || "";
  try {
    let result;
    switch (action) {
      case "getRooms":
        result = handleGetRooms(e.parameter);
        break;
      case "getRoomDetail":
        result = handleGetRoomDetail(e.parameter);
        break;
      case "getRoommatePosts":
        result = handleGetRoommatePosts(e.parameter);
        break;
      case "getRoommatePostDetail":
        result = handleGetRoommatePostDetail(e.parameter);
        break;
      default:
        return respondJson({ error: "Unknown action: " + action }, 400);
    }
    return respondJson(result);
  } catch (err) {
    return respondJson({ error: err.message }, 500);
  }
}

/**
 * Xử lý POST request từ website (tạo lead).
 */
function doPost(e) {
  try {
    const data = JSON.parse(e?.postData?.contents || "{}");
    const action = data.action || e?.parameter?.action || "";

    switch (action) {
      case "createLead":
        return respondJson(handleCreateLead(data));
      default:
        return respondJson({ error: "Unknown action: " + action }, 400);
    }
  } catch (err) {
    return respondJson({ error: err.message }, 500);
  }
}

/**
 * Helper: trả về JSON response với CORS headers.
 */
function respondJson(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
