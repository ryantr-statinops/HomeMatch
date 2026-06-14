import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string | React.ReactNode;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export default function SectionTitle({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionTitleProps) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <h2
        className={cn(
          "text-3xl font-bold text-accent md:text-4xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-accent-light md:text-lg",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
