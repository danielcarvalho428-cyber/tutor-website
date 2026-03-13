import Card from "./Card";

type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card>
      <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
        Diferencial
      </span>

      <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">{description}</p>
    </Card>
  );
}