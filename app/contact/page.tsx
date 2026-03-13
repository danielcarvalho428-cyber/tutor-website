"use client";

import { useState } from "react";
import Container from "../../components/Container";
import PageIntro from "../../components/PageIntro";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text =
      `Olá, Professor Kaue Ribeiro!\n\n` +
      `Nome: ${name}\n` +
      `E-mail: ${email}\n` +
      `Assunto: ${subject}\n` +
      `Mensagem: ${message}`;

    window.open(
      `https://wa.me/5562982273735?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <main>
      <PageIntro
        title="Contato"
        description="Entre em contato para tirar dúvidas, saber mais sobre as aulas e encontrar o melhor formato de acompanhamento."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                Mensagem direta
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#183A7A] sm:text-3xl">
                Envie uma mensagem
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#42526e]">
                Preencha os dados abaixo e a mensagem será aberta no WhatsApp
                para envio direto ao professor. Um jeito rápido, prático e
                direto de começar o contato.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleWhatsAppSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-[#183A7A]"
                    >
                      Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Digite seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-[#d7e3ff] bg-white px-4 py-3 text-[#183A7A] outline-none transition focus:border-[#2454A6] focus:ring-4 focus:ring-[#2454A6]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[#183A7A]"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-[#d7e3ff] bg-white px-4 py-3 text-[#183A7A] outline-none transition focus:border-[#2454A6] focus:ring-4 focus:ring-[#2454A6]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-[#183A7A]"
                  >
                    Assunto
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Exemplo: Matemática, Física, reforço, vestibular"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-2xl border border-[#d7e3ff] bg-white px-4 py-3 text-[#183A7A] outline-none transition focus:border-[#2454A6] focus:ring-4 focus:ring-[#2454A6]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-[#183A7A]"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Escreva sua mensagem"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-2xl border border-[#d7e3ff] bg-white px-4 py-3 text-[#183A7A] outline-none transition focus:border-[#2454A6] focus:ring-4 focus:ring-[#2454A6]/10"
                  />
                </div>

                <div className="rounded-2xl border border-[#e6eefc] bg-[linear-gradient(180deg,#f8fbff_0%,#f2f7ff_100%)] p-5">
                  <p className="text-sm font-semibold text-[#183A7A]">
                    Atendimento rápido e simples
                  </p>
                  <p className="mt-2 leading-7 text-[#42526e]">
                    Ao clicar no botão abaixo, sua mensagem será aberta
                    automaticamente no WhatsApp com os dados preenchidos.
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#183A7A] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#2454A6]"
                >
                  Enviar pelo WhatsApp
                </button>
              </form>
            </Card>

            <div className="grid gap-8">
              <Card>
                <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                  Canais de contato
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#183A7A]">
                  Fale diretamente
                </h2>
                <p className="mt-4 leading-7 text-[#42526e]">
                  Escolha o canal mais prático para tirar dúvidas, solicitar
                  informações ou combinar horários.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-[#d7e3ff] bg-[#f7faff] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#E5B325]">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/5562982273735"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-lg font-semibold text-[#183A7A] hover:underline"
                    >
                      (62) 98227-3735
                    </a>
                    <p className="mt-2 text-sm leading-6 text-[#42526e]">
                      Canal ideal para contato rápido, dúvidas e combinação de
                      horários.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#d7e3ff] bg-[#f7faff] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#E5B325]">
                      Instagram
                    </p>
                    <a
                      href="https://www.instagram.com/kr_aulasparticulares?igsh=MTZjbmdmdXI0OTR6eA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-lg font-semibold text-[#183A7A] hover:underline"
                    >
                      @kr_aulasparticulares
                    </a>
                    <p className="mt-2 text-sm leading-6 text-[#42526e]">
                      Acompanhe novidades, conteúdos e presença digital do
                      professor.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#d7e3ff] bg-[#f7faff] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#E5B325]">
                      Modalidade
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[#183A7A]">
                      Aulas online e presenciais em Goiânia/GO
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#42526e]">
                      Flexibilidade para atender diferentes rotinas e perfis de
                      aluno.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button href="https://wa.me/5562982273735">
                    Falar no WhatsApp
                  </Button>
                  <Button
                    href="https://www.instagram.com/kr_aulasparticulares?igsh=MTZjbmdmdXI0OTR6eA=="
                    variant="secondary"
                  >
                    Ver Instagram
                  </Button>
                </div>
              </Card>

              <Card>
                <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                  Próximas evoluções
                </p>
                <h2 className="mt-3 text-2xl font-bold text-[#183A7A]">
                  Plataforma em crescimento
                </h2>
                <p className="mt-4 leading-7 text-[#42526e]">
                  Esta página poderá receber novas integrações para deixar a
                  experiência ainda mais completa e prática.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                    Calendário e disponibilidade
                  </div>
                  <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                    Pagamento online
                  </div>
                  <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                    Área de login do aluno
                  </div>
                  <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                    Acesso a materiais exclusivos
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}