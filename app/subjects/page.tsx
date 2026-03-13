import Container from "../../components/Container";
import PageIntro from "../../components/PageIntro";
import SectionTitle from "../../components/SectionTitle";
import FeatureCard from "../../components/FeatureCard";
import Card from "../../components/Card";
import Button from "../../components/Button";

export default function SubjectsPage() {
  return (
    <main>
      <PageIntro
        title="Serviços"
        description="Aulas e suporte em Matemática e Física para alunos do Ensino Fundamental II, Ensino Médio e cursinho."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionTitle
                title="Um acompanhamento pensado para gerar clareza e resultado"
                subtitle="Cada serviço é organizado para atender as necessidades do aluno com mais objetividade, reforço e evolução consistente nos estudos."
              />

              <div className="mt-8 rounded-[28px] border border-[#dbe6f5] bg-gradient-to-br from-white to-[#f7faff] p-8 shadow-[0_18px_45px_rgba(24,58,122,0.08)]">
                <p className="text-lg leading-8 text-[#42526e]">
                  O acompanhamento vai além da explicação do conteúdo. A proposta
                  é unir <span className="font-semibold text-[#183A7A]">aulas personalizadas</span>,
                  organização de estudos e apoio em momentos importantes para
                  ajudar o aluno a aprender com mais segurança.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                      Foco
                    </p>
                    <p className="mt-2 text-base font-semibold text-[#183A7A]">
                      Clareza no conteúdo
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                      Método
                    </p>
                    <p className="mt-2 text-base font-semibold text-[#183A7A]">
                      Acompanhamento individual
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                      Objetivo
                    </p>
                    <p className="mt-2 text-base font-semibold text-[#183A7A]">
                      Evolução real
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <FeatureCard
                title="Aulas particulares"
                description="Atendimento personalizado de acordo com a necessidade, a série e os objetivos do aluno."
              />
              <FeatureCard
                title="Listas e tarefas"
                description="Ajuda com exercícios, tarefas escolares e reforço nos conteúdos com mais dificuldade."
              />
              <FeatureCard
                title="Provas e vestibular"
                description="Preparação direcionada para avaliações importantes, revisões e rotina de estudos."
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f7faff_0%,#eef4ff_100%)] py-20">
        <Container>
          <SectionTitle
            title="Como esse suporte funciona na prática"
            subtitle="Além da aula em si, o acompanhamento busca deixar o processo de aprendizagem mais organizado, leve e eficiente."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card>
              <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
              <h3 className="text-2xl font-semibold text-[#183A7A]">
                Organização de estudos
              </h3>
              <p className="mt-4 leading-7 text-[#42526e]">
                Apoio para montar uma rotina mais eficiente, melhorar o
                aproveitamento do tempo e trazer mais constância nos estudos.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Melhor divisão do tempo
                </div>
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Mais constância na rotina
                </div>
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Direcionamento para conteúdos prioritários
                </div>
              </div>
            </Card>

            <Card>
              <div className="mb-4 h-1.5 w-14 rounded-full bg-[#E5B325]" />
              <h3 className="text-2xl font-semibold text-[#183A7A]">
                Modalidade flexível
              </h3>
              <p className="mt-4 leading-7 text-[#42526e]">
                Aulas online pelo Google Meet e presenciais em Goiânia/GO,
                oferecendo mais praticidade para a rotina do aluno.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Atendimento online com praticidade
                </div>
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Opção presencial em Goiânia/GO
                </div>
                <div className="rounded-2xl border border-[#e4ecf8] bg-white px-5 py-4 text-[#42526e]">
                  Mais adaptação à rotina do aluno
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 rounded-[28px] border border-[#dbe6f5] bg-white px-6 py-10 text-center shadow-[0_18px_45px_rgba(24,58,122,0.06)]">
            <p className="mx-auto max-w-2xl text-lg leading-8 text-[#42526e]">
              Se você quer um acompanhamento mais próximo, personalizado e com
              foco em evolução real, entre em contato para entender qual formato
              faz mais sentido para o seu momento.
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