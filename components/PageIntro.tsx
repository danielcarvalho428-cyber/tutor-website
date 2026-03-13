type PageIntroProps = {
  title: string;
  description: string;
};

export default function PageIntro({ title, description }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] via-white to-white py-20 md:py-24">
      <div className="absolute inset-0">
        <div className="absolute left-[-70px] top-10 h-56 w-56 rounded-full bg-[#dbe8ff] blur-3xl" />
        <div className="absolute right-[-40px] top-8 h-64 w-64 rounded-full bg-[#fff0bf] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-[#E5B325]" />
        <h1 className="text-4xl font-bold tracking-tight text-[#183A7A] md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#42526e]">
          {description}
        </p>
      </div>
    </section>
  );
}