import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Download,
  FileText,
  Lock,
  PlayCircle,
  Calculator,
  BookOpen,
  ArrowRight,
  LogOut,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const materialCategories = [
  {
    title: "Matemática Fundamental",
    description:
      "Materiais de reforço para 6º ao 9º ano com foco em base sólida, interpretação e resolução passo a passo.",
    icon: Calculator,
    items: [
      "Operações, frações e porcentagem",
      "Expressões algébricas e equações",
      "Geometria plana e raciocínio lógico",
    ],
  },
  {
    title: "Matemática Ensino Médio",
    description:
      "Conteúdos organizados para aprofundamento, revisões e preparação para provas escolares e vestibulares.",
    icon: FileText,
    items: [
      "Funções, trigonometria e geometria",
      "Análise combinatória e probabilidade",
      "Listas comentadas e revisões estratégicas",
    ],
  },
  {
    title: "Física",
    description:
      "Aulas e materiais com explicações claras para transformar teoria em entendimento real e aplicação prática.",
    icon: PlayCircle,
    items: [
      "Cinemática e dinâmica",
      "Trabalho, energia e potência",
      "Eletrodinâmica, óptica e termologia",
    ],
  },
];

type Material = {
  id: number;
  title: string;
  subject: string;
  level: string;
  type: string;
  description: string | null;
  file_url: string | null;
  is_published: boolean;
  created_at: string;
};

type MaterialsPageProps = {
  searchParams?: Promise<{
    subject?: string;
    level?: string;
    type?: string;
  }>;
};

const subjectOptions = ["Todos", "Matemática", "Física"];
const levelOptions = ["Todos", "6º ao 9º ano", "Ensino Médio", "Cursinho"];
const typeOptions = ["Todos", "PDF", "Vídeo"];

function buildFilterHref(
  current: { subject: string; level: string; type: string },
  updates: Partial<{ subject: string; level: string; type: string }>
) {
  const next = { ...current, ...updates };
  const params = new URLSearchParams();

  if (next.subject && next.subject !== "Todos") {
    params.set("subject", next.subject);
  }

  if (next.level && next.level !== "Todos") {
    params.set("level", next.level);
  }

  if (next.type && next.type !== "Todos") {
    params.set("type", next.type);
  }

  const query = params.toString();
  return query ? `/materials?${query}` : "/materials";
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-slate-950 text-white"
          : "border border-slate-200 bg-white text-slate-700 hover:border-yellow-500 hover:bg-yellow-50"
      }`}
    >
      {label}
    </Link>
  );
}

export default async function MaterialsPage({
  searchParams,
}: MaterialsPageProps) {
  const resolvedSearchParams = (await searchParams) || {};

  const currentFilters = {
    subject: resolvedSearchParams.subject || "Todos",
    level: resolvedSearchParams.level || "Todos",
    type: resolvedSearchParams.type || "Todos",
  };

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let query = supabase
    .from("materials")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (currentFilters.subject !== "Todos") {
    query = query.eq("subject", currentFilters.subject);
  }

  if (currentFilters.level !== "Todos") {
    query = query.eq("level", currentFilters.level);
  }

  if (currentFilters.type !== "Todos") {
    query = query.eq("type", currentFilters.type);
  }

  const { data: materials, error } = await query;

  const displayName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "Aluno";

  const hasActiveFilters =
    currentFilters.subject !== "Todos" ||
    currentFilters.level !== "Todos" ||
    currentFilters.type !== "Todos";

  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-950 via-[#0f2342] to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
                Biblioteca do aluno
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Materiais liberados para {displayName}.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                Um espaço pensado para reunir conteúdos de Matemática e Física,
                com materiais organizados para reforço, revisão e evolução contínua.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
                >
                  Voltar ao dashboard
                </Link>

                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </button>
                </form>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white shadow-[0_25px_70px_rgba(0,0,0,0.20)] backdrop-blur md:p-8">
              <div className="space-y-4">
                {[
                  `Aluno: ${displayName}`,
                  `E-mail: ${user.email}`,
                  `Materiais encontrados: ${materials?.length ?? 0}`,
                  "Acesso protegido por login",
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
                Esta biblioteca agora lê dados reais do banco e já está pronta
                para crescer com filtros e uploads.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {materialCategories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.10)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-yellow-400">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-slate-950">
                  {category.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {category.description}
                </p>

                <ul className="mt-5 space-y-3">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-yellow-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
              Conteúdos liberados
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Sua área de materiais
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Agora esta biblioteca está conectada ao banco de dados do projeto
              e filtrável por matéria, nível e tipo.
            </p>
          </div>

          <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Filtrar por matéria
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {subjectOptions.map((option) => (
                    <FilterChip
                      key={option}
                      href={buildFilterHref(currentFilters, { subject: option })}
                      active={currentFilters.subject === option}
                      label={option}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Filtrar por nível
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {levelOptions.map((option) => (
                    <FilterChip
                      key={option}
                      href={buildFilterHref(currentFilters, { level: option })}
                      active={currentFilters.level === option}
                      label={option}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Filtrar por tipo
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {typeOptions.map((option) => (
                    <FilterChip
                      key={option}
                      href={buildFilterHref(currentFilters, { type: option })}
                      active={currentFilters.type === option}
                      label={option}
                    />
                  ))}
                </div>
              </div>

              {hasActiveFilters ? (
                <div className="pt-2">
                  <Link
                    href="/materials"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-yellow-500 hover:bg-yellow-50"
                  >
                    Limpar filtros
                    <X className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          {error ? (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              Erro ao carregar materiais: {error.message}
            </div>
          ) : null}

          {!error && (!materials || materials.length === 0) ? (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">
                Nenhum material encontrado
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Ajuste os filtros ou cadastre mais conteúdos no Supabase.
              </p>
            </div>
          ) : null}

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {materials?.map((item: Material) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {item.type}
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                        {item.subject}
                      </span>
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                        {item.level}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-slate-950">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-yellow-400">
                    {item.type.toLowerCase() === "vídeo" ||
                    item.type.toLowerCase() === "video" ? (
                      <PlayCircle className="h-5 w-5" />
                    ) : (
                      <Download className="h-5 w-5" />
                    )}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.description || "Sem descrição cadastrada."}
                </p>

                <div className="mt-6">
                  {item.file_url ? (
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-yellow-700"
                    >
                      Abrir material
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400">
                      Link ainda não cadastrado
                      <Lock className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_25px_70px_rgba(15,23,42,0.18)] md:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Fluxo da plataforma
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Uma biblioteca pronta para crescer.
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Login",
                  text: "O aluno entra com sua conta e acessa uma área protegida da plataforma.",
                },
                {
                  step: "02",
                  title: "Banco de dados",
                  text: "Os materiais agora vêm de uma tabela real no Supabase.",
                },
                {
                  step: "03",
                  title: "Filtros",
                  text: "A navegação por matéria, nível e tipo deixa a biblioteca muito mais útil.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <span className="text-xs font-bold tracking-[0.3em] text-yellow-300">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-slate-950">
              <BookOpen className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-slate-950">
              Próximos upgrades
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              O próximo passo natural é transformar esses registros em uploads reais e depois separar por aluno.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Uploads reais de PDF e vídeo",
                "Filtros ainda mais refinados",
                "Materiais separados por aluno",
                "Histórico de conteúdos liberados",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 text-sm font-semibold text-slate-800"
                >
                  <span>{item}</span>
                  <Lock className="h-4 w-4 text-yellow-600" />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Ir para agendamento
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}