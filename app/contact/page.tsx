import {
  MessageCircle,
  Phone,
  Instagram,
  MapPin,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import Container from "@/components/Container";

export default function ContactPage() {
  const whatsappNumber = "5562982273735";
  const whatsappMessage =
    "Olá! Vim pelo site do Professor Kaue Ribeiro e gostaria de saber mais sobre as aulas.";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <main className="bg-white text-slate-800">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.08),_transparent_42%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/70 to-transparent" />

        <Container>
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700">
              Contato
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Um contato simples, direto e profissional
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Tire dúvidas, converse sobre a necessidade do aluno e encontre a
              melhor forma de iniciar as aulas com o Professor Kaue Ribeiro.
            </p>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(30,64,175,0.08),_transparent_38%)]" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-50/80 to-transparent" />

        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
                Fale pelo WhatsApp
              </span>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                O canal principal para atendimento
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                O atendimento é feito de forma prática e rápida pelo WhatsApp,
                facilitando o primeiro contato e o alinhamento das necessidades
                do aluno.
              </p>

              <div className="mt-8 space-y-4 text-slate-600">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <p>
                    Ideal para tirar dúvidas sobre formato das aulas, horários e
                    acompanhamento.
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <p>
                    Atendimento voltado para alunos do 6º ao 9º ano, Ensino
                    Médio e cursinho.
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <p>
                    Aulas online por Google Meet e presenciais em Goiânia/GO.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Chamar no WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-10">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-amber-300">
                Informações de contato
              </span>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-300">
                      WhatsApp
                    </p>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-lg font-semibold text-white transition hover:text-amber-300"
                    >
                      (62) 98227-3735
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-300">
                      Instagram
                    </p>
                    <a
                      href="https://www.instagram.com/kr_aulasparticulares?igsh=MTZjbmdmdXI0OTR6eA=="
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-lg font-semibold text-white transition hover:text-amber-300"
                    >
                      Acompanhar perfil
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-300">
                      Modalidades
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      Online e presencial em Goiânia/GO
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-300">
                      Atendimento
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      Contato rápido para alinhamento inicial
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5">
                <p className="text-sm leading-7 text-slate-200">
                  O ideal é enviar uma mensagem com a série do aluno, a matéria
                  e a principal dificuldade ou objetivo. Assim, o atendimento já
                  começa de forma mais direcionada.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-20 sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
              Como iniciar
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Um processo simples para começar
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              O primeiro contato foi pensado para ser rápido, claro e sem
              complicações.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                1. Envie uma mensagem
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Fale pelo WhatsApp e informe a série, a matéria e o que o aluno
                precisa no momento.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                2. Alinhe a necessidade
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                O atendimento ajuda a definir o melhor formato e a proposta mais
                adequada para o aluno.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                3. Continue o atendimento
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                A partir do contato inicial, o próximo passo é organizar a melhor
                forma de seguir com o aluno.
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
                  Próximo passo
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Vamos conversar sobre a melhor forma de ajudar o aluno
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                  Entre em contato pelo WhatsApp para tirar dúvidas, explicar a
                  necessidade do aluno e continuar o atendimento de forma prática
                  e organizada.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Falar no WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}