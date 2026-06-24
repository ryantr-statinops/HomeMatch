import { site } from "@/configs/site";
import { MessageCircle } from "lucide-react";

type ContactButtonProps = {
  label?: string;
  className?: string;
};

export default function ContactButton({
  label = "Liên hệ qua Zalo",
  className = "",
}: ContactButtonProps) {
  const href = site.zaloUrl || "#";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl active:scale-[0.98] ${className}`}
    >
      <MessageCircle size={20} />
      {label}
    </a>
  );
}
