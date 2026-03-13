// app/admin/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";

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
      return "bg-emerald-100 text-emerald-700";
    case "pendente":
      return "bg-amber-100 text-amber-700";
    case "cancelado":
      return "bg-red-100 text-red-700";
    case "concluído":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-slate-100 text-slate-700";
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
  return readText(booking.mode) || readText(booking.lesson_mode);
}

function getBookingDate(booking: Booking) {
  return (
    readText(booking.date) ||
    readText(booking.booking_date) ||
    readText(booking.preferred_date)
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
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Administração
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Painel administrativo
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Gerencie solicitações de aula, acompanhe o fluxo dos agendamentos e
            acesse rapidamente a área de materiais.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Pendentes</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {pendingCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Confirmados</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {confirmedCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Concluídos</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {completedCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-500">Cancelados</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {canceledCount}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <Link
            href="/admin/materials"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">
              Administração
            </p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">
              Gerenciar materiais
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Criar, editar, publicar e excluir materiais da plataforma.
            </p>
          </Link>

          <Link
            href="/booking"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">
              Site
            </p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">
              Ver página de agendamento
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Acesse rapidamente a experiência que o aluno visualiza.
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">
              Navegação
            </p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">
              Voltar ao dashboard
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Retorne para a visão principal da conta autenticada.
            </p>
          </Link>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Gerenciar agendamentos
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Atualize status e acompanhe os pedidos mais recentes.
              </p>
            </div>

            {!bookings || bookings.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                <p className="text-sm font-medium text-slate-700">
                  Nenhum agendamento encontrado.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking: Booking) => (
                  <div
                    key={booking.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {getBookingTitle(booking)}
                          </h3>

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                              typeof booking.status === "string" ? booking.status : null
                            )}`}
                          >
                            {readText(booking.status) || "Sem status"}
                          </span>
                        </div>

                        <div className="grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                          <p>
                            <span className="font-semibold text-slate-800">
                              ID:
                            </span>{" "}
                            #{booking.id}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">
                              Matéria:
                            </span>{" "}
                            {readText(booking.subject) || "Não informada"}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">
                              Nível:
                            </span>{" "}
                            {getBookingLevel(booking) || "Não informado"}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">
                              Modalidade:
                            </span>{" "}
                            {getBookingMode(booking) || "Não informada"}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">
                              Data:
                            </span>{" "}
                            {getBookingDate(booking) || "Não informada"}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-800">
                              Horário:
                            </span>{" "}
                            {getBookingTime(booking) || "Não informado"}
                          </p>
                        </div>

                        <p className="text-xs text-slate-400">
                          Criado em{" "}
                          {booking.created_at
                            ? new Date(booking.created_at).toLocaleString("pt-BR")
                            : "Data não disponível"}
                        </p>
                      </div>

                      <div className="w-full xl:w-56">
                        <StatusSelect
                          bookingId={booking.id}
                          currentStatus={readText(booking.status) || "pendente"}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Materiais recentes
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Atalho visual para os últimos materiais.
                </p>
              </div>

              <Link
                href="/admin/materials"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Abrir
              </Link>
            </div>

            {!materials || materials.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                <p className="text-sm font-medium text-slate-700">
                  Nenhum material cadastrado.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {materials.map((material: Material) => (
                  <div
                    key={material.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
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

                    <h3 className="mt-3 text-lg font-semibold text-slate-900">
                      {material.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-400">
                      Criado em{" "}
                      {new Date(material.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}