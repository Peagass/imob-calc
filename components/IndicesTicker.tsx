import IndicesTickerClient, { IndiceTicker } from "./IndicesTickerClient";

interface BCBDado {
  data: string;
  valor: string;
}

async function fetchSGS(serie: number, ultimos: number): Promise<BCBDado[]> {
  try {
    const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${serie}/dados/ultimos/${ultimos}?formato=json`;
    const res = await fetch(url, { next: { revalidate: 21600 } });
    if (!res.ok) return [];
    const text = await res.text();
    if (!text.startsWith("[") && !text.startsWith("{")) return [];
    return JSON.parse(text);
  } catch {
    return [];
  }
}

function acumular12m(dados: BCBDado[]): number | null {
  if (dados.length < 12) return null;
  const ultimos12 = dados.slice(-12);
  const fator = ultimos12.reduce((acc, d) => acc * (1 + parseFloat(d.valor) / 100), 1);
  return parseFloat(((fator - 1) * 100).toFixed(2));
}

function fmt(v: number, decimals = 2): string {
  return v.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function sinal(v: number): string {
  return v >= 0 ? `+${fmt(v)}%` : `${fmt(v)}%`;
}

export const revalidate = 21600;

export default async function IndicesTicker() {
  try {
    const [dadosSelic, dadosIPCA, dadosIPCAE, dadosIGPM, dadosINPC, dadosINCC, dadosTR] =
      await Promise.all([
        fetchSGS(432, 2),    // Selic meta % a.a. (diária)
        fetchSGS(433, 13),   // IPCA mensal
        fetchSGS(10764, 13), // IPCA-E mensal
        fetchSGS(189, 13),   // IGP-M mensal
        fetchSGS(188, 13),   // INPC mensal
        fetchSGS(192, 13),   // INCC-M mensal
        fetchSGS(226, 2),    // TR (período)
      ]);

    const indices: IndiceTicker[] = [];

    // Selic — valor anualizado mais recente
    if (dadosSelic.length >= 1) {
      const atual = parseFloat(dadosSelic[dadosSelic.length - 1].valor);
      const anterior = dadosSelic.length >= 2
        ? parseFloat(dadosSelic[dadosSelic.length - 2].valor)
        : null;
      const diff = anterior !== null && atual !== anterior ? atual - anterior : null;
      indices.push({
        nome: "SELIC",
        valor: `${fmt(atual)}%`,
        periodo: "a.a.",
        variacao: diff !== null ? sinal(diff) : null,
        positivo: diff !== null ? diff > 0 : null,
      });
    }

    // IPCA 12m acumulado
    const ipca12m = acumular12m(dadosIPCA);
    if (ipca12m !== null) {
      const ultimo = dadosIPCA.length > 0
        ? parseFloat(dadosIPCA[dadosIPCA.length - 1].valor)
        : null;
      indices.push({
        nome: "IPCA",
        valor: `${fmt(ipca12m)}%`,
        periodo: "12m",
        variacao: ultimo !== null ? sinal(ultimo) : null,
        positivo: ultimo !== null ? ultimo > 0 : null,
      });
    }

    // IPCA-E 12m
    const ipcae12m = acumular12m(dadosIPCAE);
    if (ipcae12m !== null) {
      const ultimo = dadosIPCAE.length > 0
        ? parseFloat(dadosIPCAE[dadosIPCAE.length - 1].valor)
        : null;
      indices.push({
        nome: "IPCA-E",
        valor: `${fmt(ipcae12m)}%`,
        periodo: "12m",
        variacao: ultimo !== null ? sinal(ultimo) : null,
        positivo: ultimo !== null ? ultimo > 0 : null,
      });
    }

    // IGP-M 12m
    const igpm12m = acumular12m(dadosIGPM);
    if (igpm12m !== null) {
      const ultimo = dadosIGPM.length > 0
        ? parseFloat(dadosIGPM[dadosIGPM.length - 1].valor)
        : null;
      indices.push({
        nome: "IGP-M",
        valor: `${fmt(igpm12m)}%`,
        periodo: "12m",
        variacao: ultimo !== null ? sinal(ultimo) : null,
        positivo: ultimo !== null ? ultimo > 0 : null,
      });
    }

    // INPC 12m
    const inpc12m = acumular12m(dadosINPC);
    if (inpc12m !== null) {
      const ultimo = dadosINPC.length > 0
        ? parseFloat(dadosINPC[dadosINPC.length - 1].valor)
        : null;
      indices.push({
        nome: "INPC",
        valor: `${fmt(inpc12m)}%`,
        periodo: "12m",
        variacao: ultimo !== null ? sinal(ultimo) : null,
        positivo: ultimo !== null ? ultimo > 0 : null,
      });
    }

    // INCC-M 12m
    const incc12m = acumular12m(dadosINCC);
    if (incc12m !== null) {
      const ultimo = dadosINCC.length > 0
        ? parseFloat(dadosINCC[dadosINCC.length - 1].valor)
        : null;
      indices.push({
        nome: "INCC-M",
        valor: `${fmt(incc12m)}%`,
        periodo: "12m",
        variacao: ultimo !== null ? sinal(ultimo) : null,
        positivo: ultimo !== null ? ultimo > 0 : null,
      });
    }

    // TR mensal (valor mais recente)
    if (dadosTR.length >= 1) {
      const atual = parseFloat(dadosTR[dadosTR.length - 1].valor);
      indices.push({
        nome: "TR",
        valor: `${fmt(atual, 4)}%`,
        periodo: "mês",
        variacao: null,
        positivo: null,
      });
    }

    if (indices.length === 0) return null;

    return <IndicesTickerClient indices={indices} />;
  } catch {
    return null;
  }
}
