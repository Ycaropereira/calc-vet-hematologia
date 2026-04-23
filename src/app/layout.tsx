import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calc-vet-hematologia.vercel.app"),
  title: "Calculadoras de Hematologia Veterinária - Reticulócitos e nRBC",
  description:
    "Calcule reticulócitos (absoluto e corrigido) e corrija leucócitos por nRBC (eritroblastos) em cães e gatos. Ferramenta rápida para rotina de laboratório.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Calculadoras de Hematologia Veterinária",
    description:
      "Reticulócitos (absoluto e corrigido) e correção de leucócitos por nRBC em cães e gatos.",
    type: "website",
    locale: "pt_BR",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Calculadoras de Hematologia Veterinária",
    description:
      "Reticulócitos (absoluto e corrigido) e correção de leucócitos por nRBC em cães e gatos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="mt-auto border-t border-black/5 bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              © {new Date().getFullYear()} Hematologia Vet
            </p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link className="text-zinc-700 hover:underline" href="/privacidade">
                Privacidade
              </Link>
              <Link className="text-zinc-700 hover:underline" href="/termos">
                Termos
              </Link>
              <Link className="text-zinc-700 hover:underline" href="/contato">
                Contato
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
