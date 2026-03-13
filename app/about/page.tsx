import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Calculator,
  Atom,
  MonitorSmartphone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import Container from "@/components/Container";
import Button from "@/components/Button";

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-800">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.08),_transparent_42%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/70 to-transparent" />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700">
              Sobre o professor
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Ensino com clareza, atenção individual e foco na evolução do aluno
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Conheça a proposta do Professor Kaue Ribeiro e a forma como as
              aulas são conduzidas para tornar Matemática e Física mais
              compreensíveis, organizadas e acessíveis.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(30,64,175,0.08),_transparent_38%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/80 to-transparent" />

        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700">
                Professor Kaue Ribeiro
              </span>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Uma abordagem mais humana e estratégica para aprender melhor
              </h2>

              <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  O trabalho é voltado para alunos do{" "}
                  <strong>6º ao 9º ano</strong>, <strong>Ensino Médio</strong> e{" "}
                  <strong>cursinho</strong>, com foco em acompanhamento
                  individual, reforço escolar e construção de uma base mais
                  sólida em <strong>Matemática</strong> e <strong>Física</strong>.
                </p>

                <p>
                  Mais do que apenas explicar conteúdos, a proposta é ajudar o
                  aluno a entender de forma clara, desenvolver autonomia nos
                  estudos e enfrentar provas e exercícios com mais confiança.
                </p>

                <p>
                  Cada aula é conduzida com atenção ao ritmo, às dúvidas e às
                  necessidades reais de quem está aprendendo, sempre com uma
                  comunicação objetiva e um acompanhamento próximo.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/booking">Agendar aula</Button>
                <Button href="/contact" variant="secondary">
                  Entrar em contato
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Matemática
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Explicações claras, reforço de base e prática orientada para
                    melhorar desempenho e segurança.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Atom className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Física
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Conteúdo explicado com lógica, objetividade e foco em
                    compreensão real dos conceitos.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <MonitorSmartphone className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Online
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Aulas por Google Meet com praticidade, organização e atenção
                    individual.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Presencial
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Atendimento presencial em Goiânia/GO para quem prefere esse
                    formato.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
              Como as aulas funcionam
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Um processo pensado para trazer mais clareza e constância
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              O objetivo é transformar dificuldades em progresso com uma
              condução mais organizada, personalizada e eficiente.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Diagnóstico das dificuldades
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Identificação dos pontos que precisam de mais atenção e reforço.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Explicação clara do conteúdo
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Linguagem objetiva, exemplos práticos e adaptação ao ritmo do
                aluno.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Exercícios orientados
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Fixação com acompanhamento, correção e desenvolvimento de
                raciocínio.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Evolução contínua
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Acompanhamento para consolidar aprendizado e aumentar a
                confiança ao longo do tempo.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Para quem as aulas são indicadas
              </h2>

              <div className="mt-6 space-y-4 text-slate-600">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <p>Alunos com dificuldades em Matemática ou Física.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <p>
                    Estudantes que precisam de reforço, revisão e melhor
                    organização nos estudos.
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <p>
                    Quem busca acompanhamento mais individual e direcionado.
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <p>
                    Alunos em preparação para provas escolares, recuperações e
                    cursinho.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                Próximo passo
              </span>

              <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">
                Pronto para começar com mais confiança?
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-200">
                Entre em contato para tirar dúvidas ou siga direto para o
                agendamento. A proposta é oferecer uma experiência simples,
                profissional e acolhedora desde o primeiro contato.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Agendar aula
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Entrar em contato
                  <MessageCircle className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}