import type { LucideIcon } from "lucide-react";

type ValueCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:shadow-lg hover:shadow-blue-100">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-transparent bg-blue-100 text-primary transition-colors group-hover:border-primary group-hover:bg-white group-hover:text-primary">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-accent">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-accent-light">
        {description}
      </p>
    </div>
  );
}
