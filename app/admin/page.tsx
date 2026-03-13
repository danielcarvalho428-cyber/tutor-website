// app/admin/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Eye,
  Shield,
  Sparkles,
} from "lucide-react";

import StatusSelect from "./StatusSelect";
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

function getBookingMode(booking: Booking) {
  return (
    readText(booking.mode) ||
    readText(booking.lesson_mode) ||
    readText(booking.format)
  );
}

function getBookingDate(booking: Booking) {
  return (
    readText(booking.date) ||
    readText(booking.booking_date) ||
    readText(booking.preferred_date) ||
    readText(booking.preferred_day)
  );
}

function getBookingTime(booking: Booking) {
  return (
    readText(booking.time) ||
    readText(booking.booking_time) ||
    readText(booking.preferred_time)
  );
}

export default async function AdminPage() {
  const authData = await getUserRole();

  if (!authData.user || authData.role !== "admin") {
    redirect("/dashboard");
  }

  const supabase = await createClient();

  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (bookingsError) {
    throw new Error(`Erro ao carregar agendamentos: ${bookingsError.message}`);
  }

  const { data: materials, error: materialsError } = await supabase
    .from("materials")
    .select("id, title, subject, level, type, is_published, created_at")
    .order("created_at", { ascending: false })
    .limit(6);

  if (materialsError) {
    throw new Error(`Erro ao carregar materiais: ${materialsError.message}`);
  }

  const pendingCount =
    bookings?.filter((item) => item.status === "pendente").length ?? 0;
  const confirmedCount =
    bookings?.filter((item) => item.status === "confirmado").length ?? 0;
  const canceledCount =
    bookings?.filter((item) => item.status === "cancelado").length ?? 0;
  const completedCount =
    bookings?.filter((item) => item.status === "concluído").length ?? 0;

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
                    Administração
                  </span>

                  <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                    Painel administrativo
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                    Gerencie solicitações de aula, acompanhe o fluxo dos
                    agendamentos e acesse rapidamente a área de materiais em uma
                    interface mais clara e organizada.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Perfil
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      Administrador
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      Total de agendamentos
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {bookings?.length ?? 0} registro
                      {(bookings?.length ?? 0) === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">Pendentes</p>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {pendingCount}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Solicitações aguardando definição.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Shield className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Confirmados
                  </p>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {confirmedCount}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Agendamentos aprovados no fluxo atual.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Concluídos
                  </p>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {completedCount}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Aulas já finalizadas no sistema.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Cancelados
                  </p>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {canceledCount}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Pedidos encerrados sem continuidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            <Link
              href="/admin/materials"
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-600">
                Administração
              </p>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Gerenciar materiais
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Criar, editar, publicar e excluir materiais da plataforma.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:translate-x-1">
                Abrir gestão
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/booking"
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">
                Site
              </p>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Ver página de agendamento
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Acesse rapidamente a experiência que o aluno visualiza.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:translate-x-1">
                Abrir página
                <Eye className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/dashboard"
              className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">
                Navegação
              </p>
              <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
                Voltar ao dashboard
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Retorne para a visão principal da conta autenticada.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:translate-x-1">
                Voltar
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Agenda administrativa
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    Gerenciar agendamentos
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Atualize status e acompanhe os pedidos mais recentes com uma
                    visualização mais clara.
                  </p>
                </div>
              </div>

              {!bookings || bookings.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                  <p className="text-base font-medium text-slate-800">
                    Nenhum agendamento encontrado.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking: Booking) => (
                    <div
                      key={booking.id}
                      className="rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 transition hover:border-slate-300"
                    >
                      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                        <div className="min-w-0 flex-1">
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

                          <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                ID
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-700">
                                #{booking.id}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Matéria
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {readText(booking.subject) || "Não informada"}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Nível
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {getBookingLevel(booking) || "Não informado"}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Modalidade
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {getBookingMode(booking) || "Não informada"}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Data
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {getBookingDate(booking) || "Não informada"}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 px-4 py-3">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Horário
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {getBookingTime(booking) || "Não informado"}
                              </p>
                            </div>
                          </div>

                          <p className="mt-4 text-xs text-slate-400">
                            Criado em{" "}
                            {booking.created_at
                              ? new Date(booking.created_at).toLocaleString(
                                  "pt-BR"
                                )
                              : "Data não disponível"}
                          </p>
                        </div>

                        <div className="w-full xl:w-56">
                          <StatusSelect
                            bookingId={booking.id}
                            currentStatus={
                              readText(booking.status) || "pendente"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Biblioteca administrativa
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    Materiais recentes
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Atalho visual para os últimos materiais cadastrados.
                  </p>
                </div>

                <Link
                  href="/admin/materials"
                  className="inline-flex h-fit items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Abrir
                </Link>
              </div>

              {!materials || materials.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                  <p className="text-base font-medium text-slate-800">
                    Nenhum material cadastrado.
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

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            material.is_published
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {material.is_published ? "Publicado" : "Rascunho"}
                        </span>
                      </div>

                      <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
                        {material.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Criado em{" "}
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
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 px-6 py-10 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:px-10 sm:py-12">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                  Continuidade
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Administração centralizada e mais organizada
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  Use este painel para acompanhar o fluxo dos agendamentos e
                  acessar rapidamente a gestão de materiais da plataforma.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href="/admin/materials"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  <BookOpen className="h-4 w-4" />
                  Gerenciar materiais
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  <ArrowRight className="h-4 w-4" />
                  Voltar ao dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}