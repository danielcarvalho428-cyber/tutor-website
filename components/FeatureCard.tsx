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
      <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
      <h3 className="text-xl font-semibold text-[#183A7A]">{title}</h3>
      <p className="mt-3 leading-7 text-[#42526e]">{description}</p>
    </Card>
  );
}