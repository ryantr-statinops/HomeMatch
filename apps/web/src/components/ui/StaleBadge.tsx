import { cn } from "../../lib/utils";

interface Props {
  since?: string | null;
  className?: string;
}

export function StaleBadge({ since, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning",
        className,
      )}
      title={since ? `Dữ liệu từ ${since}` : "Dữ liệu có thể đã cũ"}
    >
      <span aria-hidden>⚠</span>
      Có thể đã cũ
      {since && <span className="opacity-70">· {since}</span>}
    </span>
  );
}
