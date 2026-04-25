import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Metodologia das Calculadoras | CalculaImóvel" },
  description:
    "Como funcionam as calculadoras do CalculaImóvel: fórmulas, fontes de dados oficiais, premissas e legislação brasileira utilizadas em cada ferramenta.",
  alternates: { canonical: `${SITE_URL}/metodologia` },
  openGraph: {
    title: "Metodologia das Calculadoras | CalculaImóvel",
    description: "Fórmulas, fontes e premissas de cada calculadora imobiliária.",
    url: `${SITE_URL}/metodologia`,
    type: "website",
  },
};

const metodologiaSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Metodologia das Calculadoras Imobiliárias",
  description: "Fórmulas, fontes de dados e premissas utilizadas nas calculadoras do CalculaImóvel.",
  url: `${SITE_URL}/metodologia`,
  inLanguage: "pt-BR",
  author: { "@type": "Organization", name: "CalculaImóvel", url: SITE_URL },
  publisher: { "@type": "Organization", name: "CalculaImóvel", url: SITE_URL },
  dateModified: new Date().toISOString().split("T")[0],
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">{title}</h2>
      {children}
    </section>
  );
}

function Formula({ label, formula, desc }: { label: string; formula: string; desc: string }) {
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold text-slate-700 mb-1">{label}</p>
      <code className="block bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 font-mono leading-relaxed mb-1">
        {formula}
      </code>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function MetodologiaPage() {
  const sections = [
    { id: "financiamento", label: "Financiamento" },
    { id: "aluguel", label: "Aluguel" },
    { id: "impostos", label: "Impostos" },
    { id: "investimento", label: "Investimento" },
    { id: "condominio", label: "Condomínio" },
    { id: "dados", label: "Fontes de dados" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(metodologiaSchema) }}
      />

      <div className="mb-10">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Institucional</span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
          Metodologia das Calculadoras
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          Detalhamos aqui as fórmulas, premissas e fontes de dados utilizadas em cada categoria de calculadora. Nosso compromisso é com a transparência total sobre como os resultados são calculados.
        </p>
      </div>

      {/* Índice */}
      <nav className="bg-slate-50 rounded-xl p-5 mb-10">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Nesta página</p>
        <ol className="space-y-1">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-sm text-blue-600 hover:underline">
                {i + 1}. {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* 1. Financiamento */}
      <Section id="financiamento" title="1. Financiamento Imobiliário">
        <p className="text-slate-600 leading-relaxed mb-5">
          As calculadoras de financiamento implementam os dois sistemas de amortização previstos na resolução CMN nº 4.676/2018 e usados pela Caixa Econômica Federal, Banco do Brasil e demais instituições: o SAC e o PRICE.
        </p>

        <h3 className="font-semibold text-slate-800 mb-3">SAC — Sistema de Amortização Constante</h3>
        <Formula
          label="Amortização mensal (constante)"
          formula="A = SD₀ / n"
          desc="onde SD₀ = saldo devedor inicial, n = número total de parcelas"
        />
        <Formula
          label="Juros da parcela k"
          formula="Jₖ = SDₖ₋₁ × i"
          desc="onde SDₖ₋₁ = saldo devedor no início do mês k, i = taxa de juros mensal"
        />
        <Formula
          label="Parcela k"
          formula="PMTₖ = A + Jₖ"
          desc="Parcelas decrescentes: a amortização é constante mas os juros diminuem a cada mês"
        />

        <h3 className="font-semibold text-slate-800 mb-3 mt-6">PRICE — Tabela Price (Sistema Francês)</h3>
        <Formula
          label="Parcela constante"
          formula="PMT = PV × [i × (1 + i)ⁿ] / [(1 + i)ⁿ − 1]"
          desc="onde PV = valor financiado, i = taxa mensal, n = prazo em meses. Todas as parcelas têm o mesmo valor."
        />
        <Formula
          label="Saldo devedor após k parcelas"
          formula="SDₖ = PV × (1 + i)ᵏ − PMT × [(1 + i)ᵏ − 1] / i"
          desc="O saldo devedor cai mais lentamente no PRICE porque as primeiras parcelas são compostas majoritariamente por juros."
        />

        <h3 className="font-semibold text-slate-800 mb-3 mt-6">Correção pelo IPCA ou TR</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-3">
          Alguns financiamentos (especialmente MCMV e poupança) corrigem o saldo devedor mensalmente pela TR ou IPCA. Nesse caso, o saldo devedor é reajustado antes do cálculo da parcela de cada mês:
        </p>
        <Formula
          label="Saldo corrigido"
          formula="SDcorrigido = SDanterior × (1 + índice_mensal)"
          desc="O índice mensal pode ser a TR divulgada pelo BCB ou a variação mensal do IPCA. A TR tem sido próxima de zero desde 2017."
        />

        <div className="mt-5 bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          <strong>Premissa:</strong> Os simuladores usam a taxa de juros mensal informada pelo usuário como taxa nominal mensal. Para converter taxa anual em mensal, usamos a fórmula exponencial: i_mensal = (1 + i_anual)^(1/12) − 1.
        </div>
      </Section>

      {/* 2. Aluguel */}
      <Section id="aluguel" title="2. Aluguel">
        <h3 className="font-semibold text-slate-800 mb-3">Reajuste de aluguel</h3>
        <Formula
          label="Novo valor do aluguel"
          formula="Novo aluguel = Aluguel atual × (1 + variação_índice_período)"
          desc="A variação do índice é calculada como o acúmulo das variações mensais no período contratual (geralmente 12 meses)."
        />
        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          A Lei do Inquilinato (Lei 8.245/91, art. 18) permite que as partes pactuem livremente o índice de reajuste. Os índices disponíveis (IGP-M, IPCA, INPC) são buscados via API do BCB/SGS com as séries históricas completas.
        </p>

        <h3 className="font-semibold text-slate-800 mb-3 mt-4">Tributação do aluguel (Carnê-Leão)</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-3">
          Para pessoas físicas que recebem aluguel, incide o IRPF via carnê-leão mensal, conforme tabela progressiva da Receita Federal vigente em 2026:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Base de cálculo mensal</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Alíquota</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Dedução</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {[
                ["Até R$ 2.259,20", "Isento", "—"],
                ["R$ 2.259,21 a R$ 2.826,65", "7,5%", "R$ 169,44"],
                ["R$ 2.826,66 a R$ 3.751,05", "15%", "R$ 381,44"],
                ["R$ 3.751,06 a R$ 4.664,68", "22,5%", "R$ 662,77"],
                ["Acima de R$ 4.664,68", "27,5%", "R$ 896,00"],
              ].map(([base, aliq, ded]) => (
                <tr key={base} className="border-b border-slate-100">
                  <td className="py-2 px-3">{base}</td>
                  <td className="py-2 px-3">{aliq}</td>
                  <td className="py-2 px-3">{ded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">
          Fonte: Instrução Normativa RFB nº 2.178/2024. Dedutíveis: IPTU, condomínio e seguro quando pagos pelo locador.
        </p>

        <h3 className="font-semibold text-slate-800 mb-3 mt-6">Rescisão antecipada</h3>
        <Formula
          label="Multa proporcional ao tempo restante"
          formula="Multa = Valor_multa_cheia × (meses_restantes / prazo_total)"
          desc="Conforme Art. 4º da Lei 8.245/91. O valor da multa cheia é normalmente 3 aluguéis. Isenção automática por transferência de emprego (Art. 4º, parágrafo único)."
        />
      </Section>

      {/* 3. Impostos */}
      <Section id="impostos" title="3. Impostos e Custos de Transação">
        <h3 className="font-semibold text-slate-800 mb-3">ITBI</h3>
        <Formula
          label="Imposto sobre Transmissão de Bens Imóveis"
          formula="ITBI = Base de cálculo × Alíquota municipal"
          desc="A base de cálculo é o maior valor entre o preço de venda e o valor venal do imóvel fixado pelo município. Alíquotas variam de 0,5% a 5% conforme cada prefeitura."
        />

        <h3 className="font-semibold text-slate-800 mb-3 mt-5">Ganho de Capital</h3>
        <Formula
          label="Base de cálculo"
          formula="Ganho = Valor de venda − Custo de aquisição atualizado − Despesas dedutíveis"
          desc="Despesas dedutíveis: corretagem, ITBI original, escritura, registro e benfeitorias comprovadas."
        />
        <p className="text-slate-600 text-sm leading-relaxed mb-3">
          Alíquotas progressivas conforme Lei 13.259/2016:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Ganho de capital</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Alíquota</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {[
                ["Até R$ 5.000.000", "15%"],
                ["R$ 5.000.001 a R$ 10.000.000", "17,5%"],
                ["R$ 10.000.001 a R$ 30.000.000", "20%"],
                ["Acima de R$ 30.000.000", "22,5%"],
              ].map(([faixa, aliq]) => (
                <tr key={faixa} className="border-b border-slate-100">
                  <td className="py-2 px-3">{faixa}</td>
                  <td className="py-2 px-3 font-semibold">{aliq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Isenções verificadas: único imóvel até R$ 440.000, posse superior a 5 anos com fator de redução, reinvestimento em outro imóvel em 180 dias (art. 39 da Lei 11.196/05).
        </p>

        <h3 className="font-semibold text-slate-800 mb-3 mt-5">ITCMD</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          O ITCMD (Imposto sobre Transmissão Causa Mortis e Doação) é estadual. As alíquotas de todos os 27 estados são aplicadas conforme legislação estadual vigente, com progressividade automática nos estados que adotam a alíquota progressiva (conforme Resolução do Senado nº 9/1992 — teto de 8%).
        </p>
      </Section>

      {/* 4. Investimento */}
      <Section id="investimento" title="4. Investimento Imobiliário">
        <h3 className="font-semibold text-slate-800 mb-3">Cap Rate</h3>
        <Formula
          label="Taxa de capitalização líquida"
          formula="Cap Rate = (Receita anual bruta − Despesas anuais) / Valor do imóvel × 100"
          desc="Despesas consideradas: IPTU, condomínio, manutenção, seguro e vacância estimada. O resultado é comparado com a taxa Selic ao vivo do BCB."
        />

        <h3 className="font-semibold text-slate-800 mb-3 mt-5">TIR — Taxa Interna de Retorno</h3>
        <Formula
          label="Fluxo de caixa descontado"
          formula="0 = −Investimento inicial + Σ [FCₜ / (1 + TIR)ᵗ] + VF / (1 + TIR)ⁿ"
          desc="onde FCₜ = aluguel líquido no período t, VF = valor de venda projetado no horizonte n. A TIR é calculada por método iterativo de Newton-Raphson."
        />

        <h3 className="font-semibold text-slate-800 mb-3 mt-5">Airbnb vs. Aluguel Convencional</h3>
        <Formula
          label="Receita bruta Airbnb"
          formula="Receita = Diária × dias_no_mês × taxa_de_ocupação × (1 − comissão_plataforma)"
          desc="A comissão da Airbnb para anfitriões é de 3% (modalidade split fee). A taxa de ocupação é informada pelo usuário."
        />
        <Formula
          label="Break-even de ocupação"
          formula="Ocupação_mínima = Aluguel_convencional / (Diária × dias_no_mês × (1 − comissão))"
          desc="Taxa de ocupação mínima necessária para o Airbnb superar o aluguel convencional."
        />
      </Section>

      {/* 5. Condomínio */}
      <Section id="condominio" title="5. Condomínio">
        <h3 className="font-semibold text-slate-800 mb-3">Rateio de despesas</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          A calculadora suporta os quatro critérios previstos na Lei 4.591/64 e no Código Civil (art. 1.336):
        </p>
        <div className="space-y-3 mb-4">
          {[
            ["Igualitário", "Cota = Despesa total / Número de unidades"],
            ["Fração ideal", "Cota = Despesa total × (Fração ideal da unidade / Soma das frações ideais)"],
            ["Proporcional à área", "Cota = Despesa total × (Área privativa da unidade / Área total privativa)"],
            ["Misto", "Despesas ordinárias pelo critério A; obras e fundo de reserva pelo critério B"],
          ].map(([nome, formula]) => (
            <div key={nome} className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-slate-700 mb-1">{nome}</p>
              <code className="text-xs text-slate-600 font-mono">{formula}</code>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-slate-800 mb-3 mt-5">Fundo de reserva</h3>
        <Formula
          label="Prazo para atingir a meta"
          formula="n = log(Meta / Saldo_atual) / log(1 + r)  — com rendimento r"
          desc="onde r = taxa de rendimento mensal do fundo (geralmente poupança ou CDB conservador). Sem rendimento, n = (Meta − Saldo) / Contribuição_mensal."
        />
      </Section>

      {/* 6. Fontes */}
      <Section id="dados" title="6. Fontes de Dados Oficiais">
        <p className="text-slate-600 leading-relaxed mb-5">
          Os índices econômicos são consumidos via chamadas à API pública do Banco Central do Brasil (SGS — Sistema Gerenciador de Séries Temporais). Nenhum dado é armazenado no servidor: cada consulta busca o valor mais recente diretamente na fonte.
        </p>
        <div className="space-y-3">
          {[
            { serie: "432", nome: "Taxa Selic efetiva (% a.m.)", url: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432" },
            { serie: "433", nome: "IPCA (variação % mensal)", url: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.433" },
            { serie: "189", nome: "IGP-M (variação % mensal)", url: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.189" },
            { serie: "188", nome: "INPC (variação % mensal)", url: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.188" },
            { serie: "226", nome: "TR (Taxa Referencial % mensal)", url: "https://api.bcb.gov.br/dados/serie/bcdata.sgs.226" },
          ].map(({ serie, nome, url }) => (
            <div key={serie} className="flex items-start justify-between gap-4 bg-slate-50 rounded-lg p-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">{nome}</p>
                <p className="text-xs text-slate-500">Série BCB/SGS {serie}</p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline shrink-0"
              >
                Ver API →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-slate-100 rounded-xl p-5">
          <p className="text-sm font-semibold text-slate-800 mb-2">Legislação de referência</p>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Lei 8.245/1991 — Lei do Inquilinato</li>
            <li>• Lei 9.514/1997 — Financiamento Imobiliário (alienação fiduciária)</li>
            <li>• Lei 4.591/1964 e Código Civil (art. 1.331–1.358) — Condomínios</li>
            <li>• Lei 13.786/2018 — Lei do Distrato</li>
            <li>• Lei 13.259/2016 — Ganho de capital progressivo</li>
            <li>• Resolução CMN 4.676/2018 — Sistemas de amortização</li>
            <li>• IN RFB 2.178/2024 — Tabela IRPF 2026</li>
          </ul>
        </div>
      </Section>

      <div className="mt-4 pt-8 border-t border-slate-100 flex gap-6 text-sm">
        <Link href="/sobre" className="text-slate-500 hover:text-slate-900 transition-colors">← Sobre o CalculaImóvel</Link>
        <Link href="/" className="text-blue-600 hover:underline">Ver todas as calculadoras →</Link>
      </div>
    </div>
  );
}
