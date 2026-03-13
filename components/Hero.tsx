import Image from "next/image";
import Container from "./Container";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] via-white to-white py-24 md:py-32">
      <div className="absolute inset-0">
        <div className="absolute left-[-80px] top-12 h-72 w-72 rounded-full bg-[#dbe8ff] blur-3xl" />
        <div className="absolute right-[-40px] top-10 h-80 w-80 rounded-full bg-[#fff3c9] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#e8f0ff] blur-3xl" />
      </div>

      <Container>
        <div className="relative grid items-center gap-14 md:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#d7e3ff] bg-white shadow-sm">
                <Image
                  src="/logo-kaue.png"
                  alt="Logo Professor Kaue Ribeiro"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <span className="inline-flex rounded-full border border-[#d7e3ff] bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#183A7A] shadow-sm">
                Matemática e Física
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#183A7A] md:text-6xl md:leading-[1.05]">
              Aulas personalizadas para alunos do Fundamental II, Ensino Médio
              e cursinho
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#42526e]">
              Com o Professor Kaue Ribeiro, os alunos têm acesso a
              acompanhamento, listas de exercícios, ajuda com tarefas,
              preparação para provas e uma rotina de estudos mais organizada.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="https://wa.me/5562982273735">
                Entrar em contato
              </Button>
              <Button href="/subjects" variant="secondary">
                Ver serviços
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#d7e3ff] bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E5B325]">
                  Público
                </p>
                <p className="mt-2 text-sm font-medium text-[#183A7A]">
                  6º ao 9º ano, Ensino Médio e cursinho
                </p>
              </div>

              <div className="rounded-2xl border border-[#d7e3ff] bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E5B325]">
                  Modalidade
                </p>
                <p className="mt-2 text-sm font-medium text-[#183A7A]">
                  Online e presencial
                </p>
              </div>

              <div className="rounded-2xl border border-[#d7e3ff] bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E5B325]">
                  Plataforma
                </p>
                <p className="mt-2 text-sm font-medium text-[#183A7A]">
                  Google Meet
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -left-4 top-10 h-24 w-24 rounded-full bg-[#dbe8ff] blur-2xl" />
              <div className="absolute -right-6 bottom-8 h-32 w-32 rounded-full bg-[#fff0bf] blur-3xl" />

              <div className="relative rounded-[2rem] border border-[#d7e3ff] bg-white p-4 shadow-[0_20px_60px_rgba(24,58,122,0.10)]">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-[#f7faff] via-white to-[#fffaf0] p-8">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#d7e3ff] bg-white shadow-sm">
                      <Image
                        src="/logo-kaue.png"
                        alt="Logo Professor Kaue Ribeiro"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#183A7A]">
                        Professor Kaue Ribeiro
                      </span>
                      <span className="text-xs uppercase tracking-[0.14em] text-[#E5B325]">
                        Matemática e Física
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-5">
                    <div className="rounded-2xl border border-[#d7e3ff] bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E5B325]">
                        Serviços
                      </p>
                      <p className="mt-3 text-lg font-semibold text-[#183A7A]">
                        Aulas particulares, listas, tarefas e preparação para
                        provas
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="rounded-2xl border border-[#d7e3ff] bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E5B325]">
                          Objetivo
                        </p>
                        <p className="mt-3 text-base font-semibold text-[#183A7A]">
                          Mais clareza e organização nos estudos
                        </p>
                      </div>

                      <div className="rounded-2xl border border-[#d7e3ff] bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E5B325]">
                          Contato
                        </p>
                        <p className="mt-3 text-base font-semibold text-[#183A7A]">
                          WhatsApp e Instagram
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#1f4b97] bg-[#183A7A] p-6 text-white shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f3d77a]">
                        Atendimento
                      </p>
                      <p className="mt-3 text-xl font-semibold">
                        Online pelo Google Meet e presencial em Goiânia/GO
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}