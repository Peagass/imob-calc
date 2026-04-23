export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals).replace(".", ",")}%`;
}

export function parseCurrency(value: string): number {
  const clean = value.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(clean) || 0;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(Math.round(value));
}
