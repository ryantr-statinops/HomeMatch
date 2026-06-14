import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

export default function EmptyState({
  title = "Không có dữ liệu",
  description = "Hiện tại chưa có thông tin nào để hiển thị.",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox size={48} className="text-accent-light/50" />
      <h3 className="mt-4 text-lg font-semibold text-accent">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-accent-light">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
