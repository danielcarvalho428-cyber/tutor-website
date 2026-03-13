"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  MapPin,
  MonitorSmartphone,
  Loader2,
} from "lucide-react";

const bookingOptions = [
  {
    title: "Aulas online",
    description:
      "Atendimento via Google Meet com praticidade, acompanhamento próximo e flexibilidade para a rotina do aluno.",
    icon: MonitorSmartphone,
    details: [
      "Ideal para alunos de qualquer local",
      "Praticidade e agilidade",
      "Acompanhamento individual",
    ],
  },
  {
    title: "Aulas presenciais",
    description:
      "Formato presencial em Goiânia/GO para quem prefere uma experiência de estudo mais direta e próxima.",
    icon: MapPin,
    details: [
      "Atendimento em Goiânia/GO",
      "Experiência mais tradicional",
      "Contato direto com o professor",
    ],
  },
  {
    title: "Horários personalizados",
    description:
      "Possibilidade de alinhar disponibilidade de acordo com a rotina escolar, provas e objetivos do aluno.",
    icon: Clock3,
    details: [
      "Flexibilidade de agenda",
      "Organização por demanda",
      "Melhor encaixe para cada caso",
    ],
  },
];

type FormState = {
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

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  level: "",
  format: "",
  preferredDay: "",
  preferredTime: "",
  message: "",
};

export default function BookingPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  const canSubmit = useMemo(() => {
    return (
      form.name.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.subject.trim() &&
      form.level.trim() &&
      form.format.trim()
    );
  }, [form]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccessMessage("");
    setRedirectUrl("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Não foi possível enviar sua solicitação.");
        return;
      }

      setSuccessMessage(data.message || "Solicitação enviada com sucesso.");
      setRedirectUrl(data.whatsappUrl || "");
    } catch {
      setError("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] text-slate-900">
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#102443_55%,#111827_100%)]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Agendamento
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Solicite sua aula com praticidade.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Preencha os dados abaixo para iniciar seu agendamento de aula em
              Matemática ou Física, no formato online ou presencial.
            </p>

            <div className="mt-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Área do aluno
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-12">
        <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-700">
                Solicitação de aula
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Preencha os dados para iniciar o agendamento
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Após o envio, sua solicitação será registrada e você poderá
                concluir o contato pelo WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                    placeholder="(62) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  E-mail
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                  placeholder="voce@email.com"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Disciplina
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                  >
                    <option value="">Selecione</option>
                    <option value="Matemática">Matemática</option>
                    <option value="Física">Física</option>
                    <option value="Matemática e Física">Matemática e Física</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Nível de ensino
                  </label>
                  <select
                    value={form.level}
                    onChange={(e) => updateField("level", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                  >
                    <option value="">Selecione</option>
                    <option value="6º ao 9º ano">6º ao 9º ano</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Cursinho">Cursinho</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Formato
                  </label>
                  <select
                    value={form.format}
                    onChange={(e) => updateField("format", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                  >
                    <option value="">Selecione</option>
                    <option value="Online (Google Meet)">Online (Google Meet)</option>
                    <option value="Presencial em Goiânia/GO">
                      Presencial em Goiânia/GO
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">
                    Horário preferido
                  </label>
                  <input
                    type="text"
                    value={form.preferredTime}
                    onChange={(e) => updateField("preferredTime", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                    placeholder="Ex.: 18h às 20h"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Dia preferido
                </label>
                <input
                  type="text"
                  value={form.preferredDay}
                  onChange={(e) => updateField("preferredDay", e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                  placeholder="Ex.: Segunda ou Quarta"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Observações
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="min-h-[150px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                  placeholder="Conte um pouco sobre a necessidade do aluno, dificuldade principal, objetivo ou série."
                />
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              ) : null}

              <div className="flex flex-col gap-4 pt-1 sm:flex-row">
                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar solicitação"
                  )}
                </button>

                {redirectUrl ? (
                  <a
                    href={redirectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
                  >
                    Concluir no WhatsApp
                  </a>
                ) : null}
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-700">
                Formatos de atendimento
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                Escolha a opção que faz mais sentido para sua rotina
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                O acompanhamento pode ser adaptado conforme a modalidade e a
                disponibilidade do aluno.
              </p>
            </div>

            <div className="grid gap-6">
              {bookingOptions.map((option) => {
                const Icon = option.icon;

                return (
                  <div
                    key={option.title}
                    className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-yellow-400">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
                      {option.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {option.description}
                    </p>

                    <ul className="mt-5 space-y-3">
                      {option.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-3 text-sm text-slate-700"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-yellow-600" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}