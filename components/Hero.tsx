// components/Hero.tsx
import Image from "next/image";
import Button from "./Button";
import Container from "./Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#020617_0%,#0f172a_38%,#172554_72%,#0f172a_100%)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(59,130,246,0.14),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <Container>
        <div className="relative grid min-h-[86vh] items-center gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              Matemática e Física
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Aulas particulares com mais clareza, confiança e evolução.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Acompanhamento individual para alunos do 6º ao 9º ano, Ensino
              Médio e cursinho, com aulas online pelo Google Meet e presenciais
              em Goiânia/GO.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/booking">Agendar aula</Button>
              <Button
                href="https://wa.me/5562982273735?text=Olá!%20Vim%20pelo%20site%20do%20Professor%20Kaue%20Ribeiro%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20aulas."
                variant="secondary"
                className="border-white/15 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                Falar no WhatsApp
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Público
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Fundamental II, Ensino Médio e cursinho
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Formato
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Online e presencial em Goiânia/GO
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Foco
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Organização, entendimento e resultado
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2.25rem] bg-amber-400/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-900">
                <Image
                  src="/professor-kaue.jpeg"
                  alt="Professor Kaue Ribeiro"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                  Professor Kaue Ribeiro
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  Aulas com acompanhamento individual, foco em base sólida e
                  suporte para provas, tarefas, revisões e preparação mais
                  estratégica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}