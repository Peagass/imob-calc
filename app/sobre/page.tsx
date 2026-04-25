import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { Calculator, BookOpen, RefreshCw, ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: "Sobre o CalculaImóvel | Calculadoras Imobiliárias Gratuitas" },
  description:
    "Conheça o CalculaImóvel: 40 calculadoras gratuitas para brasileiros tomarem decisões imobiliárias com base em dados reais do Banco Central.",
  alternates: { canonical: `${SITE_URL}/sobre` },
  openGraph: {
    title: "Sobre o CalculaImóvel",
    description: "40 calculadoras imobiliárias gratuitas com dados atualizados do Banco Central do Brasil.",
    url: `${SITE_URL}/sobre`,
    type: "website",
  },
};

const sobreSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Sobre o CalculaImóvel",
  url: `${SITE_URL}/sobre`,
  description: "Página institucional do CalculaImóvel — missão, fontes de dados e metodologia geral.",
  mainEntity: {
    "@type": "Organization",
    name: "CalculaImóvel",
    url: SITE_URL,
    description: "Plataforma gratuita de calculadoras imobiliárias para brasileiros.",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    foundingDate: "2024",
    areaServed: "BR",
    inLanguage: "pt-BR",
  },
};

export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sobreSchema) }}
      />

      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Institucional</span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
          Sobre o CalculaImóvel
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          Uma plataforma gratuita criada para ajudar brasileiros a entender os números por trás de cada decisão imobiliária — antes de assinar qualquer contrato.
        </p>
      </div>

      {/* Missão */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">Nossa missão</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          O mercado imobiliário brasileiro é cheio de siglas, índices e cláusulas que a maioria das pessoas não tem tempo de entender. Um financiamento mal comparado pode custar dezenas de milhares de reais a mais em juros. Um aluguel reajustado pelo índice errado pode virar motivo de ação judicial. Uma herança sem planejamento pode consumir meses de inventário e uma fatia significativa do patrimônio.
        </p>
        <p className="text-slate-600 leading-relaxed">
          O CalculaImóvel existe para reduzir essa assimetria de informação. Aqui você encontra calculadoras simples, precisas e sem cadastro, que traduzem fórmulas financeiras complexas em números concretos para o seu caso específico.
        </p>
      </section>

      {/* O que oferecemos */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">O que oferecemos</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: Calculator,
              title: "40 calculadoras gratuitas",
              desc: "Cobrindo compra, financiamento, aluguel, reforma, investimento, herança e condomínio — sem cadastro, sem cobrança.",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              icon: RefreshCw,
              title: "Dados atualizados automaticamente",
              desc: "Índices como Selic, IPCA, IGP-M, INPC e TR são buscados diretamente da API pública do Banco Central do Brasil (BCB/SGS).",
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              icon: BookOpen,
              title: "Guias explicativos",
              desc: "Cada calculadora é acompanhada de um guia que explica a fórmula usada, exemplos reais e o que fazer com o resultado.",
              color: "text-violet-600",
              bg: "bg-violet-50",
            },
            {
              icon: ShieldCheck,
              title: "Cálculos sem viés",
              desc: "Os números mostram a realidade — mesmo quando o resultado não favorece nenhuma das opções. Nenhuma parceria comercial influencia as fórmulas ou os resultados das calculadoras.",
              color: "text-slate-600",
              bg: "bg-slate-50",
            },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className={`${bg} rounded-xl p-5`}>
              <Icon className={`w-5 h-5 ${color} mb-3`} />
              <p className="font-semibold text-slate-900 text-sm mb-1">{title}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fontes de dados */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Fontes e atualização de dados</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          Todos os índices econômicos usados nas calculadoras vêm de fontes oficiais brasileiras. Nenhum dado é inventado ou estimado arbitrariamente.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 pr-4 font-semibold text-slate-700">Dado</th>
                <th className="text-left py-2 pr-4 font-semibold text-slate-700">Fonte oficial</th>
                <th className="text-left py-2 font-semibold text-slate-700">Frequência</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {[
                ["Taxa Selic", "Banco Central do Brasil (BCB/SGS série 432)", "Reunião do COPOM (~45 dias)"],
                ["IPCA", "IBGE via BCB (série 433)", "Mensal"],
                ["IGP-M", "FGV via BCB (série 189)", "Mensal"],
                ["INPC", "IBGE via BCB (série 188)", "Mensal"],
                ["TR (Taxa Referencial)", "BCB (série 226)", "Mensal"],
                ["INCC", "FGV (referência de mercado)", "Mensal"],
                ["ITBI e alíquotas estaduais", "Legislação municipal e estadual vigente", "Conforme alteração"],
                ["Tabela IRPF e isenções", "Receita Federal (Lei 9.250/95 e atualizações)", "Conforme alteração"],
              ].map(([dado, fonte, freq]) => (
                <tr key={dado} className="border-b border-slate-100">
                  <td className="py-2.5 pr-4 font-medium">{dado}</td>
                  <td className="py-2.5 pr-4 text-slate-500">{fonte}</td>
                  <td className="py-2.5 text-slate-500">{freq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Aviso */}
      <section className="mb-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h2 className="text-base font-bold text-amber-900 mb-2">Aviso importante</h2>
        <p className="text-amber-800 text-sm leading-relaxed">
          O CalculaImóvel é uma ferramenta <strong>educacional</strong>. Os resultados são estimativas baseadas nas informações fornecidas pelo usuário e nos dados disponíveis na data de consulta. Os valores reais podem variar conforme a análise individual de cada instituição financeira, cartório ou órgão competente.
        </p>
        <p className="text-amber-800 text-sm leading-relaxed mt-2">
          <strong>O CalculaImóvel não substitui a consultoria de um profissional financeiro, bancário, contábil ou jurídico.</strong> Antes de tomar decisões que envolvam grandes valores ou compromissos de longo prazo, consulte um especialista habilitado.
        </p>
      </section>

      {/* Metodologia e contato */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Transparência e metodologia</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Cada calculadora é desenvolvida com base nas fórmulas oficiais e na legislação brasileira vigente. Detalhamos as fórmulas, as premissas e as fontes utilizadas em cada ferramenta na nossa página de metodologia.
        </p>
        <Link
          href="/metodologia"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline text-sm"
        >
          Ver metodologia das calculadoras →
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Contato</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Encontrou um erro de cálculo, uma alíquota desatualizada ou tem uma sugestão de nova calculadora? Fale conosco.
        </p>
        <a
          href="mailto:contato@calculaimovel.com.br"
          className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors"
        >
          <Mail className="w-4 h-4" />
          contato@calculaimovel.com.br
        </a>
      </section>
    </div>
  );
}
