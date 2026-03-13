import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Lock,
  ShieldCheck,
} from "lucide-react";
import LoginForm from "./login-form";

const futureFeatures = [
  "Login individual para alunos",
  "Biblioteca de materiais e listas",
  "Acompanhamento de aulas e revisões",
  "Agenda integrada com calendário",
  "Área exclusiva para conteúdos liberados",
  "Estrutura pronta para futura gestão da plataforma",
];

const accessCards = [
  {
    title: "Materiais",
    description:
      "Listas, resumos, revisões e conteúdos complementares organizados para apoiar o estudo contínuo.",
    href: "/materials",
    icon: BookOpen,
  },
  {
    title: "Agendamento",
    description:
      "Solicite horários de aula de forma simples e avance para um fluxo mais completo no futuro.",
    href: "/booking",
    icon: CalendarDays,
  },
  {
    title: "Área do aluno",
    description:
      "Conheça a base visual do painel que futuramente reunirá conteúdos, aulas e progresso.",
    href: "/dashboard",
    icon: GraduationCap,
  },
];

export default function LoginPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-950 via-[#102443] to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
                Login da plataforma
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                A área de acesso está sendo preparada para a próxima fase do projeto.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                Esta página já posiciona a futura entrada da plataforma do Professor Kaue Ribeiro,
                conectando alunos, materiais, agendamento e acompanhamento em uma experiência mais completa.
              </p>

              <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-slate-950">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-yellow-300">
                      Em desenvolvimento
                    </p>
                    <h2 className="text-xl font-semibold">
                      Base pronta para expansão
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    "Autenticação de alunos",
                    "Conteúdos por acesso",
                    "Acompanhamento individual",
                    "Integração futura com Supabase",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-300">
                  O visual e a navegação já deixam a plataforma preparada para crescer sem perder consistência.
                </p>
              </div>
            </div>

            <LoginForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
              Plataforma futura
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Uma estrutura pensada para alunos, rotina de estudos e evolução.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Em vez de parecer uma página vazia, este login já comunica valor e mostra para onde o projeto está indo.
            </p>

            <div className="mt-8 grid gap-4">
              {futureFeatures.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 px-5 py-4"
                >
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Solicitar aula
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-yellow-500 hover:bg-yellow-50"
              >
                Voltar para o início
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6">
              {accessCards.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-yellow-500 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-yellow-400">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition group-hover:text-yellow-700">
                      Acessar
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}