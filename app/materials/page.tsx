import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Download,
  Eye,
  FileText,
  Lock,
  LogOut,
  PlayCircle,
  Sparkles,
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
          : "border border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:bg-amber-50"
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
    <main className="min-h-screen bg-white text-slate-800">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white px-4 py-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.08),_transparent_42%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/70 to-transparent" />

        <div className="relative mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 px-8 py-10 text-white">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                    Biblioteca do aluno
                  </span>

                  <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    Materiais liberados para {displayName}
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                    Um espaço organizado para reunir conteúdos de Matemática e
                    Física, com materiais pensados para reforço, revisão e
                    evolução contínua.
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center justify-center rounded-2xl bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                    >
                      Voltar ao dashboard
                    </Link>

                    <form action="/auth/signout" method="post">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </button>
                    </form>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Aluno
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {displayName}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Materiais encontrados
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {materials?.length ?? 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Acesso
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      Área protegida por login
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Biblioteca</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  Materiais reais
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Conteúdos publicados e conectados ao banco de dados.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Disciplinas</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  Matemática e Física
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Biblioteca preparada para diferentes fases da jornada escolar.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Navegação</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  Filtros ativos
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Matéria, nível e tipo para encontrar o que importa mais rápido.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Eye className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Acesso</p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  Área do aluno
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Conteúdos organizados em uma experiência mais clara e premium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {materialCategories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.title}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-amber-400">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
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
                        <span className="mt-2 h-2 w-2 rounded-full bg-amber-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
              Conteúdos liberados
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Sua área de materiais
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Biblioteca conectada ao banco de dados do projeto e filtrável por
              matéria, nível e tipo.
            </p>
          </div>

          <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50"
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
              <h3 className="text-xl font-semibold text-slate-900">
                Nenhum material encontrado
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Ajuste os filtros ou publique mais conteúdos no painel
                administrativo.
              </p>
            </div>
          ) : null}

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {materials?.map((item: Material) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
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
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                        {item.level}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-amber-400">
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

                <p className="mt-4 text-sm text-slate-500">
                  Publicado em{" "}
                  {new Date(item.created_at).toLocaleDateString("pt-BR")}
                </p>

                <div className="mt-6">
                  {item.file_url ? (
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-amber-700"
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

      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <BookOpen className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
              Próximos upgrades
            </h3>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              O próximo passo natural é expandir ainda mais essa biblioteca com
              uploads reais e segmentação por aluno.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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
                  <Lock className="h-4 w-4 text-amber-600" />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
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