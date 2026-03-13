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

const accessCards = [
  {
    title: "Materiais",
    description:
      "Acesse conteúdos publicados para apoiar seus estudos com mais organização e clareza.",
    href: "/materials",
    icon: BookOpen,
  },
  {
    title: "Agendamento",
    description:
      "Solicite novas aulas de forma simples e continue o atendimento pelo WhatsApp.",
    href: "/booking",
    icon: CalendarDays,
  },
  {
    title: "Dashboard",
    description:
      "Entre na sua área para visualizar informações da conta e navegar pela plataforma.",
    href: "/dashboard",
    icon: GraduationCap,
  },
];

export default function LoginPage() {
  return (
    <main className="bg-white text-slate-800">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white px-4 py-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.08),_transparent_42%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/70 to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 px-8 py-10 text-white">
              <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                    Acesso à plataforma
                  </span>

                  <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Entre na sua conta de forma simples e segura
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                    Faça login para acessar sua área na plataforma do Professor
                    Kaue Ribeiro, visualizar materiais e continuar sua jornada
                    de estudos com mais organização.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                        Segurança
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">
                        Acesso protegido e organizado por conta.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                        Materiais
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">
                        Biblioteca pronta para consulta e estudo.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                        Navegação
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">
                        Experiência alinhada com todo o restante do site.
                      </p>
                    </div>
                  </div>
                </div>

                <LoginForm />
              </div>
            </div>

            <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Lock className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Acesso</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  Login protegido
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Entrada segura para alunos e administração.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Estudo</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  Materiais organizados
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Conteúdos publicados em uma biblioteca clara e acessível.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Área do aluno</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  Experiência centralizada
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Tudo mais organizado em um só lugar.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Continuidade</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  Fluxo consistente
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Visual alinhado com o restante da plataforma.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700">
                Acesso à conta
              </span>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Uma entrada mais limpa, clara e integrada ao site
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Esta página foi simplificada para manter foco no que realmente
                importa: acessar a conta e seguir para as áreas principais da
                plataforma sem distrações.
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Login com visual consistente ao restante do projeto",
                  "Acesso à biblioteca de materiais",
                  "Integração com dashboard e área administrativa",
                  "Fluxo mais direto para estudo e agendamento",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 px-5 py-4"
                  >
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-amber-600" />
                    <span className="text-sm font-medium text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Solicitar aula
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Voltar para o início
                </Link>
              </div>
            </div>

            <div className="grid gap-6">
              {accessCards.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-amber-400">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:translate-x-1">
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