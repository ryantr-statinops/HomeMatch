import Link from "next/link";
import {
  User,
  GraduationCap,
  MapPin,
  DollarSign,
  Users,
  ArrowRight,
  MessageCircle,
  VenusAndMars,
  Home,
  Building2,
} from "lucide-react";
import type { RoommatePost } from "@/types/roommate-post";
import { site } from "@/configs/site";
import { routes } from "@/constants/routes";

type RoommateCardProps = {
  post: RoommatePost;
};

type PostTypeConfig = {
  label: string;
  icon: React.ReactNode;
  color: string;
};

const POST_TYPE_MAP: Record<string, PostTypeConfig> = {
  HAVE_ROOM: {
    label: "Có phòng, cần tìm người ở ghép",
    icon: <Home size={14} />,
    color: "bg-blue-50 text-blue-700",
  },
  NEED_ROOMMATE: {
    label: "Cần người thuê chung phòng",
    icon: <Building2 size={14} />,
    color: "bg-orange-50 text-orange-700",
  },
};

function getPostTypeConfig(postType: string): PostTypeConfig {
  return (
    POST_TYPE_MAP[postType] ?? {
      label: postType,
      icon: <Users size={14} />,
      color: "bg-gray-50 text-gray-600",
    }
  );
}

function formatBudget(budget: number): string {
  if (budget >= 1_000_000) {
    return `${(budget / 1_000_000).toFixed(budget % 1_000_000 === 0 ? 0 : 1)} triệu`;
  }
  return budget.toLocaleString("vi-VN") + "đ";
}

export default function RoommateCard({ post }: RoommateCardProps) {
  const postTypeCfg = getPostTypeConfig(post.postType);

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-lg hover:shadow-blue-100">
      {/* Header — post type badge */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${postTypeCfg.color}`}
        >
          {postTypeCfg.icon}
          {postTypeCfg.label}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500">
          <User size={14} />
        </span>
      </div>

      {/* Body */}
      <div className="space-y-3 px-5 py-4">
        {/* Customer info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="font-semibold text-accent">
            {post.customer.name || "Chưa có tên"}
          </span>
          {post.customer.gender && (
            <span className="flex items-center gap-1 text-accent-light">
              <VenusAndMars size={13} className="text-primary" />
              {post.customer.gender}
            </span>
          )}
          {post.customer.school && (
            <span className="flex items-center gap-1 text-accent-light">
              <GraduationCap size={13} className="text-primary" />
              {post.customer.school}
            </span>
          )}
        </div>

        {/* Desired area */}
        {post.desiredArea && (
          <p className="flex items-center gap-1.5 text-sm text-accent-light">
            <MapPin size={14} className="shrink-0 text-primary" />
            <span>{post.desiredArea}</span>
          </p>
        )}

        {/* Budget + Need count */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
            <DollarSign size={15} className="text-green-600" />
            {post.budget > 0 ? formatBudget(post.budget) : "Thoả thuận"}
          </span>
          {post.needCount && (
            <span className="flex items-center gap-1.5 text-sm text-accent-light">
              <Users size={14} className="text-primary" />
              Cần {post.needCount} người
            </span>
          )}
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-accent-light">
          {post.description || "Chưa có mô tả"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-gray-100 px-5 py-3">
        <a
          href={site.zaloUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <MessageCircle size={16} />
          Liên hệ Zalo
        </a>
        <Link
          href={routes.roommateDetail(post.id)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-100 px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-gray-200"
        >
          Xem chi tiết
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
