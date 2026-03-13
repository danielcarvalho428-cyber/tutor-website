import type { ReactNode } from "react";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

export const metadata = {
  title: "Professor Kaue Ribeiro | Matemática e Física",
  description:
    "Aulas de Matemática e Física para alunos do Ensino Fundamental II, Ensino Médio e cursinho. Aulas online e presenciais em Goiânia/GO.",
  keywords: [
    "aulas particulares",
    "professor de matemática",
    "professor de física",
    "reforço escolar",
    "vestibular",
    "aulas em Goiânia",
  ],
  openGraph: {
    title: "Professor Kaue Ribeiro | Matemática e Física",
    description:
      "Aulas particulares de Matemática e Física para Ensino Fundamental II, Ensino Médio e cursinho.",
    url: "https://kaue-aulas.vercel.app",
    siteName: "Professor Kaue Ribeiro",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-[#183A7A] antialiased">
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}