import { cn } from "../../lib/utils";

interface Props {
  visible: boolean;
  className?: string;
}

export function RefreshingIndicator({ visible, className }: Props) {
  if (!visible) return null;
  return (
    <div
      className={cn(
        "fixed left-0 right-0 top-0 z-50 h-0.5 overflow-hidden bg-transparent",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="Đang làm mới dữ liệu"
    >
      <div className="h-full w-1/3 animate-pulse bg-primary" />
    </div>
  );
}
