import type { LucideIcon } from "lucide-react";

type CommitmentCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function CommitmentCard({
  icon: Icon,
  title,
  description,
}: CommitmentCardProps) {
  return (
    <div className="group rounded-2xl border border-blue-100 bg-white p-8 text-center shadow-sm transition-all hover:border-primary hover:shadow-lg hover:shadow-blue-100">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon size={28} />
      </div>
      <h3 className="text-lg font-semibold text-accent">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-accent-light">
        {description}
      </p>
    </div>
  );
}
