// ──────────────────────────────────────────────
// 1. CUSTOS TOTAIS DE COMPRA
// ──────────────────────────────────────────────
export interface CustoCompraInput {
  valorImovel: number;
  aliquotaITBI: number; // %
  tipoTransacao: "avista" | "financiado";
}

export interface CustoCompraResult {
  itbi: number;
  escritura: number;
  registro: number;
  avaliacaoBancaria: number;
  total: number;
  percentualTotal: number;
}

export function calcularCustosCompra(input: CustoCompraInput): CustoCompraResult {
  const { valorImovel, aliquotaITBI, tipoTransacao } = input;

  const itbi = valorImovel * (aliquotaITBI / 100);

  // Escritura pública — estimativa baseada nas tabelas cartorárias (média nacional ~1%)
  // Imóveis populares até R$ 140k têm benefícios; acima disso escala
  const escritura = calcularEmolumentosCartorio(valorImovel, "escritura");
  const registro = calcularEmolumentosCartorio(valorImovel, "registro");

  const avaliacaoBancaria = tipoTransacao === "financiado" ? Math.min(Math.max(valorImovel * 0.001, 800), 3500) : 0;

  const total = itbi + escritura + registro + avaliacaoBancaria;
  const percentualTotal = (total / valorImovel) * 100;

  return { itbi, escritura, registro, avaliacaoBancaria, total, percentualTotal };
}

// Tabela simplificada de emolumentos (média nacional — varia por estado)
function calcularEmolumentosCartorio(valor: number, tipo: "escritura" | "registro"): number {
  // Faixas aproximadas baseadas nas tabelas mais comuns
  let taxa = 0;
  if (valor <= 50_000) taxa = 0.8;
  else if (valor <= 100_000) taxa = 0.75;
  else if (valor <= 200_000) taxa = 0.7;
  else if (valor <= 500_000) taxa = 0.65;
  else if (valor <= 1_000_000) taxa = 0.6;
  else taxa = 0.55;

  const base = valor * (taxa / 100);
  // Registro geralmente ~60% do valor da escritura
  return tipo === "escritura" ? base : base * 0.6;
}

// ──────────────────────────────────────────────
// 2. SIMULADOR DE FINANCIAMENTO
// ──────────────────────────────────────────────
export interface FinanciamentoInput {
  valorImovel: number;
  entrada: number;
  prazoMeses: number;
  taxaAnual: number; // % ao ano
  sistema: "SAC" | "PRICE";
}

export interface ParcelaMes {
  mes: number;
  parcela: number;
  amortizacao: number;
  juros: number;
  saldoDevedor: number;
}

export interface FinanciamentoResult {
  valorFinanciado: number;
  primeiraParcela: number;
  ultimaParcela: number;
  totalPago: number;
  totalJuros: number;
  cet: number; // custo efetivo total anual estimado
  parcelas: ParcelaMes[];
}

export function calcularFinanciamento(input: FinanciamentoInput): FinanciamentoResult {
  const { valorImovel, entrada, prazoMeses, taxaAnual, sistema } = input;
  const valorFinanciado = valorImovel - entrada;
  const taxaMensal = taxaAnual / 100 / 12;
  const parcelas: ParcelaMes[] = [];

  if (sistema === "SAC") {
    const amortizacaoFixa = valorFinanciado / prazoMeses;
    let saldo = valorFinanciado;

    for (let mes = 1; mes <= prazoMeses; mes++) {
      const juros = saldo * taxaMensal;
      const parcela = amortizacaoFixa + juros;
      saldo -= amortizacaoFixa;
      parcelas.push({ mes, parcela, amortizacao: amortizacaoFixa, juros, saldoDevedor: Math.max(0, saldo) });
    }
  } else {
    // PRICE — parcela fixa
    const parcela = valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, prazoMeses)) / (Math.pow(1 + taxaMensal, prazoMeses) - 1);
    let saldo = valorFinanciado;

    for (let mes = 1; mes <= prazoMeses; mes++) {
      const juros = saldo * taxaMensal;
      const amortizacao = parcela - juros;
      saldo -= amortizacao;
      parcelas.push({ mes, parcela, amortizacao, juros, saldoDevedor: Math.max(0, saldo) });
    }
  }

  const totalPago = parcelas.reduce((s, p) => s + p.parcela, 0);
  const totalJuros = totalPago - valorFinanciado;
  // CET estimado: adiciona ~0.3% ao ano de IOF/seguros
  const cet = taxaAnual + 0.3;

  return {
    valorFinanciado,
    primeiraParcela: parcelas[0]?.parcela ?? 0,
    ultimaParcela: parcelas[parcelas.length - 1]?.parcela ?? 0,
    totalPago,
    totalJuros,
    cet,
    parcelas,
  };
}

// ──────────────────────────────────────────────
// 3. COMPRAR OU ALUGAR?
// ──────────────────────────────────────────────
export interface ComprarOuAlugarInput {
  valorImovel: number;
  entrada: number;
  taxaFinanciamentoAnual: number; // %
  prazoFinanciamentoAnos: number;
  aluguelMensal: number;
  reajusteAluguelAnual: number; // %
  valorizacaoImovelAnual: number; // %
  rendimentoInvestimentoAnual: number; // % — custo de oportunidade
  anos: number; // horizonte de análise
}

export interface ComprarOuAlugarAnual {
  ano: number;
  patrimonioCompra: number;
  patrimonioAluguel: number;
}

export interface ComprarOuAlugarResult {
  melhorOpcao: "comprar" | "alugar" | "empate";
  diferencaFinal: number;
  evolucao: ComprarOuAlugarAnual[];
  patrimonioFinalCompra: number;
  patrimonioFinalAluguel: number;
  totalPagoFinanciamento: number;
  totalPagoAluguel: number;
  pontoEquilibrio: number | null; // ano em que comprar passa a valer mais
}

export function calcularComprarOuAlugar(input: ComprarOuAlugarInput): ComprarOuAlugarResult {
  const {
    valorImovel,
    entrada,
    taxaFinanciamentoAnual,
    prazoFinanciamentoAnos,
    aluguelMensal,
    reajusteAluguelAnual,
    valorizacaoImovelAnual,
    rendimentoInvestimentoAnual,
    anos,
  } = input;

  const valorFinanciado = valorImovel - entrada;
  const taxaMensal = taxaFinanciamentoAnual / 100 / 12;
  const prazoMeses = prazoFinanciamentoAnos * 12;

  // Parcela PRICE do financiamento
  const parcelaMensal =
    taxaMensal > 0
      ? valorFinanciado * (taxaMensal * Math.pow(1 + taxaMensal, prazoMeses)) / (Math.pow(1 + taxaMensal, prazoMeses) - 1)
      : valorFinanciado / prazoMeses;

  const evolucao: ComprarOuAlugarAnual[] = [];
  let pontoEquilibrio: number | null = null;

  // Cenário COMPRA
  let valorImovelAtual = valorImovel;
  let saldoDevedor = valorFinanciado;
  let totalPagoFinanciamento = entrada;

  // Cenário ALUGUEL — quem aluga investe a entrada + diferença entre parcela e aluguel
  let patrimonioInvestido = entrada; // investe a entrada que não gastou
  let aluguelAtual = aluguelMensal;
  let totalPagoAluguel = 0;

  const taxaInvestMensal = rendimentoInvestimentoAnual / 100 / 12;
  const taxaValorizacaoMensal = valorizacaoImovelAnual / 100 / 12;
  const taxaReajusteAluguelMensal = reajusteAluguelAnual / 100 / 12;

  for (let ano = 1; ano <= anos; ano++) {
    for (let m = 1; m <= 12; m++) {
      // Compra: amortiza financiamento
      if (saldoDevedor > 0) {
        const juros = saldoDevedor * taxaMensal;
        const amortizacao = Math.min(parcelaMensal - juros, saldoDevedor);
        saldoDevedor -= amortizacao;
        totalPagoFinanciamento += parcelaMensal;
      }
      valorImovelAtual *= 1 + taxaValorizacaoMensal;

      // Aluguel: paga aluguel, investe diferença
      const diferencaMensal = Math.max(0, parcelaMensal - aluguelAtual);
      totalPagoAluguel += aluguelAtual;
      patrimonioInvestido = patrimonioInvestido * (1 + taxaInvestMensal) + diferencaMensal;
      aluguelAtual *= 1 + taxaReajusteAluguelMensal;
    }

    const patrimonioCompra = Math.max(0, valorImovelAtual - saldoDevedor);
    const patrimonioAluguel = patrimonioInvestido;

    if (pontoEquilibrio === null && patrimonioCompra > patrimonioAluguel) {
      pontoEquilibrio = ano;
    }

    evolucao.push({ ano, patrimonioCompra, patrimonioAluguel });
  }

  const ultimo = evolucao[evolucao.length - 1];
  const diff = ultimo.patrimonioCompra - ultimo.patrimonioAluguel;

  return {
    melhorOpcao: Math.abs(diff) < valorImovel * 0.02 ? "empate" : diff > 0 ? "comprar" : "alugar",
    diferencaFinal: Math.abs(diff),
    evolucao,
    patrimonioFinalCompra: ultimo.patrimonioCompra,
    patrimonioFinalAluguel: ultimo.patrimonioAluguel,
    totalPagoFinanciamento,
    totalPagoAluguel,
    pontoEquilibrio,
  };
}

// ──────────────────────────────────────────────
// 4. REAJUSTE DE ALUGUEL
// ──────────────────────────────────────────────
export interface ReajusteAluguelInput {
  valorAtual: number;
  indice: "IGP-M" | "IPCA" | "personalizado";
  percentualAcumulado: number; // % acumulado no período
  mesesContrato?: number;
}

export interface ReajusteAluguelResult {
  novoValor: number;
  aumento: number;
  percentualReal: number;
}

export function calcularReajusteAluguel(input: ReajusteAluguelInput): ReajusteAluguelResult {
  const { valorAtual, percentualAcumulado } = input;
  const fator = percentualAcumulado / 100;
  const novoValor = valorAtual * (1 + fator);
  const aumento = novoValor - valorAtual;
  return { novoValor, aumento, percentualReal: percentualAcumulado };
}

// ──────────────────────────────────────────────
// 5. CAP RATE
// ──────────────────────────────────────────────
export interface CapRateInput {
  valorImovel: number;
  aluguelMensal: number;
  despesasMensais: number; // IPTU + condomínio + manutenção (a cargo do proprietário)
  vacanciaPercentual: number; // % de meses vagos por ano (0–100)
}

export interface CapRateResult {
  capRateBruto: number;   // % a.a. — sem descontar despesas nem vacância
  capRateLiquido: number; // % a.a. — descontando despesas e vacância
  receitaAnualBruta: number;
  receitaAnualLiquida: number;
  despesasAnuais: number;
  perdaVacancia: number;
  paybackAnos: number; // tempo para recuperar o investimento com aluguel líquido
}

export function calcularCapRate(input: CapRateInput): CapRateResult {
  const { valorImovel, aluguelMensal, despesasMensais, vacanciaPercentual } = input;

  const receitaAnualBruta = aluguelMensal * 12;
  const fatorOcupacao = 1 - vacanciaPercentual / 100;
  const perdaVacancia = receitaAnualBruta * (vacanciaPercentual / 100);
  const despesasAnuais = despesasMensais * 12;
  const receitaAnualLiquida = receitaAnualBruta * fatorOcupacao - despesasAnuais;

  const capRateBruto = valorImovel > 0 ? (receitaAnualBruta / valorImovel) * 100 : 0;
  const capRateLiquido = valorImovel > 0 ? (receitaAnualLiquida / valorImovel) * 100 : 0;
  const paybackAnos = receitaAnualLiquida > 0 ? valorImovel / receitaAnualLiquida : Infinity;

  return { capRateBruto, capRateLiquido, receitaAnualBruta, receitaAnualLiquida, despesasAnuais, perdaVacancia, paybackAnos };
}

// ──────────────────────────────────────────────
// 6. QUANTO POSSO FINANCIAR?
// ──────────────────────────────────────────────
export interface QuantoPossoFinanciarInput {
  rendaFamiliar: number;
  entradaDisponivel: number;
  taxaAnual: number; // %
  prazoMeses: number;
  percentualComprometimento: number; // default 30
}

export interface QuantoPossoFinanciarResult {
  parcelaMaxima: number;
  valorMaximoFinanciado: number;
  poderDeCompraTotal: number;    // financiado + entrada
  ltvMaximo: number;             // % de financiamento sobre o valor (tipicamente 80%)
  rendaNecessaria: number;       // para a primeira parcela respeitar a regra dos 30%
  entradaNecessaria: number;     // para cobrir os 20% mínimos do poder de compra
}

export function calcularQuantoPossoFinanciar(input: QuantoPossoFinanciarInput): QuantoPossoFinanciarResult {
  const { rendaFamiliar, entradaDisponivel, taxaAnual, prazoMeses, percentualComprometimento } = input;

  const parcelaMaxima = rendaFamiliar * (percentualComprometimento / 100);
  const taxaMensal = taxaAnual / 100 / 12;

  // Inverso da fórmula PRICE: dado o PMT máximo, qual é o PV máximo?
  const valorMaximoFinanciado =
    taxaMensal > 0
      ? parcelaMaxima * (1 - Math.pow(1 + taxaMensal, -prazoMeses)) / taxaMensal
      : parcelaMaxima * prazoMeses;

  // Bancos financiam em geral até 80% do valor (LTV 80%)
  // Então o poder de compra = financiado / 0.80
  const poderDeCompraTotal = valorMaximoFinanciado + entradaDisponivel;
  const ltvMaximo = poderDeCompraTotal > 0 ? (valorMaximoFinanciado / poderDeCompraTotal) * 100 : 0;

  // Entrada mínima de 20% sobre o poder de compra total baseado apenas no financiamento
  const entradaNecessaria = valorMaximoFinanciado * 0.25; // 20% do imóvel = 25% do financiado
  const rendaNecessaria = parcelaMaxima / (percentualComprometimento / 100);

  return { parcelaMaxima, valorMaximoFinanciado, poderDeCompraTotal, ltvMaximo, rendaNecessaria, entradaNecessaria };
}

// ──────────────────────────────────────────────
// 7. GANHO DE CAPITAL E IR NA VENDA
// ──────────────────────────────────────────────
export interface GanhoCapitalInput {
  valorAquisicao: number;
  valorMelhorias: number;      // reformas e benfeitorias com comprovante
  valorVenda: number;
  despesasVenda: number;       // corretagem do vendedor, ITBI do novo comprador não se aplica aqui
  anoMesAquisicao: string;     // formato "YYYY-MM"
  anoMesVenda: string;         // formato "YYYY-MM"
  isUnicoImovelResidencial: boolean;
  semVendaNos5Anos: boolean;
  valorReinvestimento: number; // quanto será reinvestido em outro imóvel residencial em 180 dias
}

export type SituacaoIsencao = "isento_unico_imovel" | "isento_pre_1969" | "tributavel" | "sem_ganho";

export interface GanhoCapitalResult {
  custoAquisicaoAjustado: number;
  ganhoCapitalBruto: number;
  ganhoTributavel: number;     // após fatores de redução
  irDevido: number;
  aliquotaEfetiva: number;     // %
  situacaoIsencao: SituacaoIsencao;
  fr1: number;                 // fator de redução 1 (pré-nov/2005)
  fr2: number;                 // fator de redução 2 (pós-nov/2005)
  mesesPosse: number;
  reducaoReinvestimento: number;
  detalhamentoIR: { faixa: string; base: number; aliquota: number; imposto: number }[];
}

function mesesEntre(de: string, ate: string): number {
  const [anoD, mesD] = de.split("-").map(Number);
  const [anoA, mesA] = ate.split("-").map(Number);
  return (anoA - anoD) * 12 + (mesA - mesD);
}

export function calcularGanhoCapital(input: GanhoCapitalInput): GanhoCapitalResult {
  const {
    valorAquisicao,
    valorMelhorias,
    valorVenda,
    despesasVenda,
    anoMesAquisicao,
    anoMesVenda,
    isUnicoImovelResidencial,
    semVendaNos5Anos,
    valorReinvestimento,
  } = input;

  const NOV_2005 = "2005-11";
  const custoAquisicaoAjustado = valorAquisicao + valorMelhorias;
  const ganhoCapitalBruto = Math.max(0, valorVenda - despesasVenda - custoAquisicaoAjustado);
  const mesesPosse = Math.max(0, mesesEntre(anoMesAquisicao, anoMesVenda));

  // Sem ganho → sem imposto
  if (ganhoCapitalBruto <= 0) {
    return { custoAquisicaoAjustado, ganhoCapitalBruto: 0, ganhoTributavel: 0, irDevido: 0, aliquotaEfetiva: 0, situacaoIsencao: "sem_ganho", fr1: 1, fr2: 1, mesesPosse, reducaoReinvestimento: 0, detalhamentoIR: [] };
  }

  // Isenção: único imóvel residencial até R$ 440.000 sem venda nos últimos 5 anos
  if (isUnicoImovelResidencial && semVendaNos5Anos && valorVenda <= 440_000) {
    return { custoAquisicaoAjustado, ganhoCapitalBruto, ganhoTributavel: 0, irDevido: 0, aliquotaEfetiva: 0, situacaoIsencao: "isento_unico_imovel", fr1: 1, fr2: 1, mesesPosse, reducaoReinvestimento: 0, detalhamentoIR: [] };
  }

  // Isenção: adquirido antes de 1969
  const anoAquisicao = parseInt(anoMesAquisicao.split("-")[0]);
  if (anoAquisicao < 1969) {
    return { custoAquisicaoAjustado, ganhoCapitalBruto, ganhoTributavel: 0, irDevido: 0, aliquotaEfetiva: 0, situacaoIsencao: "isento_pre_1969", fr1: 1, fr2: 1, mesesPosse, reducaoReinvestimento: 0, detalhamentoIR: [] };
  }

  // Fatores de redução
  let fr1 = 1;
  let fr2 = 1;

  if (anoMesAquisicao < NOV_2005) {
    const n1 = Math.max(0, mesesEntre(anoMesAquisicao, NOV_2005));
    fr1 = Math.max(0, 1 - 0.005 * n1);
    const n2 = Math.max(0, mesesEntre(NOV_2005, anoMesVenda));
    fr2 = Math.max(0, 1 - 0.0035 * n2);
  } else {
    const n2 = Math.max(0, mesesEntre(anoMesAquisicao, anoMesVenda));
    fr2 = Math.max(0, 1 - 0.0035 * n2);
  }

  let ganhoTributavel = ganhoCapitalBruto * fr1 * fr2;

  // Redução por reinvestimento em imóvel residencial (proporcional ao valor reinvestido)
  let reducaoReinvestimento = 0;
  if (isUnicoImovelResidencial && valorReinvestimento > 0) {
    const proporcao = Math.min(1, valorReinvestimento / valorVenda);
    reducaoReinvestimento = ganhoTributavel * proporcao;
    ganhoTributavel = Math.max(0, ganhoTributavel - reducaoReinvestimento);
  }

  // Alíquotas progressivas (Lei 13.259/2016)
  const faixas = [
    { limite: 5_000_000, aliquota: 0.15, label: "Até R$ 5 milhões" },
    { limite: 10_000_000, aliquota: 0.175, label: "R$ 5M a R$ 10M" },
    { limite: 30_000_000, aliquota: 0.20, label: "R$ 10M a R$ 30M" },
    { limite: Infinity, aliquota: 0.225, label: "Acima de R$ 30M" },
  ];

  let irDevido = 0;
  let baseRestante = ganhoTributavel;
  let limiteAnterior = 0;
  const detalhamentoIR: GanhoCapitalResult["detalhamentoIR"] = [];

  for (const faixa of faixas) {
    if (baseRestante <= 0) break;
    const baseNaFaixa = Math.min(baseRestante, faixa.limite - limiteAnterior);
    const impostoFaixa = baseNaFaixa * faixa.aliquota;
    if (baseNaFaixa > 0) {
      detalhamentoIR.push({ faixa: faixa.label, base: baseNaFaixa, aliquota: faixa.aliquota * 100, imposto: impostoFaixa });
    }
    irDevido += impostoFaixa;
    baseRestante -= baseNaFaixa;
    limiteAnterior = faixa.limite;
  }

  const aliquotaEfetiva = ganhoCapitalBruto > 0 ? (irDevido / ganhoCapitalBruto) * 100 : 0;

  return { custoAquisicaoAjustado, ganhoCapitalBruto, ganhoTributavel, irDevido, aliquotaEfetiva, situacaoIsencao: "tributavel", fr1, fr2, mesesPosse, reducaoReinvestimento, detalhamentoIR };
}

// ──────────────────────────────────────────────
// 8. AMORTIZAÇÃO EXTRAORDINÁRIA
// ──────────────────────────────────────────────
export interface AmortizacaoExtraInput {
  saldoDevedor: number;
  taxaAnual: number;
  prazoRestanteMeses: number;
  sistema: "SAC" | "PRICE";
  tipoExtra: "mensal" | "unico";
  valorExtra: number;
  modalidadeUnico?: "reduzir_prazo" | "reduzir_parcela";
}

export interface AmortizacaoExtraResult {
  // Cenário original
  parcelaAtual: number;
  totalJurosOriginal: number;
  totalPagoOriginal: number;
  // Cenário com extra
  prazoNovo: number;
  parcelaNova: number | null; // null = parcela variável (SAC mensal)
  totalJurosNovo: number;
  totalPagoNovo: number;
  // Economia
  mesesEconomizados: number;
  jurosEconomizados: number;
  totalEconomizado: number;
}

function pmtPrice(taxa: number, n: number, pv: number): number {
  if (taxa === 0) return pv / n;
  return pv * (taxa * Math.pow(1 + taxa, n)) / (Math.pow(1 + taxa, n) - 1);
}

function simularComExtra(
  saldo: number,
  taxa: number,
  prazo: number,
  sistema: "SAC" | "PRICE",
  extraMensal: number,
): { meses: number; totalJuros: number; totalPago: number } {
  const parcelaBase = sistema === "PRICE" ? pmtPrice(taxa, prazo, saldo) : saldo / prazo;
  let s = saldo;
  let meses = 0;
  let totalJuros = 0;
  let totalPago = 0;
  const MAX = prazo * 2;

  while (s > 0.01 && meses < MAX) {
    const juros = s * taxa;
    const amort = sistema === "PRICE"
      ? Math.min(parcelaBase - juros + extraMensal, s)
      : Math.min(parcelaBase + extraMensal, s);
    const parcela = amort + juros;
    totalJuros += juros;
    totalPago += parcela;
    s -= amort;
    meses++;
  }
  return { meses, totalJuros, totalPago };
}

export function calcularAmortizacaoExtra(input: AmortizacaoExtraInput): AmortizacaoExtraResult {
  const { saldoDevedor, taxaAnual, prazoRestanteMeses, sistema, tipoExtra, valorExtra, modalidadeUnico } = input;
  const taxa = taxaAnual / 100 / 12;

  // Cenário original (sem extra)
  const parcelaAtual = sistema === "PRICE"
    ? pmtPrice(taxa, prazoRestanteMeses, saldoDevedor)
    : saldoDevedor / prazoRestanteMeses + saldoDevedor * taxa;
  const origSim = simularComExtra(saldoDevedor, taxa, prazoRestanteMeses, sistema, 0);
  const totalJurosOriginal = origSim.totalJuros;
  const totalPagoOriginal = origSim.totalPago;

  let prazoNovo: number;
  let parcelaNova: number | null = null;
  let totalJurosNovo: number;
  let totalPagoNovo: number;

  if (tipoExtra === "mensal") {
    const sim = simularComExtra(saldoDevedor, taxa, prazoRestanteMeses, sistema, valorExtra);
    prazoNovo = sim.meses;
    totalJurosNovo = sim.totalJuros;
    totalPagoNovo = sim.totalPago;
  } else {
    // Amortização única
    const novoSaldo = Math.max(0, saldoDevedor - valorExtra);
    if (modalidadeUnico === "reduzir_parcela") {
      // Mesmo prazo, parcela menor
      prazoNovo = prazoRestanteMeses;
      parcelaNova = sistema === "PRICE"
        ? pmtPrice(taxa, prazoRestanteMeses, novoSaldo)
        : novoSaldo / prazoRestanteMeses + novoSaldo * taxa;
      const sim = simularComExtra(novoSaldo, taxa, prazoRestanteMeses, sistema, 0);
      totalJurosNovo = sim.totalJuros;
      totalPagoNovo = sim.totalPago + valorExtra;
    } else {
      // Mesma parcela, prazo menor
      const sim = simularComExtra(novoSaldo, taxa, prazoRestanteMeses, sistema, 0);
      prazoNovo = sim.meses;
      totalJurosNovo = sim.totalJuros;
      totalPagoNovo = sim.totalPago + valorExtra;
    }
  }

  return {
    parcelaAtual,
    totalJurosOriginal,
    totalPagoOriginal,
    prazoNovo,
    parcelaNova,
    totalJurosNovo,
    totalPagoNovo,
    mesesEconomizados: Math.max(0, prazoRestanteMeses - prazoNovo),
    jurosEconomizados: Math.max(0, totalJurosOriginal - totalJurosNovo),
    totalEconomizado: Math.max(0, totalPagoOriginal - totalPagoNovo),
  };
}

// ──────────────────────────────────────────────
// 9. PORTABILIDADE DE FINANCIAMENTO
// ──────────────────────────────────────────────
export interface PortabilidadeInput {
  saldoDevedor: number;
  prazoRestanteMeses: number;
  taxaAtualAnual: number;
  taxaNovaAnual: number;
  custosPortabilidade: number;
}

export interface PortabilidadeResult {
  parcelaAtual: number;
  parcelaNova: number;
  economiaMensal: number;
  totalPagoAtual: number;
  totalPagoNovo: number;
  economiaTotal: number;
  economiaLiquida: number;
  mesesParaEquilibrio: number | null;
  valeAPena: boolean;
}

export function calcularPortabilidade(input: PortabilidadeInput): PortabilidadeResult {
  const { saldoDevedor, prazoRestanteMeses, taxaAtualAnual, taxaNovaAnual, custosPortabilidade } = input;
  const taxaAtual = taxaAtualAnual / 100 / 12;
  const taxaNova = taxaNovaAnual / 100 / 12;

  const parcelaAtual = pmtPrice(taxaAtual, prazoRestanteMeses, saldoDevedor);
  const parcelaNova = pmtPrice(taxaNova, prazoRestanteMeses, saldoDevedor);

  const totalPagoAtual = parcelaAtual * prazoRestanteMeses;
  const totalPagoNovo = parcelaNova * prazoRestanteMeses + custosPortabilidade;
  const economiaTotal = totalPagoAtual - parcelaNova * prazoRestanteMeses;
  const economiaLiquida = economiaTotal - custosPortabilidade;
  const economiaMensal = parcelaAtual - parcelaNova;

  const mesesParaEquilibrio = economiaMensal > 0
    ? Math.ceil(custosPortabilidade / economiaMensal)
    : null;

  return {
    parcelaAtual,
    parcelaNova,
    economiaMensal,
    totalPagoAtual,
    totalPagoNovo,
    economiaTotal,
    economiaLiquida,
    mesesParaEquilibrio,
    valeAPena: economiaLiquida > 0,
  };
}

// ──────────────────────────────────────────────
// 10. AIRBNB VS. ALUGUEL CONVENCIONAL
// ──────────────────────────────────────────────
export interface AirbnbInput {
  diaria: number;
  ocupacaoPercentual: number;
  taxaPlataforma: number;
  custosOperacionaisMensais: number;
  aluguelConvencional: number;
  despesasFixasMensais: number;
}

export interface AirbnbResult {
  receitaBrutaMensal: number;
  receitaAposTaxaMensal: number;
  receitaLiquidaMensal: number;
  aluguelLiquidoMensal: number;
  diferencaMensal: number;
  receitaLiquidaAnual: number;
  aluguelLiquidoAnual: number;
  diferencaAnual: number;
  ocupacaoBreakeven: number;
  melhor: "airbnb" | "aluguel" | "empate";
}

export function calcularAirbnb(input: AirbnbInput): AirbnbResult {
  const { diaria, ocupacaoPercentual, taxaPlataforma, custosOperacionaisMensais, aluguelConvencional, despesasFixasMensais } = input;

  const diasMes = 30;
  const diasOcupados = diasMes * (ocupacaoPercentual / 100);
  const receitaBrutaMensal = diaria * diasOcupados;
  const receitaAposTaxaMensal = receitaBrutaMensal * (1 - taxaPlataforma / 100);
  const receitaLiquidaMensal = receitaAposTaxaMensal - custosOperacionaisMensais - despesasFixasMensais;
  const aluguelLiquidoMensal = aluguelConvencional - despesasFixasMensais;
  const diferencaMensal = receitaLiquidaMensal - aluguelLiquidoMensal;

  // break-even: (diaria × 30 × ocp × (1 - taxa)) - custos_op - despesas = aluguel - despesas
  // ocp_be = (aluguel + custos_op) / (diaria × 30 × (1 - taxa/100))
  const denominador = diaria * diasMes * (1 - taxaPlataforma / 100);
  const ocupacaoBreakeven = denominador > 0
    ? ((aluguelConvencional + custosOperacionaisMensais) / denominador) * 100
    : 100;

  return {
    receitaBrutaMensal,
    receitaAposTaxaMensal,
    receitaLiquidaMensal,
    aluguelLiquidoMensal,
    diferencaMensal,
    receitaLiquidaAnual: receitaLiquidaMensal * 12,
    aluguelLiquidoAnual: aluguelLiquidoMensal * 12,
    diferencaAnual: diferencaMensal * 12,
    ocupacaoBreakeven: Math.min(100, Math.max(0, ocupacaoBreakeven)),
    melhor: Math.abs(diferencaMensal) < 50 ? "empate" : diferencaMensal > 0 ? "airbnb" : "aluguel",
  };
}

// ──────────────────────────────────────────────
// 11. MULTA POR RESCISÃO ANTECIPADA
// ──────────────────────────────────────────────
export interface RescisaoInput {
  aluguelMensal: number;
  mesesMultaContratual: number;    // padrão 3, conforme Lei do Inquilinato
  prazoTotalMeses: number;
  mesesCumpridos: number;
  motivoTransferencia: boolean;    // transferência pelo empregador → isento (Art. 4º, §único)
}

export interface RescisaoResult {
  multaCheia: number;
  multaProporcional: number;
  mesesRestantes: number;
  percentualCumprido: number;
  isento: boolean;
  avisoPrevioNecessario: number;   // dias
}

export function calcularRescisao(input: RescisaoInput): RescisaoResult {
  const { aluguelMensal, mesesMultaContratual, prazoTotalMeses, mesesCumpridos, motivoTransferencia } = input;

  const mesesRestantes = Math.max(0, prazoTotalMeses - mesesCumpridos);
  const percentualCumprido = prazoTotalMeses > 0 ? (mesesCumpridos / prazoTotalMeses) * 100 : 100;
  const multaCheia = aluguelMensal * mesesMultaContratual;

  // Multa proporcional = multa_cheia × (meses_restantes / prazo_total)
  const multaProporcional = prazoTotalMeses > 0
    ? multaCheia * (mesesRestantes / prazoTotalMeses)
    : 0;

  const isento = motivoTransferencia || mesesRestantes === 0;

  return {
    multaCheia,
    multaProporcional: isento ? 0 : multaProporcional,
    mesesRestantes,
    percentualCumprido,
    isento,
    avisoPrevioNecessario: motivoTransferencia ? 30 : 0,
  };
}

// ──────────────────────────────────────────────
// 12. IMÓVEL VS. RENDA FIXA
// ──────────────────────────────────────────────
export interface ImovelVsRendaFixaInput {
  valorImovel: number;
  tipoCompra: "avista" | "financiado";
  entrada: number;
  taxaFinanciamento: number; // % a.a.
  prazoFinanciamento: number; // meses
  aluguelMensalEstimado: number;
  valorizacaoAnual: number; // % a.a.
  despesasAnuaisImovel: number;
  vacanciaPercentual: number;
  taxaRendaFixa: number; // % a.a. (CDI/Selic)
  horizonte: number; // anos
}

export interface ImovelVsRendaFixaResult {
  patrimonioFinalImovel: number;
  patrimonioFinalRendaFixa: number;
  retornoImovelAA: number;
  retornoRendaFixaAA: number;
  melhor: "imovel" | "renda_fixa" | "empate";
  diferenca: number;
  rendaAluguelTotalLiquida: number;
  valorizacaoTotal: number;
  evolucao: { ano: number; imovel: number; rendaFixa: number }[];
}

export function calcularImovelVsRendaFixa(input: ImovelVsRendaFixaInput): ImovelVsRendaFixaResult {
  const {
    valorImovel, tipoCompra, entrada, taxaFinanciamento, prazoFinanciamento,
    aluguelMensalEstimado, valorizacaoAnual, despesasAnuaisImovel, vacanciaPercentual,
    taxaRendaFixa, horizonte,
  } = input;

  const capitalInicial = tipoCompra === "avista" ? valorImovel : entrada;
  const valorFinanciado = tipoCompra === "avista" ? 0 : Math.max(0, valorImovel - entrada);
  const taxaMensal = taxaFinanciamento / 100 / 12;
  const parcelaMensal = valorFinanciado > 0 ? pmtPrice(taxaMensal, prazoFinanciamento, valorFinanciado) : 0;
  const taxaRFMensal = taxaRendaFixa / 100 / 12;
  const taxaValorMensal = valorizacaoAnual / 100 / 12;
  const fatorOcupacao = 1 - vacanciaPercentual / 100;

  let valorImovelAtual = valorImovel;
  let saldoDevedor = valorFinanciado;
  let rendaAcumulada = 0;
  let patrimonioRendaFixa = capitalInicial;
  const evolucao: ImovelVsRendaFixaResult["evolucao"] = [];

  for (let mes = 1; mes <= horizonte * 12; mes++) {
    valorImovelAtual *= 1 + taxaValorMensal;

    const rendaLiquidaMes = aluguelMensalEstimado * fatorOcupacao - despesasAnuaisImovel / 12;
    rendaAcumulada += Math.max(0, rendaLiquidaMes);

    if (saldoDevedor > 0) {
      const juros = saldoDevedor * taxaMensal;
      const amort = Math.min(parcelaMensal - juros, saldoDevedor);
      saldoDevedor = Math.max(0, saldoDevedor - amort);
    }

    patrimonioRendaFixa *= 1 + taxaRFMensal;

    if (mes % 12 === 0) {
      const equity = Math.max(0, valorImovelAtual - saldoDevedor);
      evolucao.push({ ano: mes / 12, imovel: equity + rendaAcumulada, rendaFixa: patrimonioRendaFixa });
    }
  }

  const patrimonioFinalImovel = Math.max(0, valorImovelAtual - saldoDevedor) + rendaAcumulada;
  const retornoImovelAA = capitalInicial > 0
    ? (Math.pow(patrimonioFinalImovel / capitalInicial, 1 / horizonte) - 1) * 100 : 0;
  const retornoRendaFixaAA = capitalInicial > 0
    ? (Math.pow(patrimonioRendaFixa / capitalInicial, 1 / horizonte) - 1) * 100 : 0;

  return {
    patrimonioFinalImovel,
    patrimonioFinalRendaFixa: patrimonioRendaFixa,
    retornoImovelAA,
    retornoRendaFixaAA,
    melhor: Math.abs(patrimonioFinalImovel - patrimonioRendaFixa) < capitalInicial * 0.05
      ? "empate" : patrimonioFinalImovel > patrimonioRendaFixa ? "imovel" : "renda_fixa",
    diferenca: Math.abs(patrimonioFinalImovel - patrimonioRendaFixa),
    rendaAluguelTotalLiquida: rendaAcumulada,
    valorizacaoTotal: valorImovelAtual - valorImovel,
    evolucao,
  };
}

// ──────────────────────────────────────────────
// 13. ESTIMATIVA DE REFORMA
// ──────────────────────────────────────────────
export type PadraoReforma = "simples" | "medio" | "alto";
export type TipoReforma = "pintura" | "acabamento" | "completa";

export interface EstimativaReformaInput {
  areaM2: number;
  tipo: TipoReforma;
  padrao: PadraoReforma;
  numBanheiros: number;
  numCozinhas: number;
  incluiAreaExterna: boolean;
  areaExternaM2: number;
}

export interface EstimativaReformaResult {
  custoTotal: number;
  custoMin: number;
  custoMax: number;
  custoM2: number;
  detalhamento: { item: string; custo: number }[];
}

const REFORMA_AREA: Record<TipoReforma, Record<PadraoReforma, [number, number]>> = {
  pintura:    { simples: [20, 35],   medio: [40, 60],    alto: [65, 100] },
  acabamento: { simples: [350, 550], medio: [600, 900],  alto: [1000, 2000] },
  completa:   { simples: [1000, 1600], medio: [1700, 2800], alto: [3000, 5500] },
};
// Custos por cômodo variam conforme o TIPO de reforma (pintura é só as paredes)
const REFORMA_BANHEIRO: Record<TipoReforma, Record<PadraoReforma, [number, number]>> = {
  pintura:    { simples: [200, 400],    medio: [350, 650],    alto: [600, 1100] },
  acabamento: { simples: [4000, 7000],  medio: [8000, 15000], alto: [18000, 40000] },
  completa:   { simples: [9000, 16000], medio: [16000, 32000], alto: [35000, 80000] },
};
const REFORMA_COZINHA: Record<TipoReforma, Record<PadraoReforma, [number, number]>> = {
  pintura:    { simples: [300, 600],    medio: [500, 950],    alto: [800, 1600] },
  acabamento: { simples: [6000, 10000], medio: [12000, 22000], alto: [25000, 60000] },
  completa:   { simples: [15000, 26000], medio: [26000, 52000], alto: [60000, 150000] },
};

export function calcularEstimativaReforma(input: EstimativaReformaInput): EstimativaReformaResult {
  const { areaM2, tipo, padrao, numBanheiros, numCozinhas, incluiAreaExterna, areaExternaM2 } = input;

  const [minM2, maxM2] = REFORMA_AREA[tipo][padrao];
  const custoAreaMin = areaM2 * minM2;
  const custoAreaMax = areaM2 * maxM2;

  const [minBan, maxBan] = REFORMA_BANHEIRO[tipo][padrao];
  const custoBan = numBanheiros * (minBan + maxBan) / 2;
  const custoBanMin = numBanheiros * minBan;
  const custoBanMax = numBanheiros * maxBan;

  const [minCoz, maxCoz] = REFORMA_COZINHA[tipo][padrao];
  const custoCoz = numCozinhas * (minCoz + maxCoz) / 2;
  const custoCozMin = numCozinhas * minCoz;
  const custoCozMax = numCozinhas * maxCoz;

  // Área externa: 85% do custo/m² da área interna (semelhante, mas sem infraestrutura interna)
  const custoExtMin = incluiAreaExterna ? areaExternaM2 * minM2 * 0.85 : 0;
  const custoExtMax = incluiAreaExterna ? areaExternaM2 * maxM2 * 0.85 : 0;
  const custoExt = (custoExtMin + custoExtMax) / 2;

  const custoMin = custoAreaMin + custoBanMin + custoCozMin + custoExtMin;
  const custoMax = custoAreaMax + custoBanMax + custoCozMax + custoExtMax;
  const custoTotal = (custoMin + custoMax) / 2;
  const custoM2 = areaM2 > 0 ? custoTotal / areaM2 : 0;

  const detalhamento: EstimativaReformaResult["detalhamento"] = [
    { item: `Área principal (${areaM2} m²)`, custo: (custoAreaMin + custoAreaMax) / 2 },
  ];
  if (numBanheiros > 0) detalhamento.push({ item: `${numBanheiros} banheiro${numBanheiros > 1 ? "s" : ""}`, custo: custoBan });
  if (numCozinhas > 0) detalhamento.push({ item: `${numCozinhas} cozinha${numCozinhas > 1 ? "s" : ""}`, custo: custoCoz });
  if (incluiAreaExterna && areaExternaM2 > 0) detalhamento.push({ item: `Área externa (${areaExternaM2} m²)`, custo: custoExt });

  return { custoTotal, custoMin, custoMax, custoM2, detalhamento };
}

// ──────────────────────────────────────────────
// 14. LUCRO LÍQUIDO NA VENDA
// ──────────────────────────────────────────────
export interface LucroVendaInput {
  valorCompra: number;
  custoAquisicao: number; // ITBI + cartório + avaliação na época
  valorMelhorias: number;
  valorVenda: number;
  percentualCorretagem: number; // padrão 6%
  outrosCustosVenda: number;
}

export interface LucroVendaResult {
  custoTotal: number;
  ganhoCapitalBruto: number;
  corretagem: number;
  lucroLiquido: number;
  roi: number; // % sobre custo total
  roiAA: number; // seria necessário anos, calculamos sem prazo — será 0
  detalhamento: { item: string; valor: number }[];
}

export function calcularLucroVenda(input: LucroVendaInput): LucroVendaResult {
  const { valorCompra, custoAquisicao, valorMelhorias, valorVenda, percentualCorretagem, outrosCustosVenda } = input;

  const custoTotal = valorCompra + custoAquisicao + valorMelhorias;
  const corretagem = valorVenda * (percentualCorretagem / 100);
  const ganhoCapitalBruto = Math.max(0, valorVenda - corretagem - outrosCustosVenda - custoTotal);
  const lucroLiquido = valorVenda - corretagem - outrosCustosVenda - custoTotal;
  const roi = custoTotal > 0 ? (lucroLiquido / custoTotal) * 100 : 0;

  const detalhamento: LucroVendaResult["detalhamento"] = [
    { item: "Valor de compra", valor: -valorCompra },
    { item: "Custos de aquisição (ITBI + cartório)", valor: -custoAquisicao },
    { item: "Melhorias e reformas", valor: -valorMelhorias },
    { item: "Valor de venda", valor: valorVenda },
    { item: `Corretagem (${percentualCorretagem}%)`, valor: -corretagem },
    { item: "Outros custos de venda", valor: -outrosCustosVenda },
  ];

  return { custoTotal, ganhoCapitalBruto, corretagem, lucroLiquido, roi, roiAA: 0, detalhamento };
}

// ──────────────────────────────────────────────
// 15. RETORNO DA REFORMA ANTES DA VENDA
// ──────────────────────────────────────────────
export interface RetornoReformaInput {
  valorAtualImovel: number;
  custoReforma: number;
  valorEstimadoAposReforma: number;
  percentualCorretagem: number;
  mesesAteVenda: number;
  custoOportunidade: number; // % a.a. — quanto o capital da reforma renderia em renda fixa
}

export interface RetornoReformaResult {
  valorizacaoBruta: number;
  lucroSemReforma: number;
  lucroComReforma: number;
  ganhoReforma: number;
  roi: number; // % sobre custo da reforma
  roiAA: number;
  custoOportunidadeReforma: number;
  ganhoLiquidoVsOportunidade: number;
  valeAPena: boolean;
}

export function calcularRetornoReforma(input: RetornoReformaInput): RetornoReformaResult {
  const { valorAtualImovel, custoReforma, valorEstimadoAposReforma, percentualCorretagem, mesesAteVenda, custoOportunidade } = input;

  const corretagem = percentualCorretagem / 100;
  const lucroSemReforma = valorAtualImovel * (1 - corretagem) - valorAtualImovel;
  const lucroComReforma = valorEstimadoAposReforma * (1 - corretagem) - valorAtualImovel - custoReforma;
  const valorAposCorretagem = valorEstimadoAposReforma * (1 - corretagem);
  const valorizacaoBruta = valorEstimadoAposReforma - valorAtualImovel;
  const ganhoReforma = valorAposCorretagem - valorAtualImovel * (1 - corretagem) - custoReforma;

  const roi = custoReforma > 0 ? (ganhoReforma / custoReforma) * 100 : 0;
  const anos = mesesAteVenda / 12;
  const roiAA = anos > 0 && roi > -100 ? (Math.pow(1 + roi / 100, 1 / anos) - 1) * 100 : 0;

  // Custo de oportunidade: o que o dinheiro da reforma renderia em renda fixa
  const custoOportunidadeReforma = custoReforma > 0
    ? custoReforma * (Math.pow(1 + custoOportunidade / 100, anos) - 1)
    : 0;

  const ganhoLiquidoVsOportunidade = ganhoReforma - custoOportunidadeReforma;

  return {
    valorizacaoBruta,
    lucroSemReforma,
    lucroComReforma,
    ganhoReforma,
    roi,
    roiAA,
    custoOportunidadeReforma,
    ganhoLiquidoVsOportunidade,
    valeAPena: ganhoLiquidoVsOportunidade > 0,
  };
}

// ──────────────────────────────────────────────
// 16. CUSTO DE MUDANÇA
// ──────────────────────────────────────────────
export type TipoServico = "somente_caminhao" | "mao_obra" | "completo";
export type TamanhoMudanca = "pequena" | "media" | "grande";

export interface CustoMudancaInput {
  numComodos: number;
  distanciaKm: number;
  tipoServico: TipoServico;
  andarOrigem: number;
  andarDestino: number;
  temElevador: boolean;
}

export interface CustoMudancaResult {
  custoEstimado: number;
  custoMin: number;
  custoMax: number;
  tamanho: TamanhoMudanca;
  detalhamento: { item: string; custo: number }[];
}

export function calcularCustoMudanca(input: CustoMudancaInput): CustoMudancaResult {
  const { numComodos, distanciaKm, tipoServico, andarOrigem, andarDestino, temElevador } = input;

  const tamanho: TamanhoMudanca = numComodos <= 2 ? "pequena" : numComodos <= 4 ? "media" : "grande";

  // Base cost table [min, max] por tamanho e distância
  const baseCosts: Record<TamanhoMudanca, { local: [number, number]; media: [number, number]; longa: [number, number] }> = {
    pequena: { local: [800, 1500],   media: [1800, 3500],   longa: [3000, 6000] },
    media:   { local: [1800, 3200],  media: [3500, 6000],   longa: [6000, 11000] },
    grande:  { local: [3500, 6000],  media: [6000, 12000],  longa: [11000, 20000] },
  };
  const faixaDist = distanciaKm <= 50 ? "local" : distanciaKm <= 200 ? "media" : "longa";
  const [minBase, maxBase] = baseCosts[tamanho][faixaDist];

  // Serviço multiplier
  const multServico: Record<TipoServico, number> = {
    somente_caminhao: 0.6,
    mao_obra: 1.0,
    completo: 1.45,
  };
  const mult = multServico[tipoServico];

  // Andar surcharge sem elevador (R$ 150/andar acima do térreo para carga)
  const andarSurcharge = !temElevador
    ? (Math.max(0, andarOrigem - 1) + Math.max(0, andarDestino - 1)) * 150 : 0;

  const custoMin = Math.round(minBase * mult) + andarSurcharge;
  const custoMax = Math.round(maxBase * mult) + andarSurcharge;
  const custoEstimado = Math.round((custoMin + custoMax) / 2);

  const detalhamento: CustoMudancaResult["detalhamento"] = [
    { item: `Frete (${tamanho}, ${faixaDist})`, custo: Math.round((minBase + maxBase) / 2 * mult) },
  ];
  if (andarSurcharge > 0) {
    detalhamento.push({ item: `Escada (andares sem elevador)`, custo: andarSurcharge });
  }

  return { custoEstimado, custoMin, custoMax, tamanho, detalhamento };
}

// ──────────────────────────────────────────────
// 17. SIMULADOR DE FGTS
// ──────────────────────────────────────────────
export interface FGTSInput {
  salarioBruto: number;
  mesesContribuicao: number; // tempo total de FGTS já acumulado
  saldoAtual: number;
  mesesParaProjetar: number;
  usarParaHabitacao: boolean;
  valorImovelPretendido: number;
}

export interface FGTSResult {
  saldoProjetado: number;
  depositosMensais: number;
  rendimentoTotal: number;
  totalDepositado: number;
  elegibilidadeHabitacao: boolean;
  limiteUsoHabitacao: number; // % do valor do imóvel que pode ser usado (até 80%)
  fgtsParaEntrada: number; // quanto pode usar
  detalhamento: { mes: number; deposito: number; rendimento: number; saldo: number }[];
}

export function calcularFGTS(input: FGTSInput): FGTSResult {
  const { salarioBruto, mesesContribuicao, saldoAtual, mesesParaProjetar, usarParaHabitacao, valorImovelPretendido } = input;

  const depositoMensal = salarioBruto * 0.08;
  // FGTS rende TR + 3% a.a. — TR ≈ 0.1% a.m. recentemente, simplificamos como 3% a.a. = 0.2466% a.m.
  const taxaMensal = Math.pow(1 + 0.03, 1 / 12) - 1;

  let saldo = saldoAtual;
  let totalDepositado = 0;
  let rendimentoTotal = 0;
  const detalhamento: FGTSResult["detalhamento"] = [];

  for (let mes = 1; mes <= Math.min(mesesParaProjetar, 360); mes++) {
    const rendimento = saldo * taxaMensal;
    saldo = saldo + rendimento + depositoMensal;
    totalDepositado += depositoMensal;
    rendimentoTotal += rendimento;
    if (mes % 12 === 0 || mes === mesesParaProjetar) {
      detalhamento.push({ mes, deposito: totalDepositado, rendimento: rendimentoTotal, saldo });
    }
  }

  // Elegibilidade para habitação: 3 anos de FGTS (não necessariamente na mesma empresa)
  const elegibilidadeHabitacao = (mesesContribuicao + mesesParaProjetar) >= 36;

  // FGTS pode ser usado para até 80% do valor do imóvel em SFH (sistema financeiro habitacional)
  // O saldo disponível para uso é o saldo projetado (sem multa pois é uso habitacional)
  const limiteUsoHabitacao = 80; // % do valor do imóvel
  const limiteValorImovel = valorImovelPretendido * 0.80;
  const fgtsParaEntrada = usarParaHabitacao && elegibilidadeHabitacao
    ? Math.min(saldo, limiteValorImovel)
    : 0;

  return {
    saldoProjetado: saldo,
    depositosMensais: depositoMensal,
    rendimentoTotal,
    totalDepositado,
    elegibilidadeHabitacao,
    limiteUsoHabitacao,
    fgtsParaEntrada,
    detalhamento,
  };
}

// ──────────────────────────────────────────────
// 18. QUANTO COBRAR DE ALUGUEL?
// ──────────────────────────────────────────────
export interface QuantoCobrarAluguelInput {
  valorImovel: number;
  retornoDesejadoAnual: number; // % a.a.
  despesasAnuaisProprietario: number; // IPTU, condomínio, etc.
  vacanciaPercentual: number;
}

export interface QuantoCobrarAluguelResult {
  aluguelMinimo: number;      // mínimo para cobrir despesas
  aluguelAlvo: number;        // aluguel para atingir o retorno desejado
  aluguelRecomendado: number; // com margem de negociação
  capRateAlvo: number;        // % a.a. = retornoDesejadoAnual
  capRateResultante: number;  // cap rate real com o aluguel recomendado
  comparacaoMercado: { referencia: string; aluguel: number; capRate: number }[];
}

export function calcularQuantoCobrarAluguel(input: QuantoCobrarAluguelInput): QuantoCobrarAluguelResult {
  const { valorImovel, retornoDesejadoAnual, despesasAnuaisProprietario, vacanciaPercentual } = input;

  const fatorOcupacao = 1 - vacanciaPercentual / 100;

  // Aluguel mínimo: apenas cobre despesas
  const aluguelMinimo = despesasAnuaisProprietario / 12;

  // Aluguel alvo: retorno desejado = (receita_anual_líquida) / valor_imóvel
  // receita_anual_líquida = aluguel × 12 × fatorOcupacao - despesas
  // aluguel = (valorImovel × retorno/100 + despesas) / (12 × fatorOcupacao)
  const aluguelAlvo = fatorOcupacao > 0
    ? (valorImovel * retornoDesejadoAnual / 100 + despesasAnuaisProprietario) / (12 * fatorOcupacao)
    : 0;

  // Recomendado: 10% acima do alvo para dar margem de negociação
  const aluguelRecomendado = aluguelAlvo * 1.10;

  const receita = aluguelRecomendado * 12 * fatorOcupacao;
  const capRateResultante = valorImovel > 0
    ? ((receita - despesasAnuaisProprietario) / valorImovel) * 100 : 0;

  // Benchmarks do mercado (cap rates médios históricos nas principais cidades)
  const comparacaoMercado = [
    { referencia: "Média nacional (residencial)", aluguel: valorImovel * 0.005, capRate: 5.5 },
    { referencia: "São Paulo (capital)", aluguel: valorImovel * 0.0043, capRate: 4.5 },
    { referencia: "Rio de Janeiro", aluguel: valorImovel * 0.005, capRate: 5.2 },
    { referencia: "Interior / outras cidades", aluguel: valorImovel * 0.006, capRate: 6.5 },
  ];

  return {
    aluguelMinimo,
    aluguelAlvo,
    aluguelRecomendado,
    capRateAlvo: retornoDesejadoAnual,
    capRateResultante,
    comparacaoMercado,
  };
}

// ──────────────────────────────────────────────
// 19. FII VS. IMÓVEL FÍSICO
// ──────────────────────────────────────────────
export interface FiiVsImovelInput {
  valorInvestimento: number;
  dividendYieldFII: number; // % a.a. (dividend yield bruto)
  valorizacaoFII: number; // % a.a. (valorização das cotas)
  aluguelMensal: number; // aluguel esperado do imóvel
  despesasAnuaisImovel: number;
  vacanciaPercentual: number;
  valorizacaoImovel: number; // % a.a.
  horizonte: number; // anos
  irFII: number; // % de IR sobre dividendos FII (atualmente isento para PF, mas pode mudar)
}

export interface FiiVsImovelResult {
  // FII
  patrimonioFinalFII: number;
  dividendosTotaisFII: number;
  valorizacaoCotasFII: number;
  retornoFIIAA: number;
  // Imóvel físico
  patrimonioFinalImovel: number;
  rendaAluguelTotal: number;
  valorizacaoImovelTotal: number;
  retornoImovelAA: number;
  // Comparação
  melhor: "fii" | "imovel" | "empate";
  diferenca: number;
  evolucao: { ano: number; fii: number; imovel: number }[];
}

export function calcularFiiVsImovel(input: FiiVsImovelInput): FiiVsImovelResult {
  const {
    valorInvestimento, dividendYieldFII, valorizacaoFII,
    aluguelMensal, despesasAnuaisImovel, vacanciaPercentual,
    valorizacaoImovel, horizonte, irFII,
  } = input;

  const fatorOcupacao = 1 - vacanciaPercentual / 100;
  const dyMensal = dividendYieldFII / 100 / 12;
  const valorizacaoFIIMensal = valorizacaoFII / 100 / 12;
  const valorizacaoImovelMensal = valorizacaoImovel / 100 / 12;

  let cotasFII = valorInvestimento;
  let dividendosAcumulados = 0;
  let valorImovelAtual = valorInvestimento;
  let rendaAluguelAcumulada = 0;
  const evolucao: FiiVsImovelResult["evolucao"] = [];

  for (let mes = 1; mes <= horizonte * 12; mes++) {
    // FII: cotas valorizam + recebem dividendos (reinvestidos)
    const dividendoMes = cotasFII * dyMensal * (1 - irFII / 100);
    dividendosAcumulados += dividendoMes;
    cotasFII = cotasFII * (1 + valorizacaoFIIMensal) + dividendoMes;

    // Imóvel: valoriza + renda de aluguel
    valorImovelAtual *= 1 + valorizacaoImovelMensal;
    const rendaLiquidaMes = aluguelMensal * fatorOcupacao - despesasAnuaisImovel / 12;
    rendaAluguelAcumulada += Math.max(0, rendaLiquidaMes);

    if (mes % 12 === 0) {
      evolucao.push({ ano: mes / 12, fii: cotasFII, imovel: valorImovelAtual + rendaAluguelAcumulada });
    }
  }

  const patrimonioFinalFII = cotasFII;
  const patrimonioFinalImovel = valorImovelAtual + rendaAluguelAcumulada;

  const retornoFIIAA = valorInvestimento > 0
    ? (Math.pow(patrimonioFinalFII / valorInvestimento, 1 / horizonte) - 1) * 100 : 0;
  const retornoImovelAA = valorInvestimento > 0
    ? (Math.pow(patrimonioFinalImovel / valorInvestimento, 1 / horizonte) - 1) * 100 : 0;

  return {
    patrimonioFinalFII,
    dividendosTotaisFII: dividendosAcumulados,
    valorizacaoCotasFII: cotasFII - valorInvestimento - dividendosAcumulados,
    retornoFIIAA,
    patrimonioFinalImovel,
    rendaAluguelTotal: rendaAluguelAcumulada,
    valorizacaoImovelTotal: valorImovelAtual - valorInvestimento,
    retornoImovelAA,
    melhor: Math.abs(patrimonioFinalFII - patrimonioFinalImovel) < valorInvestimento * 0.05
      ? "empate" : patrimonioFinalFII > patrimonioFinalImovel ? "fii" : "imovel",
    diferenca: Math.abs(patrimonioFinalFII - patrimonioFinalImovel),
    evolucao,
  };
}

// ──────────────────────────────────────────────
// 20. SEGURO FIANÇA VS. CAUÇÃO VS. FIADOR
// ──────────────────────────────────────────────
export interface SeguroFiancaInput {
  aluguelMensal: number;
  prazoContrato: number; // meses
  // Seguro fiança
  mesesSeguroFianca: number; // custo = N meses de aluguel (prêmio anual típico: 1–1.5 mês)
  // Caução
  mesesCaucao: number; // depósito (máx 3 meses por lei)
  taxaInvestimento: number; // % a.a. — rendimento alternativo que o inquilino perde
  // Fiador
  temFiador: boolean;
}

export interface SeguroFiancaResult {
  custoTotalSeguroFianca: number;
  custoOportunidadeCaucao: number; // quanto o depósito renderia investido
  custoFiador: number; // R$ 0 (mas tem custo implícito de disponibilidade)
  melhorOpcao: "seguro_fianca" | "caucao" | "fiador";
  comparativo: {
    opcao: string;
    custoInicial: number;
    custoTotal: number;
    pros: string[];
    contras: string[];
  }[];
}

export function calcularSeguroFianca(input: SeguroFiancaInput): SeguroFiancaResult {
  const { aluguelMensal, prazoContrato, mesesSeguroFianca, mesesCaucao, taxaInvestimento, temFiador } = input;

  const prazoAnos = prazoContrato / 12;

  // Seguro fiança: paga anualmente. Custo total = prêmio anual × anos
  const premioAnual = aluguelMensal * mesesSeguroFianca;
  const custoTotalSeguroFianca = premioAnual * prazoAnos;

  // Caução: depósito sem rendimento ao inquilino
  const depositoCaucao = aluguelMensal * mesesCaucao;
  const taxaMensal = taxaInvestimento / 100 / 12;
  // Custo de oportunidade = quanto o depósito renderia no prazo
  const custoOportunidadeCaucao = depositoCaucao * (Math.pow(1 + taxaInvestimento / 100, prazoAnos) - 1);

  // Fiador: custo financeiro zero, mas custo implícito de relacionamento e disponibilidade
  const custoFiador = 0;

  // Decide melhor opção pelo custo
  const custos = [
    { opcao: "seguro_fianca", custo: custoTotalSeguroFianca },
    { opcao: "caucao", custo: custoOportunidadeCaucao },
    { opcao: "fiador", custo: temFiador ? 0 : Infinity },
  ];
  const melhor = custos.sort((a, b) => a.custo - b.custo)[0].opcao as SeguroFiancaResult["melhorOpcao"];

  const comparativo: SeguroFiancaResult["comparativo"] = [
    {
      opcao: "Seguro Fiança",
      custoInicial: premioAnual,
      custoTotal: custoTotalSeguroFianca,
      pros: ["Aceito pela maioria dos proprietários", "Não imobiliza capital", "Cobertura ampla"],
      contras: ["Custo não é recuperado", "Pagamento anual", "Pode encarecer 10–15% do aluguel/ano"],
    },
    {
      opcao: "Caução em Dinheiro",
      custoInicial: depositoCaucao,
      custoTotal: custoOportunidadeCaucao,
      pros: ["Capital devolvido ao fim do contrato", "Sem burocracia extra", "Até 3 meses de aluguel"],
      contras: ["Imobiliza capital por anos", "Máximo 3 meses por lei", "Rendimento ficam com proprietário"],
    },
    {
      opcao: "Fiador",
      custoInicial: 0,
      custoTotal: 0,
      pros: ["Sem custo financeiro direto", "Capital livre"],
      contras: ["Difícil de conseguir", "Requer imóvel quitado no nome do fiador", "Gera constrangimentos pessoais"],
    },
  ];

  return { custoTotalSeguroFianca, custoOportunidadeCaucao, custoFiador, melhorOpcao: melhor, comparativo };
}

// ──────────────────────────────────────────────
// 21. LEILÃO DE IMÓVEL
// ──────────────────────────────────────────────
export interface LeilaoImovelInput {
  valorArremate: number;
  valorAvaliacaoImovel: number;
  aliquotaITBI: number; // %
  percentualComissaoLeiloeiro: number; // % sobre arremate (típico 5%)
  dividasCondominioIptu: number;
  custoEstimadoReforma: number;
  custosCartorio: number;
}

export interface LeilaoImovelResult {
  custoTotal: number;
  descontoRealPercent: number; // desconto real vs valor de avaliação
  lucroEstimado: number;
  roi: number;
  detalhamento: { item: string; valor: number }[];
  alertas: string[];
}

export function calcularLeilaoImovel(input: LeilaoImovelInput): LeilaoImovelResult {
  const {
    valorArremate, valorAvaliacaoImovel, aliquotaITBI, percentualComissaoLeiloeiro,
    dividasCondominioIptu, custoEstimadoReforma, custosCartorio,
  } = input;

  const itbi = valorArremate * (aliquotaITBI / 100);
  const comissaoLeiloeiro = valorArremate * (percentualComissaoLeiloeiro / 100);

  const custoTotal = valorArremate + itbi + comissaoLeiloeiro + dividasCondominioIptu + custoEstimadoReforma + custosCartorio;
  const descontoRealPercent = valorAvaliacaoImovel > 0
    ? ((valorAvaliacaoImovel - custoTotal) / valorAvaliacaoImovel) * 100 : 0;
  const lucroEstimado = valorAvaliacaoImovel - custoTotal;
  const roi = custoTotal > 0 ? (lucroEstimado / custoTotal) * 100 : 0;

  const detalhamento: LeilaoImovelResult["detalhamento"] = [
    { item: "Valor do arremate", valor: valorArremate },
    { item: `ITBI (${aliquotaITBI}%)`, valor: itbi },
    { item: `Comissão do leiloeiro (${percentualComissaoLeiloeiro}%)`, valor: comissaoLeiloeiro },
    { item: "Dívidas (condomínio/IPTU)", valor: dividasCondominioIptu },
    { item: "Reforma estimada", valor: custoEstimadoReforma },
    { item: "Cartório e transferência", valor: custosCartorio },
  ];

  const alertas: string[] = [];
  if (descontoRealPercent < 10) alertas.push("Desconto real abaixo de 10% — verifique se vale o risco.");
  if (dividasCondominioIptu === 0) alertas.push("Informe as dívidas de condomínio e IPTU — podem ser assumidas pelo arrematante.");
  if (custoEstimadoReforma === 0) alertas.push("Considere os custos de reforma — imóveis de leilão frequentemente precisam de obras.");
  alertas.push("Pesquise a situação jurídica do imóvel antes de arrematar (ação de despejo, ocupantes, etc.).");
  alertas.push("O prazo para desocupação pode ser longo — preveja custo de aluguel alternativo.");

  return { custoTotal, descontoRealPercent, lucroEstimado, roi, detalhamento, alertas };
}

// ──────────────────────────────────────────────
// 22. ITCMD — IMPOSTO DE TRANSMISSÃO CAUSA MORTIS E DOAÇÃO
// ──────────────────────────────────────────────
export interface ITCMDInput {
  valorBem: number;
  uf: string;
  tipoTransmissao: "heranca" | "doacao";
}

export interface ITCMDResult {
  impostoDevido: number;
  aliquotaEfetiva: number;
  baseCalculo: number;
  faixasAplicadas: { faixa: string; base: number; aliquota: number; imposto: number }[];
  observacao: string;
}

interface ITCMDFaixa {
  ate: number;
  aliquota: number;
}

interface ITCMDConfig {
  nome: string;
  tipo: "flat" | "progressive";
  aliquota?: number;
  faixas?: ITCMDFaixa[];
  obs?: string;
}

const ITCMD_ESTADOS: Record<string, ITCMDConfig> = {
  AC: { nome: "Acre", tipo: "flat", aliquota: 4 },
  AL: { nome: "Alagoas", tipo: "flat", aliquota: 4 },
  AM: { nome: "Amazonas", tipo: "progressive", faixas: [{ ate: 50000, aliquota: 2 }, { ate: Infinity, aliquota: 4 }] },
  AP: { nome: "Amapá", tipo: "flat", aliquota: 4 },
  BA: { nome: "Bahia", tipo: "progressive", faixas: [{ ate: 100000, aliquota: 3.5 }, { ate: 300000, aliquota: 5 }, { ate: Infinity, aliquota: 8 }], obs: "Taxa varia conforme parentesco" },
  CE: { nome: "Ceará", tipo: "progressive", faixas: [{ ate: 150000, aliquota: 2 }, { ate: 400000, aliquota: 4 }, { ate: Infinity, aliquota: 8 }] },
  DF: { nome: "Distrito Federal", tipo: "progressive", faixas: [{ ate: 1000000, aliquota: 4 }, { ate: Infinity, aliquota: 6 }] },
  ES: { nome: "Espírito Santo", tipo: "flat", aliquota: 4 },
  GO: { nome: "Goiás", tipo: "progressive", faixas: [{ ate: 25000, aliquota: 2 }, { ate: 150000, aliquota: 3 }, { ate: 300000, aliquota: 4 }, { ate: Infinity, aliquota: 8 }] },
  MA: { nome: "Maranhão", tipo: "progressive", faixas: [{ ate: 30000, aliquota: 1 }, { ate: 100000, aliquota: 3 }, { ate: 300000, aliquota: 5 }, { ate: Infinity, aliquota: 7 }] },
  MG: { nome: "Minas Gerais", tipo: "flat", aliquota: 5 },
  MS: { nome: "Mato Grosso do Sul", tipo: "flat", aliquota: 6 },
  MT: { nome: "Mato Grosso", tipo: "progressive", faixas: [{ ate: 100000, aliquota: 2 }, { ate: 500000, aliquota: 4 }, { ate: Infinity, aliquota: 8 }] },
  PA: { nome: "Pará", tipo: "progressive", faixas: [{ ate: 200000, aliquota: 2 }, { ate: 500000, aliquota: 4 }, { ate: Infinity, aliquota: 6 }] },
  PB: { nome: "Paraíba", tipo: "progressive", faixas: [{ ate: 50000, aliquota: 2 }, { ate: 200000, aliquota: 4 }, { ate: Infinity, aliquota: 8 }] },
  PE: { nome: "Pernambuco", tipo: "progressive", faixas: [{ ate: 100000, aliquota: 2 }, { ate: 300000, aliquota: 4 }, { ate: Infinity, aliquota: 8 }] },
  PI: { nome: "Piauí", tipo: "progressive", faixas: [{ ate: 200000, aliquota: 2 }, { ate: 500000, aliquota: 4 }, { ate: Infinity, aliquota: 8 }] },
  PR: { nome: "Paraná", tipo: "flat", aliquota: 4 },
  RJ: { nome: "Rio de Janeiro", tipo: "progressive", faixas: [{ ate: 100000, aliquota: 4 }, { ate: 400000, aliquota: 4.5 }, { ate: Infinity, aliquota: 8 }], obs: "Herança: 4%. Doação pode ter alíquota maior" },
  RN: { nome: "Rio Grande do Norte", tipo: "progressive", faixas: [{ ate: 100000, aliquota: 3 }, { ate: 400000, aliquota: 4 }, { ate: Infinity, aliquota: 6 }] },
  RO: { nome: "Rondônia", tipo: "flat", aliquota: 4 },
  RR: { nome: "Roraima", tipo: "flat", aliquota: 4 },
  RS: { nome: "Rio Grande do Sul", tipo: "progressive", faixas: [{ ate: 30000, aliquota: 0 }, { ate: 150000, aliquota: 3 }, { ate: 450000, aliquota: 4 }, { ate: Infinity, aliquota: 6 }], obs: "Isenção para heranças de pequeno valor" },
  SC: { nome: "Santa Catarina", tipo: "progressive", faixas: [{ ate: 20000, aliquota: 1 }, { ate: 50000, aliquota: 3 }, { ate: 200000, aliquota: 5 }, { ate: 500000, aliquota: 7 }, { ate: Infinity, aliquota: 8 }] },
  SE: { nome: "Sergipe", tipo: "flat", aliquota: 8, obs: "Alíquota aumentada em 2023" },
  SP: { nome: "São Paulo", tipo: "flat", aliquota: 4, obs: "Proposta de alíquota progressiva até 8% em tramitação" },
  TO: { nome: "Tocantins", tipo: "progressive", faixas: [{ ate: 100000, aliquota: 2 }, { ate: 300000, aliquota: 4 }, { ate: Infinity, aliquota: 8 }] },
};

export function calcularITCMD(input: ITCMDInput): ITCMDResult {
  const { valorBem, uf, tipoTransmissao } = input;
  const config = ITCMD_ESTADOS[uf];

  if (!config) {
    return { impostoDevido: 0, aliquotaEfetiva: 0, baseCalculo: valorBem, faixasAplicadas: [], observacao: "Estado não encontrado" };
  }

  // Doação geralmente tem alíquota maior em alguns estados — aplicamos multiplicador 1.0 (mesmo valor por simplicidade)
  // Estados que diferenciam (RJ, BA) são sinalizados na observação
  const baseCalculo = valorBem;
  let impostoDevido = 0;
  const faixasAplicadas: ITCMDResult["faixasAplicadas"] = [];

  if (config.tipo === "flat") {
    const aliq = (config.aliquota ?? 0) / 100;
    impostoDevido = baseCalculo * aliq;
    faixasAplicadas.push({ faixa: "Alíquota única", base: baseCalculo, aliquota: config.aliquota ?? 0, imposto: impostoDevido });
  } else if (config.faixas) {
    let restante = baseCalculo;
    let limiteAnterior = 0;
    for (const faixa of config.faixas) {
      if (restante <= 0) break;
      const baseNaFaixa = Math.min(restante, faixa.ate - limiteAnterior);
      const imposto = baseNaFaixa * (faixa.aliquota / 100);
      if (baseNaFaixa > 0) {
        const label = faixa.ate === Infinity ? `Acima de R$ ${limiteAnterior.toLocaleString("pt-BR")}` : `Até R$ ${faixa.ate.toLocaleString("pt-BR")}`;
        faixasAplicadas.push({ faixa: label, base: baseNaFaixa, aliquota: faixa.aliquota, imposto });
      }
      impostoDevido += imposto;
      restante -= baseNaFaixa;
      limiteAnterior = faixa.ate;
    }
  }

  const aliquotaEfetiva = baseCalculo > 0 ? (impostoDevido / baseCalculo) * 100 : 0;
  const observacao = [
    `${config.nome} (${uf})`,
    tipoTransmissao === "heranca" ? "Herança / Causa Mortis" : "Doação",
    config.obs ?? "",
    "As alíquotas são aproximadas — consulte a legislação estadual vigente e um especialista.",
  ].filter(Boolean).join(" · ");

  return { impostoDevido, aliquotaEfetiva, baseCalculo, faixasAplicadas, observacao };
}

export const ITCMD_UFS = Object.entries(ITCMD_ESTADOS).map(([uf, c]) => ({ uf, nome: c.nome })).sort((a, b) => a.nome.localeCompare(b.nome));

// ──────────────────────────────────────────────
// 23. MINHA CASA MINHA VIDA
// ──────────────────────────────────────────────
export type MCMVFaixa = 1 | 2 | 3;
export type MCMVMunicipio = "capital" | "medio" | "interior";

export interface MCMVInput {
  rendaFamiliarBruta: number;
  valorImovel: number;
  fgtsDisponivel: number;
  tipoMunicipio: MCMVMunicipio;
}

export interface MCMVResult {
  elegivel: boolean;
  faixa: MCMVFaixa | null;
  motivoInelegibilidade: string;
  taxaJurosAnual: number;
  subsidioEstimado: number;
  limiteImovel: number;
  dentroDoLimite: boolean;
  valorFinanciado: number;
  entradaPropriaNecessaria: number;
  parcelaMensal: number;
  observacoes: string[];
}

// Limites de renda familiar bruta (2024/2025)
const MCMV_RENDA_F1 = 2_640;
const MCMV_RENDA_F2 = 4_400;
const MCMV_RENDA_F3 = 8_000;

// Teto dos imóveis por faixa e tipo de município
const MCMV_LIMITE_IMOVEL: Record<MCMVMunicipio, { f1f2: number; f3: number }> = {
  capital:  { f1f2: 264_000, f3: 500_000 },
  medio:    { f1f2: 235_000, f3: 350_000 },
  interior: { f1f2: 190_000, f3: 264_000 },
};

export function calcularMCMV(input: MCMVInput): MCMVResult {
  const { rendaFamiliarBruta, valorImovel, fgtsDisponivel, tipoMunicipio } = input;
  const limites = MCMV_LIMITE_IMOVEL[tipoMunicipio];

  // Determinar faixa
  let faixa: MCMVFaixa | null = null;
  if (rendaFamiliarBruta <= MCMV_RENDA_F1) faixa = 1;
  else if (rendaFamiliarBruta <= MCMV_RENDA_F2) faixa = 2;
  else if (rendaFamiliarBruta <= MCMV_RENDA_F3) faixa = 3;

  if (!faixa) {
    return {
      elegivel: false, faixa: null,
      motivoInelegibilidade: `Renda familiar bruta de ${rendaFamiliarBruta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} excede o limite do programa (R$ 8.000/mês).`,
      taxaJurosAnual: 0, subsidioEstimado: 0, limiteImovel: 0, dentroDoLimite: false,
      valorFinanciado: 0, entradaPropriaNecessaria: 0, parcelaMensal: 0, observacoes: [],
    };
  }

  const limiteImovel = faixa <= 2 ? limites.f1f2 : limites.f3;
  const dentroDoLimite = valorImovel <= limiteImovel;

  if (!dentroDoLimite) {
    return {
      elegivel: false, faixa,
      motivoInelegibilidade: `Valor do imóvel (${valorImovel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}) excede o limite para Faixa ${faixa} na sua cidade (${limiteImovel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}).`,
      taxaJurosAnual: 0, subsidioEstimado: 0, limiteImovel, dentroDoLimite: false,
      valorFinanciado: 0, entradaPropriaNecessaria: 0, parcelaMensal: 0, observacoes: [],
    };
  }

  // Taxa de juros anual
  let taxaJurosAnual: number;
  if (faixa === 1) {
    taxaJurosAnual = 4.00;
  } else if (faixa === 2) {
    // Interpolação linear de 4,75% (base) a 7,00% (topo da faixa)
    const t = (rendaFamiliarBruta - MCMV_RENDA_F1) / (MCMV_RENDA_F2 - MCMV_RENDA_F1);
    taxaJurosAnual = parseFloat((4.75 + t * (7.00 - 4.75)).toFixed(2));
  } else {
    taxaJurosAnual = 7.66;
  }

  // Subsídio estimado (Faixa 1 e 2 apenas)
  let subsidioEstimado = 0;
  if (faixa === 1) {
    // Faixa 1: subsídio cobre grande parte, estimativa conservadora de R$ 40k-55k
    subsidioEstimado = 47_500;
  } else if (faixa === 2) {
    // Linear de R$ 47.500 (base Faixa 2) a R$ 0 (topo Faixa 2)
    const t = (rendaFamiliarBruta - MCMV_RENDA_F1) / (MCMV_RENDA_F2 - MCMV_RENDA_F1);
    subsidioEstimado = Math.max(0, Math.round(47_500 * (1 - t)));
  }

  // Subsídio não pode superar o valor do imóvel
  subsidioEstimado = Math.min(subsidioEstimado, valorImovel);

  // Entrada mínima de recursos próprios (5% Faixa 1/2, 10% Faixa 3)
  const percentualEntradaMinima = faixa <= 2 ? 0.05 : 0.10;
  const entradaMinimaTotal = valorImovel * percentualEntradaMinima;

  // FGTS entra como entrada; subsídio reduz o financiado
  const coberturaSemFinanc = fgtsDisponivel + subsidioEstimado;
  const valorFinanciado = Math.max(0, Math.min(
    valorImovel - coberturaSemFinanc,
    valorImovel * (faixa <= 2 ? 0.95 : 0.90), // teto de financiamento
  ));
  const entradaPropriaNecessaria = Math.max(0, entradaMinimaTotal - fgtsDisponivel);

  // Parcela estimada (PRICE, prazo de 360 meses = 30 anos)
  const prazoMeses = 360;
  const taxaMensal = taxaJurosAnual / 100 / 12;
  const parcelaMensal = valorFinanciado > 0 ? pmtPrice(taxaMensal, prazoMeses, valorFinanciado) : 0;

  const observacoes: string[] = [
    "O subsídio é uma estimativa — o valor real depende do município, da construtora e da análise de crédito da Caixa Econômica ou Banco do Brasil.",
    "Prazo máximo: 360 meses (30 anos). Parcela não pode ultrapassar 30% da renda familiar.",
    faixa === 1 ? "Faixa 1: parcelas podem ser ainda menores com subsídio complementar municipal." : "",
    "São exigidos: primeiro imóvel residencial, não ter outro imóvel registrado no FGTS, trabalhar em município próximo ao imóvel.",
    "Valores e regras de 2024/2025 — consulte a Caixa Econômica Federal ou correspondente credenciado.",
  ].filter(Boolean);

  return {
    elegivel: true, faixa, motivoInelegibilidade: "",
    taxaJurosAnual, subsidioEstimado, limiteImovel, dentroDoLimite: true,
    valorFinanciado, entradaPropriaNecessaria, parcelaMensal, observacoes,
  };
}

// ──────────────────────────────────────────────
// 24. POUPANÇA PARA A ENTRADA
// ──────────────────────────────────────────────
export interface PoupancaEntradaInput {
  metaValor: number;
  poupancaAtual: number;
  prazoMeses: number;
  rendimentoAnual: number; // % a.a. (líquido de IR)
}

export interface PoupancaEntradaResult {
  aporteMensalNecessario: number;
  totalAportado: number;
  totalRendimento: number;
  saldoFinal: number;
  metaAtingida: boolean;
  evolucao: { mes: number; saldo: number; aportes: number; rendimentos: number }[];
}

export function calcularPoupancaEntrada(input: PoupancaEntradaInput): PoupancaEntradaResult {
  const { metaValor, poupancaAtual, prazoMeses, rendimentoAnual } = input;
  const taxaMensal = Math.pow(1 + rendimentoAnual / 100, 1 / 12) - 1;

  // FV = PV × (1+r)^n + PMT × ((1+r)^n - 1) / r
  // Resolvendo para PMT: PMT = (FV - PV × (1+r)^n) × r / ((1+r)^n - 1)
  const fatorNParcelas = Math.pow(1 + taxaMensal, prazoMeses);
  const fvAtual = poupancaAtual * fatorNParcelas;
  const aporteMensalNecessario = taxaMensal > 0
    ? Math.max(0, (metaValor - fvAtual) * taxaMensal / (fatorNParcelas - 1))
    : Math.max(0, (metaValor - poupancaAtual) / prazoMeses);

  let saldo = poupancaAtual;
  let totalAportado = poupancaAtual;
  let totalRendimento = 0;
  const evolucao: PoupancaEntradaResult["evolucao"] = [];

  for (let mes = 1; mes <= prazoMeses; mes++) {
    const rendimento = saldo * taxaMensal;
    saldo = saldo + rendimento + aporteMensalNecessario;
    totalAportado += aporteMensalNecessario;
    totalRendimento += rendimento;

    if (mes % 3 === 0 || mes === prazoMeses) {
      evolucao.push({ mes, saldo, aportes: totalAportado, rendimentos: totalRendimento });
    }
  }

  return {
    aporteMensalNecessario,
    totalAportado,
    totalRendimento,
    saldoFinal: saldo,
    metaAtingida: saldo >= metaValor * 0.999,
    evolucao,
  };
}

// ──────────────────────────────────────────────
// 25. CONSÓRCIO VS. FINANCIAMENTO
// ──────────────────────────────────────────────
export interface ConsorcioInput {
  valorCredito: number;
  prazoMeses: number;
  taxaAdminTotal: number;     // % total sobre o crédito (ex: 20 = 20%)
  fundoReservaAnual: number;  // % a.a. sobre o crédito (ex: 0.5)
  lancePercentual: number;    // % do crédito que você daria como lance
  taxaFinanciamentoAnual: number;
  entrada: number;            // entrada disponível para o financiamento
}

export interface ConsorcioResult {
  // Consórcio
  parcelaMensalConsorcio: number;
  totalPagoConsorcio: number;
  mesEstimadoContemplacao: number;
  // Financiamento
  parcelaMensalFinanciamento: number;
  totalPagoFinanciamento: number;
  valorFinanciado: number;
  // Comparação
  economiaConsorcio: number;
  economiaPercentual: number;
  melhor: "consorcio" | "financiamento" | "semelhante";
  analise: string[];
}

export function calcularConsorcio(input: ConsorcioInput): ConsorcioResult {
  const { valorCredito, prazoMeses, taxaAdminTotal, fundoReservaAnual, lancePercentual, taxaFinanciamentoAnual, entrada } = input;

  // ── Consórcio ──
  // Parcela = (crédito / prazo) + (taxa admin / prazo × crédito) + fundo de reserva mensal
  const adminMensal = valorCredito * (taxaAdminTotal / 100) / prazoMeses;
  const fundoMensal = valorCredito * (fundoReservaAnual / 100) / 12;
  const parcelaMensalConsorcio = valorCredito / prazoMeses + adminMensal + fundoMensal;
  const totalPagoConsorcio = parcelaMensalConsorcio * prazoMeses;

  // Estimativa de contemplação com lance: quanto mais alto o lance, mais cedo contemplado
  // Aproximação: mes ≈ prazo × (1 - lancePercentual/50) × 0.3, mínimo mês 1
  const mesEstimadoContemplacao = lancePercentual >= 30
    ? 1
    : Math.max(1, Math.round(prazoMeses * (1 - lancePercentual / 100) * 0.4));

  // ── Financiamento ──
  const valorFinanciado = Math.max(0, valorCredito - entrada);
  const taxaMensal = taxaFinanciamentoAnual / 100 / 12;
  const parcelaMensalFinanciamento = valorFinanciado > 0 ? pmtPrice(taxaMensal, prazoMeses, valorFinanciado) : 0;
  const totalPagoFinanciamento = parcelaMensalFinanciamento * prazoMeses + entrada;

  // ── Comparação ──
  const economiaConsorcio = totalPagoFinanciamento - totalPagoConsorcio;
  const economiaPercentual = totalPagoFinanciamento > 0 ? (economiaConsorcio / totalPagoFinanciamento) * 100 : 0;

  const melhor: ConsorcioResult["melhor"] = Math.abs(economiaPercentual) < 3 ? "semelhante" : economiaConsorcio > 0 ? "consorcio" : "financiamento";

  const analise: string[] = [
    `Consórcio economiza ${Math.abs(economiaConsorcio).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} em juros vs. financiamento — mas você espera ~${mesEstimadoContemplacao} ${mesEstimadoContemplacao === 1 ? "mês" : "meses"} para ter o imóvel.`,
    lancePercentual > 0 ? `Com lance de ${lancePercentual}%, a estimativa de contemplação é o mês ${mesEstimadoContemplacao}.` : "Sem lance, a contemplação ocorre por sorteio — pode levar anos.",
    "Consórcio não cobra juros, mas a taxa de administração e o fundo de reserva têm custo real.",
    "Se você precisa do imóvel agora, o financiamento é a única opção — o consórcio não garante data de contemplação.",
    "Compare sempre o CET (Custo Efetivo Total) das propostas de financiamento antes de decidir.",
  ];

  return {
    parcelaMensalConsorcio, totalPagoConsorcio, mesEstimadoContemplacao,
    parcelaMensalFinanciamento, totalPagoFinanciamento, valorFinanciado,
    economiaConsorcio, economiaPercentual, melhor, analise,
  };
}

// ──────────────────────────────────────────────
// 26. TRIBUTAÇÃO DO ALUGUEL (PF — Carnê-Leão)
// ──────────────────────────────────────────────
export interface TributacaoAluguelInput {
  aluguelMensal: number;
  condominioLandlord: number;   // condomínio pago pelo proprietário
  iptuMensal: number;           // IPTU / 12
  outrasDeducoes: number;       // outras despesas dedutíveis (seguro incêndio, etc.)
  outrasRendas: number;         // outras rendas tributáveis no mesmo mês (para cálculo marginal)
}

export interface TributacaoAluguelResult {
  baseCalculo: number;
  aliquota: number;             // % marginal sobre o aluguel
  irMensal: number;
  irAnual: number;
  aliquotaEfetiva: number;      // % efetiva sobre o aluguel bruto
  rendimentoLiquidoMensal: number;
  totalDeducoes: number;
  faixaTabela: string;
  detalheFaixas: { faixa: string; base: number; aliquota: number; imposto: number }[];
}

// Tabela IRPF 2024 — mensal (carnê-leão)
const FAIXAS_IRPF_2024 = [
  { limite: 2259.20, aliquota: 0,     deducao: 0 },
  { limite: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { limite: 3751.05, aliquota: 0.15,  deducao: 381.44 },
  { limite: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { limite: Infinity, aliquota: 0.275, deducao: 896.00 },
];

function calcularIRPFProgressivo(base: number) {
  if (base <= 0) return { imposto: 0, aliquota: 0, detalhe: [] as { faixa: string; base: number; aliquota: number; imposto: number }[] };
  let restante = base;
  let limiteAnterior = 0;
  let imposto = 0;
  const detalhe: { faixa: string; base: number; aliquota: number; imposto: number }[] = [];

  for (const faixa of FAIXAS_IRPF_2024) {
    if (restante <= 0) break;
    const tamanhoFaixa = faixa.limite === Infinity ? restante : Math.min(restante, faixa.limite - limiteAnterior);
    const impostoFaixa = tamanhoFaixa * faixa.aliquota;
    if (tamanhoFaixa > 0 && faixa.aliquota > 0) {
      const label = faixa.limite === Infinity
        ? `Acima de ${limiteAnterior.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
        : `Até ${faixa.limite.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
      detalhe.push({ faixa: label, base: tamanhoFaixa, aliquota: faixa.aliquota * 100, imposto: impostoFaixa });
    }
    imposto += impostoFaixa;
    restante -= tamanhoFaixa;
    limiteAnterior = faixa.limite === Infinity ? base : faixa.limite;
  }
  const aliquotaMarginal = FAIXAS_IRPF_2024.find(f => base <= f.limite)?.aliquota ?? 0.275;
  return { imposto, aliquota: aliquotaMarginal * 100, detalhe };
}

export function calcularTributacaoAluguel(input: TributacaoAluguelInput): TributacaoAluguelResult {
  const { aluguelMensal, condominioLandlord, iptuMensal, outrasDeducoes, outrasRendas } = input;

  const totalDeducoes = condominioLandlord + iptuMensal + outrasDeducoes;
  const baseAluguel = Math.max(0, aluguelMensal - totalDeducoes);
  const baseTotal = outrasRendas + baseAluguel;

  // IR sobre total (outras rendas + aluguel)
  const { imposto: irTotal, detalhe: detalheTotal } = calcularIRPFProgressivo(baseTotal);
  // IR sobre apenas outras rendas (para isolar o custo marginal do aluguel)
  const { imposto: irSemAluguel } = calcularIRPFProgressivo(outrasRendas);

  const irMensal = Math.max(0, irTotal - irSemAluguel);
  const aliquotaMarginalFaixa = FAIXAS_IRPF_2024.find(f => baseTotal <= f.limite) ?? FAIXAS_IRPF_2024[FAIXAS_IRPF_2024.length - 1];
  const faixaTabela = aliquotaMarginalFaixa.aliquota === 0 ? "Isento" : `${(aliquotaMarginalFaixa.aliquota * 100).toFixed(1)}%`;

  return {
    baseCalculo: baseAluguel,
    aliquota: aliquotaMarginalFaixa.aliquota * 100,
    irMensal,
    irAnual: irMensal * 12,
    aliquotaEfetiva: aluguelMensal > 0 ? (irMensal / aluguelMensal) * 100 : 0,
    rendimentoLiquidoMensal: aluguelMensal - irMensal,
    totalDeducoes,
    faixaTabela,
    detalheFaixas: detalheTotal,
  };
}

// ──────────────────────────────────────────────
// 27. TIR DO INVESTIMENTO IMOBILIÁRIO
// ──────────────────────────────────────────────
export interface TIRImovelInput {
  valorImovel: number;
  entradaPercentual: number;    // % do valor
  taxaFinanciamentoAnual: number;
  prazoFinanciamentoMeses: number;
  custosCompraPercentual: number; // ITBI + cartório, % do valor
  aluguelMensal: number;
  despesasMensais: number;
  vacanciaPercentual: number;
  valorizacaoAnual: number;     // % a.a.
  horizonteAnos: number;        // quando você vende
  percentualCorretagem: number; // % na venda
}

export interface TIRImovelResult {
  tirAnual: number;             // % a.a.
  entradaTotal: number;
  valorVendaFinal: number;
  totalRecebidoAluguel: number;
  totalPagoFinanciamento: number;
  cashFlowMedioMensal: number;
  positivo: boolean;
  evolucaoCashFlow: { ano: number; cfAcumulado: number; saldo: number }[];
}

function bisectionIRR(cashFlows: number[]): number {
  const npv = (r: number) => cashFlows.reduce((s, cf, t) => s + cf / Math.pow(1 + r, t), 0);
  let lo = -0.9999, hi = 5.0;
  if (npv(lo) * npv(hi) > 0) { hi = 0.5; }
  if (npv(lo) * npv(hi) > 0) return NaN;
  for (let i = 0; i < 300; i++) {
    const mid = (lo + hi) / 2;
    if (Math.abs(npv(mid)) < 1e-8 || (hi - lo) < 1e-12) return mid;
    if (npv(lo) * npv(mid) < 0) hi = mid; else lo = mid;
  }
  return (lo + hi) / 2;
}

export function calcularTIRImovel(input: TIRImovelInput): TIRImovelResult {
  const {
    valorImovel, entradaPercentual, taxaFinanciamentoAnual, prazoFinanciamentoMeses,
    custosCompraPercentual, aluguelMensal, despesasMensais, vacanciaPercentual,
    valorizacaoAnual, horizonteAnos, percentualCorretagem,
  } = input;

  const entrada = valorImovel * entradaPercentual / 100;
  const custoCompra = valorImovel * custosCompraPercentual / 100;
  const valorFinanciado = valorImovel - entrada;
  const taxaMensal = taxaFinanciamentoAnual / 100 / 12;
  const parcelaMensal = valorFinanciado > 0 ? pmtPrice(taxaMensal, prazoFinanciamentoMeses, valorFinanciado) : 0;
  const fatorOcupacao = 1 - vacanciaPercentual / 100;
  const rendaMensalLiquida = aluguelMensal * fatorOcupacao - despesasMensais;
  const totalMeses = horizonteAnos * 12;

  // Build monthly cash flows
  const cashFlows: number[] = [];
  cashFlows.push(-(entrada + custoCompra)); // t=0

  let saldoDevedor = valorFinanciado;
  let totalAluguel = 0;
  let totalFinanc = 0;

  for (let mes = 1; mes <= totalMeses; mes++) {
    if (saldoDevedor > 0) {
      const juros = saldoDevedor * taxaMensal;
      const amort = Math.min(parcelaMensal - juros, saldoDevedor);
      saldoDevedor = Math.max(0, saldoDevedor - amort);
      totalFinanc += parcelaMensal;
    }
    totalAluguel += Math.max(0, rendaMensalLiquida);

    let cf = Math.max(0, rendaMensalLiquida) - (mes <= prazoFinanciamentoMeses ? parcelaMensal : 0);
    if (mes === totalMeses) {
      const valorVenda = valorImovel * Math.pow(1 + valorizacaoAnual / 100, horizonteAnos);
      cf += valorVenda * (1 - percentualCorretagem / 100) - saldoDevedor;
    }
    cashFlows.push(cf);
  }

  const valorVendaFinal = valorImovel * Math.pow(1 + valorizacaoAnual / 100, horizonteAnos);
  const tirMensal = bisectionIRR(cashFlows);
  const tirAnual = isNaN(tirMensal) ? 0 : (Math.pow(1 + tirMensal, 12) - 1) * 100;

  // Evolução para chart
  let cfAcumulado = -(entrada + custoCompra);
  const evolucaoCashFlow: TIRImovelResult["evolucaoCashFlow"] = [];
  let saldoEvolucao = valorImovel;
  let saldoDevEvolucao = valorFinanciado;

  for (let ano = 1; ano <= horizonteAnos; ano++) {
    for (let m = 0; m < 12; m++) {
      cfAcumulado += Math.max(0, rendaMensalLiquida) - (saldoDevEvolucao > 0 ? parcelaMensal : 0);
      if (saldoDevEvolucao > 0) {
        const j = saldoDevEvolucao * taxaMensal;
        saldoDevEvolucao = Math.max(0, saldoDevEvolucao - (parcelaMensal - j));
      }
    }
    saldoEvolucao = valorImovel * Math.pow(1 + valorizacaoAnual / 100, ano);
    evolucaoCashFlow.push({ ano, cfAcumulado, saldo: Math.max(0, saldoEvolucao - saldoDevEvolucao) + cfAcumulado });
  }

  return {
    tirAnual,
    entradaTotal: entrada + custoCompra,
    valorVendaFinal,
    totalRecebidoAluguel: totalAluguel,
    totalPagoFinanciamento: totalFinanc,
    cashFlowMedioMensal: rendaMensalLiquida - parcelaMensal,
    positivo: tirAnual > 0,
    evolucaoCashFlow,
  };
}

// ──────────────────────────────────────────────
// 28. IMÓVEL NA PLANTA VS. PRONTO
// ──────────────────────────────────────────────
export interface PlantaVsProntoInput {
  valorNaPlanta: number;
  valorPronto: number;
  percentualSinal: number;
  percentualParcelas: number;
  prazoObrasMeses: number;
  inccAnual: number;
  taxaFinanciamentoAnual: number;
  prazoFinanciamentoMeses: number;
  atrasoMeses: number;
  aluguelMensalAtual: number;
  pagaAluguelDuranteObra: boolean; // se paga aluguel enquanto aguarda as chaves
  custoCompraPercentual: number;
}

export interface PlantaVsProntoResult {
  // Planta — pré-entrega
  sinalPago: number;
  parcelasObra: number;
  correcaoINCC: number;
  saldoChaves: number;
  custoAluguelObra: number;
  custoAtraso: number;
  // Planta — financiamento pós-chaves
  parcelaPlanta: number;
  totalFinanciamentoPlanta: number;
  totalJurosPlanta: number;
  custoCompraPlanta: number;
  totalPlanta: number;           // custo total real da operação
  // Pronto
  entradaPronto: number;
  saldoFinanciadoPronto: number;
  parcelaPronto: number;
  totalFinanciamentoPronto: number;
  totalJurosPronto: number;
  custoCompraPronto: number;
  totalPronto: number;           // custo total real da operação
  // Comparação
  economiaPlanta: number;        // positivo = planta mais barata
  vantagem: "planta" | "pronto" | "semelhante";
  observacoes: string[];
}

export function calcularPlantaVsPronto(input: PlantaVsProntoInput): PlantaVsProntoResult {
  const {
    valorNaPlanta, valorPronto, percentualSinal, percentualParcelas, prazoObrasMeses,
    inccAnual, taxaFinanciamentoAnual, prazoFinanciamentoMeses, atrasoMeses,
    aluguelMensalAtual, pagaAluguelDuranteObra, custoCompraPercentual,
  } = input;

  const taxaMensal = taxaFinanciamentoAnual / 100 / 12;

  // --- PLANTA: pré-entrega ---
  const sinalPago = valorNaPlanta * percentualSinal / 100;
  const parcelaMensalObra = (valorNaPlanta * percentualParcelas / 100) / prazoObrasMeses;
  const parcelasObra = parcelaMensalObra * prazoObrasMeses;

  // INCC incide progressivamente — fator médio de 0.5 sobre as parcelas
  const fatorINCC = Math.pow(1 + inccAnual / 100, prazoObrasMeses / 12) - 1;
  const correcaoINCC = parcelasObra * fatorINCC * 0.5;

  const percentualChaves = Math.max(0, 100 - percentualSinal - percentualParcelas);
  const saldoChaves = Math.max(0, valorNaPlanta * percentualChaves / 100 + correcaoINCC);

  // Aluguel durante a espera (obra + eventual atraso)
  const custoAluguelObra = pagaAluguelDuranteObra ? aluguelMensalAtual * prazoObrasMeses : 0;
  const custoAtraso = pagaAluguelDuranteObra ? aluguelMensalAtual * atrasoMeses : 0;

  // --- PLANTA: financiamento pós-chaves ---
  const parcelaPlanta = saldoChaves > 0 ? pmtPrice(taxaMensal, prazoFinanciamentoMeses, saldoChaves) : 0;
  const totalFinanciamentoPlanta = parcelaPlanta * prazoFinanciamentoMeses;
  const totalJurosPlanta = Math.max(0, totalFinanciamentoPlanta - saldoChaves);
  const custoCompraPlanta = custoCompraPercentual / 100 * valorNaPlanta;

  // TOTAL PLANTA = pré-entrega + aluguel (obra + atraso) + financiamento pós-chaves + custos
  const totalPlanta = sinalPago + parcelasObra + correcaoINCC
    + custoAluguelObra + custoAtraso
    + totalFinanciamentoPlanta + custoCompraPlanta;

  // --- PRONTO ---
  const entradaPercentual = percentualSinal + percentualParcelas;
  const entradaPronto = valorPronto * entradaPercentual / 100;
  const saldoFinanciadoPronto = Math.max(0, valorPronto - entradaPronto);
  const parcelaPronto = saldoFinanciadoPronto > 0 ? pmtPrice(taxaMensal, prazoFinanciamentoMeses, saldoFinanciadoPronto) : 0;
  const totalFinanciamentoPronto = parcelaPronto * prazoFinanciamentoMeses;
  const totalJurosPronto = Math.max(0, totalFinanciamentoPronto - saldoFinanciadoPronto);
  const custoCompraPronto = custoCompraPercentual / 100 * valorPronto;

  // TOTAL PRONTO = entrada + financiamento + custos
  const totalPronto = entradaPronto + totalFinanciamentoPronto + custoCompraPronto;

  const economiaPlanta = totalPronto - totalPlanta;

  const observacoes: string[] = [
    `Prazo de obra: ${prazoObrasMeses} meses. Média nacional de atrasos: 8–12 meses.`,
    saldoChaves > 0
      ? `Saldo a financiar nas chaves: ${saldoChaves.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} — confirme aprovação de crédito antes de assinar.`
      : "",
    "Imóveis com patrimônio de afetação têm maior segurança jurídica em caso de falência da incorporadora.",
    inccAnual > 7 ? "INCC elevado: anos com alta inflação da construção civil encarecem significativamente o imóvel na planta." : "",
    !pagaAluguelDuranteObra ? "Simulação sem custo de aluguel durante a obra. Se você paga aluguel, ative a opção para comparação real." : "",
  ].filter(Boolean);

  return {
    sinalPago, parcelasObra, correcaoINCC, saldoChaves,
    custoAluguelObra, custoAtraso,
    parcelaPlanta, totalFinanciamentoPlanta, totalJurosPlanta, custoCompraPlanta, totalPlanta,
    entradaPronto, saldoFinanciadoPronto, parcelaPronto, totalFinanciamentoPronto, totalJurosPronto, custoCompraPronto, totalPronto,
    economiaPlanta,
    vantagem: Math.abs(economiaPlanta) < valorNaPlanta * 0.03 ? "semelhante" : economiaPlanta > 0 ? "planta" : "pronto",
    observacoes,
  };
}

// ──────────────────────────────────────────────
// 29. DISTRATO DE IMÓVEL NA PLANTA
// ──────────────────────────────────────────────
export interface DistratoInput {
  totalPago: number;            // total já pago ao longo do contrato
  corretagem: number;           // corretagem paga na compra (pode ser retida)
  sati: number;                 // Serviço de Assessoria Técnico-Imobiliária (se aplicável)
  patrimonioAfetacao: boolean;  // aumenta a multa para 50%
  correcaoINPC: number;         // % de correção pelo INPC acumulado desde os pagamentos
}

export interface DistratoResult {
  percentualMulta: number;       // 25% ou 50%
  valorMulta: number;
  corretagemRetida: number;
  satiRetido: number;
  totalRetido: number;
  valorAReceber: number;
  valorCorrigido: number;        // corrigido pelo INPC
  prazoRecebimento: number;      // dias
  observacoes: string[];
}

export function calcularDistrato(input: DistratoInput): DistratoResult {
  const { totalPago, corretagem, sati, patrimonioAfetacao, correcaoINPC } = input;

  const percentualMulta = patrimonioAfetacao ? 50 : 25;
  const valorMulta = totalPago * (percentualMulta / 100);
  const corretagemRetida = corretagem;
  const satiRetido = sati;
  const totalRetido = Math.min(totalPago, valorMulta + corretagemRetida + satiRetido);
  const valorAReceber = Math.max(0, totalPago - totalRetido);
  const valorCorrigido = valorAReceber * (1 + correcaoINPC / 100);
  const prazoRecebimento = patrimonioAfetacao ? 30 : 180;

  const observacoes: string[] = [
    `Lei 13.786/2018: a incorporadora pode reter ${percentualMulta}% do total pago${patrimonioAfetacao ? " (patrimônio de afetação)" : ""}.`,
    "A corretagem e SATI pagas também podem ser retidas se constarem no contrato.",
    `Prazo para recebimento: ${prazoRecebimento} dias após a revenda da unidade pela incorporadora.`,
    "O valor devolvido é corrigido pelo INPC ou pelo índice previsto em contrato.",
    "Em caso de culpa da incorporadora (atraso, vício de construção), a penalidade pode ser revertida — consulte um advogado.",
    "Verifique se o contrato prevê multa menor: o STJ tem decidido casos onde 25% é excessivo.",
  ];

  return {
    percentualMulta, valorMulta, corretagemRetida, satiRetido,
    totalRetido, valorAReceber, valorCorrigido, prazoRecebimento, observacoes,
  };
}
