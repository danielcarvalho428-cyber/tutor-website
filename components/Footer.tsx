import Link from "next/link";
import { Instagram, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  const whatsappHref =
    "https://wa.me/5562982273735?text=" +
    encodeURIComponent(
      "Olá! Vim pelo site do Professor Kaue Ribeiro e gostaria de saber mais sobre as aulas."
    );

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-700">
              Professor Kaue Ribeiro
            </span>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Matemática e Física com mais clareza, organização e confiança
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Aulas voltadas para 6º ao 9º ano, Ensino Médio e cursinho, com
              atendimento online por Google Meet e presencial em Goiânia/GO.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Navegação
              </p>

              <div className="mt-4 flex flex-col gap-3 text-sm font-medium text-slate-700">
                <Link href="/" className="transition hover:text-slate-950">
                  Início
                </Link>
                <Link href="/about" className="transition hover:text-slate-950">
                  Sobre
                </Link>
                <Link
                  href="/booking"
                  className="transition hover:text-slate-950"
                >
                  Agendamento
                </Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Contato
              </p>

              <div className="mt-4 space-y-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-slate-700 transition hover:text-slate-950"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://www.instagram.com/kr_aulasparticulares?igsh=MTZjbmdmdXI0OTR6eA=="
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-slate-700 transition hover:text-slate-950"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-700">
                    <Instagram className="h-4 w-4" />
                  </span>
                  <span>Instagram</span>
                </a>

                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>Goiânia/GO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <div className="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Professor Kaue Ribeiro • Matemática e Física</p>
            <p>Aulas online e presenciais em Goiânia/GO</p>
          </div>
        </div>
      </div>
    </footer>
  );
}