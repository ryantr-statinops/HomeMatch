import { cn } from "../../lib/utils";

type Tone = "neutral" | "success" | "warning" | "danger" | "info";

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  success: "bg-primary text-primary-foreground",
  warning: "bg-warning text-foreground",
  danger: "bg-destructive text-white",
  info: "bg-secondary text-foreground",
};

interface Props {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ tone = "neutral", children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
