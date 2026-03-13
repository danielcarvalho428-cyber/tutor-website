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
      <div
        className={`mb-4 h-1.5 w-16 rounded-full bg-[#E5B325] ${
          centered ? "mx-auto" : ""
        }`}
      />
      <h2 className="text-3xl font-bold text-[#183A7A] md:text-4xl">{title}</h2>
      <p
        className={`mt-4 leading-8 text-[#42526e] ${
          centered ? "mx-auto max-w-2xl" : "max-w-2xl"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}