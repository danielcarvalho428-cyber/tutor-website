type PageIntroProps = {
  title: string;
  description: string;
};

export default function PageIntro({ title, description }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.08),_transparent_42%)]" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/70 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/70 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700">
          Professor Kaue Ribeiro
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      </div>
    </section>
  );
}