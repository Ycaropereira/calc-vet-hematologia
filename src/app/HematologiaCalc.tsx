"use client";

import { useMemo, useState } from "react";

type Especie = "cao" | "gato";

type FieldState = {
  raw: string;
  value: number | null;
};

function parsePtNumber(raw: string): number | null {
  const cleaned = raw.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function formatInt(n: number): string {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(n);
}

function formatFixed(n: number, digits: number): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
}

function Field({
  label,
  hint,
  state,
  onChange,
  placeholder,
  inputMode = "decimal",
}: {
  label: string;
  hint?: string;
  state: FieldState;
  onChange: (raw: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-800">{label}</span>
      <input
        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none focus:border-sky-400"
        value={state.raw}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <p className="mt-2 text-xs text-zinc-500">{hint}</p> : null}
    </label>
  );
}

export default function HematologiaCalc() {
  const [especie, setEspecie] = useState<Especie>("cao");

  const [rbc, setRbc] = useState<FieldState>({ raw: "5.200", value: 5200 });
  const [hct, setHct] = useState<FieldState>({ raw: "35", value: 35 });
  const [reticPct, setReticPct] = useState<FieldState>({ raw: "1,2", value: 1.2 });

  const [wbc, setWbc] = useState<FieldState>({ raw: "12.300", value: 12300 });
  const [nrbcPer100, setNrbcPer100] = useState<FieldState>({ raw: "0", value: 0 });

  function update(setter: (v: FieldState) => void, raw: string) {
    setter({ raw, value: parsePtNumber(raw) });
  }

  const normalHct = especie === "cao" ? 45 : 35;

  const rbcMill = useMemo(() => {
    if (rbc.value == null) return null;
    return rbc.value / 1000;
  }, [rbc.value]);

  const absReticThou = useMemo(() => {
    if (rbcMill == null || reticPct.value == null) return null;
    return reticPct.value * rbcMill * 10;
  }, [rbcMill, reticPct.value]);

  const correctedReticPct = useMemo(() => {
    if (reticPct.value == null || hct.value == null) return null;
    if (normalHct <= 0) return null;
    return reticPct.value * (hct.value / normalHct);
  }, [reticPct.value, hct.value, normalHct]);

  const wbcCorr = useMemo(() => {
    if (wbc.value == null || nrbcPer100.value == null) return null;
    const denom = 100 + nrbcPer100.value;
    if (denom <= 0) return null;
    return (wbc.value * 100) / denom;
  }, [wbc.value, nrbcPer100.value]);

  function clearRetic() {
    setRbc({ raw: "", value: null });
    setHct({ raw: "", value: null });
    setReticPct({ raw: "", value: null });
  }

  function clearWbc() {
    setWbc({ raw: "", value: null });
    setNrbcPer100({ raw: "", value: null });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Reticulócitos (cão/gato)</h2>
            <p className="mt-2 text-sm text-zinc-700">
              Entradas no padrão de laudo: RBC em <span className="font-semibold">10^6/µL</span> e
              Retic em <span className="font-semibold">%</span>.
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50"
            onClick={clearRetic}
          >
            Limpar
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-zinc-800">Espécie</span>
            <select
              className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-zinc-900 shadow-sm outline-none focus:border-sky-400"
              value={especie}
              onChange={(e) => setEspecie(e.target.value as Especie)}
            >
              <option value="cao">Cão</option>
              <option value="gato">Gato</option>
            </select>
            <p className="mt-2 text-xs text-zinc-500">
              Usado apenas para o HCT normal do retic corrigido.
            </p>
          </label>

          <Field
            label="HCT / PCV (%)"
            hint={`Normal usado: ${normalHct}%`}
            state={hct}
            placeholder="Ex.: 35"
            onChange={(raw) => update(setHct, raw)}
          />

          <Field
            label="RBC (10^6/µL)"
            hint="Ex.: 5.200"
            state={rbc}
            placeholder="Ex.: 5.200"
            onChange={(raw) => update(setRbc, raw)}
          />

          <Field
            label="Reticulócitos (%)"
            hint="Ex.: 1,2"
            state={reticPct}
            placeholder="Ex.: 1,2"
            onChange={(raw) => update(setReticPct, raw)}
          />
        </div>

        <div className="mt-6 rounded-2xl bg-zinc-50 p-5">
          <p className="text-sm font-medium text-zinc-800">Resultados</p>
          <div className="mt-3 grid gap-3">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-zinc-600">Reticulócitos absolutos (mil/µL)</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {absReticThou == null ? "—" : formatInt(absReticThou)}
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-zinc-600">Reticulócitos corrigidos (%)</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {correctedReticPct == null ? "—" : formatFixed(correctedReticPct, 2)}
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Fórmulas: absoluto = Retic% × RBC(milhões/µL) × 10; corrigido = Retic% × (HCT/normal).
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900">Correção de Leucócitos por nRBC</h2>
            <p className="mt-2 text-sm text-zinc-700">
              Corrige o WBC reportado quando há eritroblastos circulantes (nRBC).
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50"
            onClick={clearWbc}
          >
            Limpar
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field
            label="WBC (10^3/µL)"
            hint="Ex.: 12.300"
            state={wbc}
            placeholder="Ex.: 12.300"
            onChange={(raw) => update(setWbc, raw)}
          />
          <Field
            label="nRBC por 100 WBC"
            hint="Ex.: 25"
            state={nrbcPer100}
            placeholder="Ex.: 0"
            onChange={(raw) => update(setNrbcPer100, raw)}
            inputMode="numeric"
          />
        </div>

        <div className="mt-6 rounded-2xl bg-zinc-50 p-5">
          <p className="text-sm font-medium text-zinc-800">Resultado</p>
          <div className="mt-3 rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-600">WBC corrigido (10^3/µL)</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">
              {wbcCorr == null ? "—" : formatInt(wbcCorr)}
            </p>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            Fórmula: WBC corrigido = WBC × 100 / (100 + nRBC/100 WBC).
          </p>
        </div>
      </section>
    </div>
  );
}
