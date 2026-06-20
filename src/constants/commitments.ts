import { ShieldCheck, CheckCircle, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Commitment = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const commitments: Commitment[] = [
  {
    icon: ShieldCheck,
    title: "Bình ổn giá thuê",
    description:
      "Không tự ý tăng giá phòng trong suốt thời hạn hợp đồng.",
  },
  {
    icon: CheckCircle,
    title: "Thông tin chính xác",
    description:
      "Nói không với tin ảo, hình ảnh minh họa sai sự thật.",
  },
  {
    icon: Handshake,
    title: "Thuận mua vừa bán",
    description:
      "Hỗ trợ xem phòng miễn phí, không ép buộc, không thu phí ngầm khi xem phòng.",
  },
] as const;
