export interface CidadeITBI {
  cidade: string;
  estado: string;
  uf: string;
  aliquota: number; // percentual
  observacao?: string;
}

export const cidadesITBI: CidadeITBI[] = [
  { cidade: "São Paulo", estado: "São Paulo", uf: "SP", aliquota: 3.0 },
  { cidade: "Campinas", estado: "São Paulo", uf: "SP", aliquota: 2.0 },
  { cidade: "Santos", estado: "São Paulo", uf: "SP", aliquota: 2.0 },
  { cidade: "Guarulhos", estado: "São Paulo", uf: "SP", aliquota: 2.0 },
  { cidade: "Rio de Janeiro", estado: "Rio de Janeiro", uf: "RJ", aliquota: 3.0 },
  { cidade: "Niterói", estado: "Rio de Janeiro", uf: "RJ", aliquota: 2.0 },
  { cidade: "Belo Horizonte", estado: "Minas Gerais", uf: "MG", aliquota: 3.0 },
  { cidade: "Uberlândia", estado: "Minas Gerais", uf: "MG", aliquota: 2.0 },
  { cidade: "Curitiba", estado: "Paraná", uf: "PR", aliquota: 2.7 },
  { cidade: "Londrina", estado: "Paraná", uf: "PR", aliquota: 2.0 },
  { cidade: "Porto Alegre", estado: "Rio Grande do Sul", uf: "RS", aliquota: 3.0 },
  { cidade: "Caxias do Sul", estado: "Rio Grande do Sul", uf: "RS", aliquota: 2.0 },
  { cidade: "Salvador", estado: "Bahia", uf: "BA", aliquota: 3.0 },
  { cidade: "Feira de Santana", estado: "Bahia", uf: "BA", aliquota: 2.0 },
  { cidade: "Fortaleza", estado: "Ceará", uf: "CE", aliquota: 2.0 },
  { cidade: "Recife", estado: "Pernambuco", uf: "PE", aliquota: 2.0 },
  { cidade: "Manaus", estado: "Amazonas", uf: "AM", aliquota: 2.0 },
  { cidade: "Belém", estado: "Pará", uf: "PA", aliquota: 2.0 },
  { cidade: "Goiânia", estado: "Goiás", uf: "GO", aliquota: 2.0 },
  { cidade: "Brasília", estado: "Distrito Federal", uf: "DF", aliquota: 3.0, observacao: "Chama-se ISTI no DF" },
  { cidade: "Florianópolis", estado: "Santa Catarina", uf: "SC", aliquota: 2.0 },
  { cidade: "Joinville", estado: "Santa Catarina", uf: "SC", aliquota: 2.0 },
  { cidade: "Maceió", estado: "Alagoas", uf: "AL", aliquota: 2.0 },
  { cidade: "Natal", estado: "Rio Grande do Norte", uf: "RN", aliquota: 2.0 },
  { cidade: "Teresina", estado: "Piauí", uf: "PI", aliquota: 2.0 },
  { cidade: "Campo Grande", estado: "Mato Grosso do Sul", uf: "MS", aliquota: 2.0 },
  { cidade: "Cuiabá", estado: "Mato Grosso", uf: "MT", aliquota: 2.0 },
  { cidade: "Porto Velho", estado: "Rondônia", uf: "RO", aliquota: 2.0 },
  { cidade: "Macapá", estado: "Amapá", uf: "AP", aliquota: 2.0 },
  { cidade: "Boa Vista", estado: "Roraima", uf: "RR", aliquota: 2.0 },
  { cidade: "Palmas", estado: "Tocantins", uf: "TO", aliquota: 2.0 },
  { cidade: "São Luís", estado: "Maranhão", uf: "MA", aliquota: 2.0 },
  { cidade: "Aracaju", estado: "Sergipe", uf: "SE", aliquota: 2.0 },
  { cidade: "João Pessoa", estado: "Paraíba", uf: "PB", aliquota: 2.0 },
  { cidade: "Vitória", estado: "Espírito Santo", uf: "ES", aliquota: 2.0 },
  { cidade: "Rio Branco", estado: "Acre", uf: "AC", aliquota: 2.0 },
];

export function getAliquotaITBI(uf: string): number {
  const capital = cidadesITBI.find((c) => c.uf === uf);
  return capital?.aliquota ?? 2.0;
}
