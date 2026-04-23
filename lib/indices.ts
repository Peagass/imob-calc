// Banco Central do Brasil — SGS (Sistema Gerenciador de Séries Temporais)
// https://api.bcb.gov.br

export interface IndiceAcumulado {
  valor: number;      // % acumulado 12 meses
  referencia: string; // "abr/2025"
  erro: boolean;
}

interface BCBDado {
  data: string;  // "DD/MM/YYYY"
  valor: string; // taxa como string, ex: "0.83"
}

const MESES_PT = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

function formatarReferencia(dataBCB: string): string {
  const partes = dataBCB.split("/");
  const mes = parseInt(partes[1]) - 1;
  const ano = partes[2];
  return `${MESES_PT[mes]}/${ano}`;
}

async function fetchSGS(serie: number, ultimos: number): Promise<BCBDado[]> {
  const url =
    `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${serie}/dados/ultimos/${ultimos}?formato=json`;
  const res = await fetch(url, {
    next: { revalidate: 21600 }, // cache de 6 horas
  });
  if (!res.ok) throw new Error(`BCB SGS série ${serie}: HTTP ${res.status}`);
  return res.json();
}

// Acumula as taxas mensais dos últimos N meses no período composto
async function calcularAcumulado(serie: number, meses: number = 12): Promise<IndiceAcumulado> {
  try {
    const dados = await fetchSGS(serie, meses);
    if (!dados.length) throw new Error("resposta vazia");

    const fator = dados.reduce(
      (acc, d) => acc * (1 + parseFloat(d.valor) / 100),
      1
    );
    return {
      valor: parseFloat(((fator - 1) * 100).toFixed(2)),
      referencia: formatarReferencia(dados[dados.length - 1].data),
      erro: false,
    };
  } catch {
    return { valor: 0, referencia: "—", erro: true };
  }
}

// ──────────────────────────────────────────────
// Séries SGS utilizadas:
//   189  → IGP-M mensal (FGV) — taxa % ao mês
//   433  → IPCA mensal (IBGE) — taxa % ao mês
//   188  → INPC mensal (IBGE) — taxa % ao mês
//   10764→ IPCA-E mensal (IBGE) — taxa % ao mês
//   432  → Selic acumulada no mês — taxa % ao mês (anualizada aqui)
// ──────────────────────────────────────────────

export interface IndicesReajuste {
  igpm:  IndiceAcumulado;
  ipca:  IndiceAcumulado;
  inpc:  IndiceAcumulado;
  ipcae: IndiceAcumulado;
}

export async function buscarIndicesReajuste(): Promise<IndicesReajuste> {
  const [igpm, ipca, inpc, ipcae] = await Promise.allSettled([
    calcularAcumulado(189),
    calcularAcumulado(433),
    calcularAcumulado(188),
    calcularAcumulado(10764),
  ]);

  const val = (r: PromiseSettledResult<IndiceAcumulado>): IndiceAcumulado =>
    r.status === "fulfilled" ? r.value : { valor: 0, referencia: "—", erro: true };

  return { igpm: val(igpm), ipca: val(ipca), inpc: val(inpc), ipcae: val(ipcae) };
}

export async function buscarSelic(): Promise<IndiceAcumulado> {
  // Série 432: Selic meta (% a.a.) — publicada diariamente pelo BCB.
  // O valor já está anualizado; basta pegar o último dado.
  try {
    const dados = await fetchSGS(432, 1);
    if (!dados.length) throw new Error("resposta vazia");
    return {
      valor: parseFloat(parseFloat(dados[0].valor).toFixed(2)),
      referencia: formatarReferencia(dados[0].data),
      erro: false,
    };
  } catch {
    return { valor: 0, referencia: "—", erro: true };
  }
}
