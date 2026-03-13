import Link from "next/link";
import {
  Calculator,
  Atom,
  GraduationCap,
  MonitorSmartphone,
  MapPin,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import Button from "@/components/Button";

export default function HomePage() {
  return (
    <main className="bg-white text-slate-800">
      <Hero />

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.08),_transparent_45%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/80 to-transparent" />

        <Container>
          <SectionTitle
            title="Aulas particulares com clareza, método e acompanhamento real"
            subtitle="Um ensino mais organizado e personalizado para ajudar o aluno a compreender melhor os conteúdos, evoluir com segurança e ganhar confiança em Matemática e Física."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Acompanhamento individual"
              description="Cada aula é adaptada ao ritmo, à série e às dificuldades específicas do aluno."
            />
            <FeatureCard
              title="Mais organização nos estudos"
              description="Além da explicação do conteúdo, o aluno recebe direcionamento para estudar com mais eficiência."
            />
            <FeatureCard
              title="Explicação clara e objetiva"
              description="Foco em simplificar assuntos difíceis e transformar dúvidas em entendimento sólido."
            />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700">
                Para diferentes fases da jornada escolar
              </span>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Ensino pensado para quem precisa aprender com mais segurança
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                As aulas são voltadas para alunos do{" "}
                <strong>6º ao 9º ano</strong>, <strong>Ensino Médio</strong> e{" "}
                <strong>cursinho</strong>, com atendimento individual e foco em
                reforço, acompanhamento contínuo e preparação para provas.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Matemática
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Reforço, exercícios guiados, resolução de dúvidas e apoio no
                    desenvolvimento do raciocínio lógico.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Atom className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Física
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Explicações mais visuais e objetivas para tornar os conceitos
                    mais acessíveis e aplicáveis.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/about">Conheça o professor</Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-7 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-8">
              <div className="max-w-lg">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                  Estrutura das aulas
                </span>

                <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
                  Mais do que explicar o conteúdo: construir confiança
                </h3>

                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-200 sm:text-base">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
                    <p>Identificação das principais dificuldades do aluno.</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
                    <p>
                      Explicação do conteúdo com linguagem clara e exemplos
                      práticos.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
                    <p>
                      Resolução orientada de exercícios para fixação do
                      aprendizado.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
                    <p>
                      Acompanhamento contínuo para evolução consistente ao longo
                      das aulas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <SectionTitle
            title="Atendimento flexível e acessível"
            subtitle="Escolha a modalidade que melhor se encaixa na rotina do aluno."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <MonitorSmartphone className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-semibold text-slate-900">
                Aulas online
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                Encontros por Google Meet com praticidade, acompanhamento próximo
                e a mesma atenção individual em cada aula.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <MapPin className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-semibold text-slate-900">
                Aulas presenciais em Goiânia/GO
              </h3>
              <p className="mt-4 leading-7 text-slate-600">
                Para quem prefere o contato presencial, com a mesma proposta de
                ensino personalizado e acompanhamento cuidadoso.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 px-6 py-10 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                  Próximo passo
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Vamos encontrar a melhor forma de ajudar o aluno a evoluir
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  Conheça melhor a proposta e entre em contato para entender qual
                  formato faz mais sentido para a rotina e as necessidades do
                  aluno.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Agendamento
                  <MessageCircle className="h-4 w-4" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Conhecer mais
                  <GraduationCap className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}