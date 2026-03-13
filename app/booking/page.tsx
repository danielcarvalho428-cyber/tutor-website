"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MessageCircle,
  MonitorSmartphone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Loader2,
} from "lucide-react";

import Container from "@/components/Container";

type BookingFormState = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  level: string;
  format: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
};

export default function BookingPage() {
  const [form, setForm] = useState<BookingFormState>({
    name: "",
    phone: "",
    email: "",
    subject: "",
    level: "",
    format: "",
    preferredDay: "",
    preferredTime: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fallbackWhatsappHref = useMemo(() => {
    const text = `Olá, Professor Kaue Ribeiro!

Nova solicitação de aula:
Nome: ${form.name || "-"}
WhatsApp: ${form.phone || "-"}
E-mail: ${form.email || "-"}
Disciplina: ${form.subject || "-"}
Nível: ${form.level || "-"}
Formato: ${form.format || "-"}
Dia preferido: ${form.preferredDay || "Não informado"}
Horário preferido: ${form.preferredTime || "Não informado"}
Observações: ${form.message || "Nenhuma"}`;

    return `https://wa.me/5562982273735?text=${encodeURIComponent(text)}`;
  }, [form]);

  function updateField<K extends keyof BookingFormState>(
    key: K,
    value: BookingFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error || "Não foi possível enviar o agendamento."
        );
      }

      setSuccessMessage(
        "Agendamento enviado com sucesso. Você será direcionado para o WhatsApp."
      );

      const redirectUrl =
        data?.whatsappUrl ||
        data?.whatsapp_url ||
        data?.redirectUrl ||
        data?.redirect_url ||
        fallbackWhatsappHref;

      window.location.href = redirectUrl;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao enviar o agendamento.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-white text-slate-800">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.08),_transparent_42%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/70 to-transparent" />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700">
              Agendamento
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Agende a aula de forma simples, organizada e direta
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Preencha as informações principais para iniciar o atendimento. O
              envio segue para o sistema de agendamento e continua pelo
              WhatsApp, tornando o processo mais rápido e prático.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(30,64,175,0.08),_transparent_38%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/80 to-transparent" />

        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
                  Formulário de agendamento
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-sm font-medium text-slate-600">
                  Resposta rápida
                </span>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Nome do aluno
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    placeholder="Digite o nome do aluno"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    placeholder="(62) 98227-3735"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    placeholder="seuemail@exemplo.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Disciplina
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Matemática">Matemática</option>
                    <option value="Física">Física</option>
                    <option value="Matemática e Física">
                      Matemática e Física
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="level"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Nível
                  </label>
                  <select
                    id="level"
                    value={form.level}
                    onChange={(e) => updateField("level", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="6º ao 9º ano">6º ao 9º ano</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Cursinho">Cursinho</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="format"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Formato
                  </label>
                  <select
                    id="format"
                    value={form.format}
                    onChange={(e) => updateField("format", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Online (Google Meet)">
                      Online (Google Meet)
                    </option>
                    <option value="Presencial em Goiânia/GO">
                      Presencial em Goiânia/GO
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="preferredDay"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Dia preferido
                  </label>
                  <input
                    id="preferredDay"
                    type="date"
                    value={form.preferredDay}
                    onChange={(e) => updateField("preferredDay", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="preferredTime"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Horário preferido
                  </label>
                  <input
                    id="preferredTime"
                    type="text"
                    value={form.preferredTime}
                    onChange={(e) =>
                      updateField("preferredTime", e.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    placeholder="Ex.: 18h, 19h30, manhã"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Observações
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="min-h-[140px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    placeholder="Descreva a principal dificuldade, objetivo ou qualquer detalhe importante."
                  />
                </div>
              </div>

              {error ? (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {successMessage ? (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar agendamento
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <a
                  href={fallbackWhatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Falar direto no WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </form>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-10">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                  Como funciona
                </span>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Envie os dados principais
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-200">
                        Preencha a disciplina, o nível do aluno e uma sugestão
                        de dia ou horário.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                      <Clock3 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Alinhamento rápido
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-200">
                        O atendimento continua pelo WhatsApp para confirmar os
                        detalhes do agendamento.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Aula organizada
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-200">
                        Com as informações iniciais, o processo fica mais claro,
                        profissional e eficiente.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-sm leading-7 text-slate-200">
                    O ideal é informar a série do aluno e a principal
                    dificuldade. Isso ajuda a direcionar melhor o primeiro
                    atendimento.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <MonitorSmartphone className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Aulas online
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Encontros por Google Meet com praticidade, acompanhamento
                    individual e boa organização.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Presencial em Goiânia/GO
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Para quem prefere o atendimento presencial, mantendo a mesma
                    proposta personalizada.
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
              Público atendido
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Aulas para diferentes fases da jornada escolar
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              O atendimento é voltado para alunos que precisam de reforço,
              acompanhamento ou preparação mais direcionada.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                6º ao 9º ano
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Reforço, revisão e desenvolvimento de base para evoluir com mais
                segurança.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Ensino Médio
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Apoio mais estratégico para conteúdos mais densos em Matemática
                e Física.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Cursinho
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Organização, revisão e prática orientada para objetivos mais
                exigentes.
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
                  Atendimento
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Quer agilizar ainda mais? Fale direto pelo WhatsApp
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  O formulário organiza as informações, mas você também pode
                  iniciar o contato diretamente pelo WhatsApp.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <a
                  href={fallbackWhatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Falar no WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Ver página de contato
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}