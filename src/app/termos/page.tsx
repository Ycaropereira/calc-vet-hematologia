export default function TermosPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Termos de Uso</h1>
      <p className="mt-4 text-zinc-700">
        Ao acessar o site Hematologia Vet, você concorda com estes Termos de Uso.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-zinc-900">Finalidade</h2>
      <p className="mt-3 text-zinc-700">
        Esta ferramenta foi criada para auxiliar cálculos de rotina em hematologia veterinária.
        Os resultados dependem dos valores informados e não substituem a revisão técnica do
        laboratório.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-zinc-900">Limitação de responsabilidade</h2>
      <p className="mt-3 text-zinc-700">
        Não nos responsabilizamos por decisões tomadas com base nos resultados exibidos. Sempre
        valide os cálculos e utilize protocolos internos do seu laboratório.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-zinc-900">Contato</h2>
      <p className="mt-3 text-zinc-700">Dúvidas: suportcalculo@gmail.com.</p>
    </main>
  );
}
