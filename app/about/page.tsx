import Container from "../../components/Container";
import PageIntro from "../../components/PageIntro";
import SectionTitle from "../../components/SectionTitle";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function AboutPage() {
  return (
    <main>
      <PageIntro
        title="Sobre"
        description="Conheça um pouco mais sobre o acompanhamento em Matemática e Física oferecido pelo Professor Kaue Ribeiro."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <SectionTitle
                title="Um ensino com foco em clareza, confiança e evolução"
                subtitle="Cada aula é pensada para ajudar o aluno a compreender melhor os conteúdos, ganhar segurança e construir uma rotina de estudos mais eficiente."
              />

              <div className="mt-8 rounded-[28px] border border-[#dbe6f5] bg-gradient-to-br from-white to-[#f7faff] p-8 shadow-[0_18px_45px_rgba(24,58,122,0.08)]">
                <p className="text-lg leading-8 text-[#42526e]">
                  O acompanhamento é voltado para alunos que desejam melhorar o
                  entendimento em <span className="font-semibold text-[#183A7A]">Matemática</span> e{" "}
                  <span className="font-semibold text-[#183A7A]">Física</span>,
                  com uma abordagem mais próxima, organizada e adaptada às
                  necessidades de cada etapa escolar.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                      Matérias
                    </p>
                    <p className="mt-2 text-base font-semibold text-[#183A7A]">
                      Matemática e Física
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                      Formato
                    </p>
                    <p className="mt-2 text-base font-semibold text-[#183A7A]">
                      Online e presencial
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                      Objetivo
                    </p>
                    <p className="mt-2 text-base font-semibold text-[#183A7A]">
                      Evolução real do aluno
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <Card>
                <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
                <h3 className="text-xl font-semibold text-[#183A7A]">
                  Acompanhamento individual
                </h3>
                <p className="mt-3 leading-7 text-[#42526e]">
                  O conteúdo é trabalhado de acordo com o ritmo, a série e as
                  principais dificuldades de cada aluno.
                </p>
              </Card>

              <Card>
                <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
                <h3 className="text-xl font-semibold text-[#183A7A]">
                  Mais organização
                </h3>
                <p className="mt-3 leading-7 text-[#42526e]">
                  Além das aulas, a proposta inclui estrutura para estudos,
                  materiais de apoio e listas de exercícios.
                </p>
              </Card>

              <Card>
                <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
                <h3 className="text-xl font-semibold text-[#183A7A]">
                  Foco em resultado
                </h3>
                <p className="mt-3 leading-7 text-[#42526e]">
                  O acompanhamento busca melhorar compreensão, desempenho em
                  provas e confiança ao longo do processo.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f7faff_0%,#eef4ff_100%)] py-20">
        <Container>
          <SectionTitle
            title="Para quem as aulas são indicadas"
            subtitle="Um formato flexível para atender diferentes fases escolares, sempre com atenção individual e foco em progresso consistente."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card>
              <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
              <h3 className="text-2xl font-semibold text-[#183A7A]">
                Público atendido
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  6º ao 9º ano (Ensino Fundamental II)
                </div>
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Ensino Médio
                </div>
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Cursinho e preparação para vestibular
                </div>
              </div>
            </Card>

            <Card>
              <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
              <h3 className="text-2xl font-semibold text-[#183A7A]">
                Formato das aulas
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Aulas online pelo Google Meet
                </div>
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Aulas presenciais em Goiânia/GO
                </div>
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Suporte com listas, tarefas e preparação para provas
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 rounded-[28px] border border-[#dbe6f5] bg-white px-6 py-10 text-center shadow-[0_18px_45px_rgba(24,58,122,0.06)]">
            <p className="mx-auto max-w-2xl text-lg leading-8 text-[#42526e]">
              Se você busca um acompanhamento mais próximo, organizado e focado
              em evolução real, entre em contato para tirar dúvidas e entender o
              formato ideal para o seu momento.
            </p>

            <div className="mt-8">
              <Button href="https://wa.me/5562982273735">
                Falar no WhatsApp
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}