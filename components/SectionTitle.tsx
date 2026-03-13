type SectionTitleProps = {
  title: string;
  subtitle: string;
  centered?: boolean;
};

export default function SectionTitle({
  title,
  subtitle,
  centered = true,
}: SectionTitleProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <span
        className={`inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700 ${
          centered ? "mx-auto" : ""
        }`}
      >
        Destaque
      </span>

      <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>

      <p
        className={`mt-5 text-lg leading-8 text-slate-600 ${
          centered ? "mx-auto max-w-3xl" : "max-w-3xl"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}