import { cn } from "../../lib/utils";

interface Props {
  reason?: string;
  className?: string;
}

export function PartialBadge({ reason, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning",
        className,
      )}
      title={reason ?? "Dữ liệu không đầy đủ"}
    >
      <span aria-hidden>◐</span>
      Dữ liệu một phần
    </span>
  );
}
