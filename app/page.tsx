
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import Button from "@/components/Button";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="py-20">
        <Container>
          <SectionTitle
            title="Um acompanhamento mais claro e personalizado"
            subtitle="Aulas pensadas para ajudar o aluno a compreender melhor os conteúdos, se organizar e evoluir com mais segurança em Matemática e Física."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Acompanhamento individual"
              description="Cada aula é adaptada ao ritmo, à série e às necessidades específicas do aluno."
            />
            <FeatureCard
              title="Mais organização nos estudos"
              description="Além da explicação do conteúdo, o acompanhamento ajuda a criar mais constância e estratégia na rotina de estudos."
            />
            <FeatureCard
              title="Foco em resultado"
              description="O objetivo é fortalecer a base, melhorar o desempenho em provas e trazer mais confiança para aprender."
            />
          </div>
        </Container>
      </section>

      <section className="bg-[#f7faff] py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionTitle
                title="Aulas online e presenciais"
                subtitle="Atendimento para alunos do 6º ao 9º ano, Ensino Médio e cursinho, com flexibilidade para diferentes rotinas."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#dbe6f5] bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                    Online
                  </p>
                  <p className="mt-2 text-[#183A7A]">
                    Aulas pelo Google Meet com praticidade e acompanhamento próximo.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#dbe6f5] bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                    Presencial
                  </p>
                  <p className="mt-2 text-[#183A7A]">
                    Atendimento em Goiânia/GO para quem prefere um formato mais direto.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#dbe6f5] bg-white p-8 shadow-[0_18px_45px_rgba(24,58,122,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E5B325]">
                Próximo passo
              </p>
              <h3 className="mt-3 text-2xl font-bold text-[#183A7A]">
                Solicite seu agendamento
              </h3>
              <p className="mt-4 leading-7 text-[#42526e]">
                Entre em contato para alinhar disciplina, formato da aula e horários
                mais adequados para a rotina do aluno.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/booking">Agendar aula</Button>
                <Button href="/about" variant="secondary">
                  Saber mais
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
