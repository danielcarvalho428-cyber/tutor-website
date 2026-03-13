import Image from "next/image";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import FeatureCard from "../components/FeatureCard";
import Container from "../components/Container";
import Button from "../components/Button";

export default function Home() {
  return (
    <main className="font-sans">
      <Hero />

      <section className="py-20">
        <Container>
          <SectionTitle
            title="Como funciona"
            subtitle="Um processo simples para ajudar o aluno a aprender com mais clareza, constância e organização."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Escolha o suporte ideal"
              description="Aulas particulares, ajuda com tarefas, listas de exercícios e preparação para provas e vestibular."
            />
            <FeatureCard
              title="Organize a rotina de estudos"
              description="O acompanhamento busca dar mais direção ao aluno, com foco no conteúdo e no progresso."
            />
            <FeatureCard
              title="Acesse materiais e conteúdos"
              description="O site também será usado para postagem de materiais, listas e recursos das aulas."
            />
          </div>
        </Container>
      </section>

      <section className="bg-[#f7faff] py-20">
        <Container>
          <SectionTitle
            title="Serviços"
            subtitle="Atendimento focado em Matemática e Física para diferentes etapas da vida escolar."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Aulas particulares"
              description="Acompanhamento individual para alunos do 6º ao 9º ano, Ensino Médio e cursinho."
            />
            <FeatureCard
              title="Organização de estudos"
              description="Apoio para montar uma rotina mais eficiente e melhorar o aproveitamento nos estudos."
            />
            <FeatureCard
              title="Preparação para provas"
              description="Suporte em avaliações escolares, vestibular, tarefas e listas de exercícios."
            />
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8fbff] to-white" />

        <Container>
          <div className="relative">
            <SectionTitle
              title="Professor Kaue Ribeiro"
              subtitle="Aulas de Matemática e Física para alunos do Ensino Fundamental II, Ensino Médio e cursinho."
            />

            <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <span className="inline-flex rounded-full border border-[#d7e3ff] bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#183A7A] shadow-sm">
                  Online e presencial em Goiânia/GO
                </span>

                <p className="mt-6 text-lg leading-8 text-[#42526e]">
                  O acompanhamento tem como objetivo ajudar o aluno a compreender
                  melhor os conteúdos de Matemática e Física, desenvolver mais
                  segurança nas provas e criar uma rotina de estudos mais
                  organizada.
                </p>

                <p className="mt-6 text-lg leading-8 text-[#42526e]">
                  As aulas podem ser realizadas de forma online pelo Google Meet
                  ou presencialmente em Goiânia/GO, oferecendo flexibilidade para
                  a rotina do aluno.
                </p>

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
              </div>

              <div className="order-1 md:order-2">
                <div className="relative mx-auto max-w-md">
                  <div className="absolute -left-4 -top-4 h-28 w-28 rounded-full bg-[#dbe8ff] blur-2xl" />
                  <div className="absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-[#fff0bf] blur-3xl" />

                  <div className="relative overflow-hidden rounded-[2rem] border border-[#d7e3ff] bg-white p-3 shadow-[0_20px_60px_rgba(24,58,122,0.10)]">
                    <div className="relative h-[460px] w-full overflow-hidden rounded-[1.5rem] bg-[#eef4ff]">
                      <Image
                        src="/kaue.jpeg"
                        alt="Professor Kaue Ribeiro"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#d7e3ff] bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[#183A7A]">
                  Público atendido
                </h3>

                <ul className="mt-5 space-y-3 text-[#42526e]">
                  <li>• 6º ao 9º ano (Ensino Fundamental II)</li>
                  <li>• Ensino Médio</li>
                  <li>• Preparação para vestibular</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#d7e3ff] bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[#183A7A]">
                  Disciplinas
                </h3>

                <ul className="mt-5 space-y-3 text-[#42526e]">
                  <li>• Matemática</li>
                  <li>• Física</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#183A7A] py-20 text-center">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Entre em contato
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#dbe8ff]">
              Saiba mais sobre as aulas, combine horários e entenda como o
              acompanhamento pode ajudar no desempenho do aluno.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
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
          </div>
        </Container>
      </section>
    </main>
  );
}