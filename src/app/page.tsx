import Link from "next/link";
import HematologiaCalc from "./HematologiaCalc";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <header className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm">
            Ferramentas de rotina · Hematologia veterinária
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            Reticulócitos e Correção de Leucócitos por nRBC
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-zinc-700">
            Calculadoras rápidas, estáveis e no padrão de laudo para apoiar a rotina de laboratório
            em <span className="font-semibold">cães e gatos</span>.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-zinc-900">Entradas no formato do laudo</p>
              <p className="mt-2 text-sm text-zinc-700">
                Ex.: RBC <span className="font-semibold">5.200</span> e WBC <span className="font-semibold">12.300</span>.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-zinc-900">Sem enrolação</p>
              <p className="mt-2 text-sm text-zinc-700">
                Só cálculo, sem textos interpretativos.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-zinc-900">Uso real</p>
              <p className="mt-2 text-sm text-zinc-700">
                Feito para agilizar rotina e reduzir erro manual.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-10">
          <HematologiaCalc />
        </div>

        <section className="mt-10 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-zinc-900">FAQ rápido</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Que unidades devo informar?</h3>
              <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                RBC em <span className="font-semibold">10^6/µL</span> (ex.: 5.200). WBC em <span className="font-semibold">10^3/µL</span> (ex.: 12.300).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">O reticulócito absoluto sai em quê?</h3>
              <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                Em <span className="font-semibold">mil/µL</span> (thou/µL), no padrão mais comum para avaliação em rotina.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Como é calculado o WBC corrigido?</h3>
              <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                Ajusta o WBC quando há nRBC circulante: WBC corrigido = WBC × 100 / (100 + nRBC/100 WBC).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Posso usar em produção no laboratório?</h3>
              <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                Sim, mas sempre valide com seu protocolo interno e uma amostra de casos antes de padronizar.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-zinc-700">
            Links úteis:
            <span className="ml-2">
              <Link className="text-sky-700 hover:underline" href="/privacidade">
                Privacidade
              </Link>
              <span className="px-2 text-zinc-400">·</span>
              <Link className="text-sky-700 hover:underline" href="/termos">
                Termos
              </Link>
              <span className="px-2 text-zinc-400">·</span>
              <Link className="text-sky-700 hover:underline" href="/contato">
                Contato
              </Link>
            </span>
          </p>
        </section>

        <p className="mx-auto mt-8 max-w-4xl text-center text-xs text-zinc-500">
          Ferramenta de apoio. Verifique sempre os resultados e siga os procedimentos do laboratório.
        </p>
      </div>
    </div>
  );
}
