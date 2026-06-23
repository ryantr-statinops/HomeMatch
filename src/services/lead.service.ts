import { supabase } from "@/lib/supabase/client";

type CreateLeadInput = {
  sourceType: "ROOM" | "ROOMMATE";
  sourceId: string;
};

export async function createLead(input: CreateLeadInput) {
  const { sourceType, sourceId } = input;

  if (!sourceType || !sourceId) {
    throw new Error("Thiếu thông tin: sourceType và sourceId là bắt buộc.");
  }

  const validTypes = ["ROOM", "ROOMMATE"];
  if (!validTypes.includes(sourceType.toUpperCase())) {
    throw new Error("sourceType không hợp lệ. Chấp nhận: ROOM, ROOMMATE.");
  }

  const now = new Date();
  const timestamp = now.getTime();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  const leadId = `LEAD${timestamp}${random}`;

  const { error } = await supabase.from("lead").insert({
    leadid: leadId,
    sourcetype: sourceType.toUpperCase(),
    sourceid: sourceId,
    createdat: now.toISOString(),
  });

  if (error) {
    throw new Error(`Không thể ghi lead: ${error.message}`);
  }

  return {
    success: true,
    leadId,
    message: "Lead đã được ghi nhận.",
  };
}
