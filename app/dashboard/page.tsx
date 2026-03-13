import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Shield,
  Sparkles,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/supabase/get-user-role";

type Booking = {
  [key: string]: unknown;
  id: number;
  status?: string | null;
  created_at?: string | null;
};

type Material = {
  id: number;
  title: string;
  subject: string | null;
  level: string | null;
  type: string | null;
  is_published: boolean;
  created_at: string;
};

function getStatusClasses(status: string | null | undefined) {
  switch (status) {
    case "confirmado":
      return "border border-emerald-200 bg-emerald-50 text-emerald-700";
    case "pendente":
      return "border border-amber-200 bg-amber-50 text-amber-700";
    case "cancelado":
      return "border border-red-200 bg-red-50 text-red-700";
    case "concluído":
      return "border border-blue-200 bg-blue-50 text-blue-700";
    default:
      return "border border-slate-200 bg-slate-100 text-slate-700";
  }
}

function readText(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function getBookingTitle(booking: Booking) {
  return (
    readText(booking.subject) ||
    readText(booking.title) ||
    readText(booking.student_name) ||
    `Agendamento #${booking.id}`
  );
}

function getBookingLevel(booking: Booking) {
  return (
    readText(booking.level) ||
    readText(booking.school_level) ||
    readText(booking.year_group)
  );
}

function getBookingDateTime(booking: Booking) {
  const dateValue =
    readText(booking.date) ||
    readText(booking.booking_date) ||
    readText(booking.preferred_date) ||
    readText(booking.preferred_day);

  const timeValue =
    readText(booking.time) ||
    readText(booking.booking_time) ||
    readText(booking.preferred_time);

  if (dateValue && timeValue) return `${dateValue} • ${timeValue}`;
  if (dateValue) return dateValue;
  if (timeValue) return timeValue;
  return null;
}

function getGreetingLabel(role: string | null) {
  if (role === "admin") return "Administrador";
  return "Aluno";
}

export default async function DashboardPage() {
  const authData = await getUserRole();

  if (!authData.user) {
    redirect("/login");
  }

  const supabase = await createClient();

  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (bookingsError) {
    throw new Error(`Erro ao carregar agendamentos: ${bookingsError.message}`);
  }

  const { data: materials, error: materialsError } = await supabase
    .from("materials")
    .select("id, title, subject, level, type, is_published, created_at")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (materialsError) {
    throw new Error(`Erro ao carregar materiais: ${materialsError.message}`);
  }

  const pendingBookings =
    bookings?.filter((booking) => readText(booking.status) === "pendente")
      .length ?? 0;

  return (
    <main className="min-h-screen bg-white text-slate-800">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white px-4 py-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.08),_transparent_42%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/70 to-transparent" />

        <div className="relative mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 px-8 py-10 text-white">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                    Dashboard
                  </span>

                  <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    Bem-vindo, {authData.user.email}
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                    Acompanhe seus agendamentos, acesse materiais recentes e use
                    atalhos rápidos para navegar pela plataforma do Professor
                    Kaue Ribeiro com mais clareza e organização.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Perfil
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {getGreetingLabel(authData.role)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Pendências
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {pendingBookings} agendamento
                      {pendingBookings === 1 ? "" : "s"} pendente
                      {pendingBookings === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Agendamentos recentes
                  </p>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {bookings?.length ?? 0}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Últimos registros vinculados à sua conta.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Materiais publicados
                  </p>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {materials?.length ?? 0}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Conteúdos prontos para consulta e estudo.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Próximo passo
                  </p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  {bookings && bookings.length > 0
                    ? "Acompanhar seus pedidos"
                    : "Agendar sua primeira aula"}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {bookings && bookings.length > 0
                    ? "Veja o status dos seus pedidos recentes."
                    : "Comece marcando uma aula online ou presencial."}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    {authData.role === "admin" ? (
                      <Shield className="h-5 w-5" />
                    ) : (
                      <GraduationCap className="h-5 w-5" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Acesso rápido
                  </p>
                </div>
                <p className="mt-4 text-lg font-semibold text-slate-900">
                  {authData.role === "admin"
                    ? "Painel administrativo"
                    : "Área do aluno"}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Navegação organizada para o que mais importa agora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/booking"
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600">
                Ação rápida
              </p>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Agendar aula
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Solicite uma nova aula online ou presencial em Goiânia.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:translate-x-1">
                Abrir agendamento
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/materials"
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                Estudo
              </p>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Materiais
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Veja conteúdos publicados e organize seu estudo com mais
                facilidade.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:translate-x-1">
                Ver materiais
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/booking"
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Acompanhamento
              </p>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Novo agendamento
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Faça uma nova solicitação e acompanhe os registros recentes logo
                abaixo nesta página.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:translate-x-1">
                Ir para agendamento
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {authData.role === "admin" ? (
              <Link
                href="/admin"
                className="group rounded-[1.75rem] border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,99,235,0.12)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                  Administração
                </p>
                <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                  Painel admin
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Gerencie materiais, agendamentos e o funcionamento da
                  plataforma.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:translate-x-1">
                  Ir para o painel
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ) : (
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Foco
                </p>
                <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                  Continue estudando
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Mantenha seus estudos em dia usando os materiais publicados e
                  os próximos agendamentos.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Agenda
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    Agendamentos recentes
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Seus pedidos mais recentes em um formato mais claro e fácil
                    de acompanhar.
                  </p>
                </div>

                <Link
                  href="/booking"
                  className="inline-flex h-fit items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Novo agendamento
                </Link>
              </div>

              {!bookings || bookings.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                  <p className="text-base font-medium text-slate-800">
                    Você ainda não possui agendamentos.
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Quando fizer um pedido, ele aparecerá aqui com o status.
                  </p>
                  <Link
                    href="/booking"
                    className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Agendar agora
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking: Booking) => (
                    <div
                      key={booking.id}
                      className="rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 transition hover:border-slate-300"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                              {getBookingTitle(booking)}
                            </h3>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                typeof booking.status === "string"
                                  ? booking.status
                                  : null
                              )}`}
                            >
                              {readText(booking.status) || "Sem status"}
                            </span>
                          </div>

                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Nível
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {getBookingLevel(booking) ||
                                  "Nível não informado"}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Data e horário
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {getBookingDateTime(booking) ||
                                  "Data não informada"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 rounded-2xl bg-slate-50 px-4 py-3 text-right">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Registro
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-700">
                            #{booking.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Biblioteca
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    Materiais recentes
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Os últimos conteúdos liberados para você continuar
                    estudando.
                  </p>
                </div>

                <Link
                  href="/materials"
                  className="inline-flex h-fit items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Ver materiais
                </Link>
              </div>

              {!materials || materials.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                  <p className="text-base font-medium text-slate-800">
                    Nenhum material publicado no momento.
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Quando novos materiais forem publicados, eles aparecerão
                    aqui.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {materials.map((material: Material) => (
                    <div
                      key={material.id}
                      className="rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 transition hover:border-slate-300"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        {material.subject ? (
                          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            {material.subject}
                          </span>
                        ) : null}

                        {material.level ? (
                          <span className="inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                            {material.level}
                          </span>
                        ) : null}

                        {material.type ? (
                          <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                            {material.type}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
                        {material.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Publicado em{" "}
                        {new Date(material.created_at).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 px-6 py-10 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                  Continuidade
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Tudo o que você precisa, em um só lugar
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  Use o dashboard para acompanhar seus próximos passos, organizar
                  seus pedidos e manter seus estudos em andamento com mais
                  clareza.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Agendar aula
                </Link>

                <Link
                  href="/materials"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <BookOpen className="h-4 w-4" />
                  Abrir materiais
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}