"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronDown, Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";

const grupos = [
  {
    label: "Compra",
    links: [
      { href: "/custos-compra",         label: "Custos de Compra" },
      { href: "/mcmv",                   label: "Minha Casa Minha Vida" },
      { href: "/financiamento",          label: "Simulador de Financiamento" },
      { href: "/poupanca-entrada",       label: "Poupança para a Entrada" },
      { href: "/quanto-posso-financiar", label: "Quanto Posso Financiar?" },
      { href: "/planta-vs-pronto",       label: "Planta vs. Pronto" },
      { href: "/fgts",                   label: "Simulador de FGTS" },
      { href: "/amortizacao-extra",      label: "Amortização Extraordinária" },
      { href: "/portabilidade",               label: "Portabilidade" },
      { href: "/consorcio",                   label: "Consórcio vs. Financiamento" },
      { href: "/comparador-financiamento",    label: "Comparador de Financiamentos" },
      { href: "/renegociacao-financiamento",  label: "Renegociação de Financiamento" },
      { href: "/distrato",                    label: "Distrato de Imóvel na Planta" },
      { href: "/custo-mudanca",               label: "Custo de Mudança" },
    ],
  },
  {
    label: "Aluguel",
    links: [
      { href: "/comprar-ou-alugar",      label: "Comprar ou Alugar?" },
      { href: "/reajuste-aluguel",       label: "Reajuste de Aluguel" },
      { href: "/tributacao-aluguel",     label: "Tributação do Aluguel" },
      { href: "/rescisao-aluguel",       label: "Rescisão Antecipada" },
      { href: "/quanto-cobrar-aluguel",  label: "Quanto Cobrar?" },
      { href: "/fluxo-caixa-imovel",     label: "Fluxo de Caixa do Proprietário" },
      { href: "/seguro-fianca",          label: "Seguro Fiança vs. Caução" },
    ],
  },
  {
    label: "Reforma",
    links: [
      { href: "/estimativa-reforma", label: "Estimativa de Reforma" },
      { href: "/retorno-reforma",    label: "Retorno da Reforma" },
    ],
  },
  {
    label: "Venda & Herança",
    links: [
      { href: "/ganho-capital",   label: "Ganho de Capital" },
      { href: "/lucro-venda",     label: "Lucro Líquido na Venda" },
      { href: "/itcmd",           label: "ITCMD" },
      { href: "/permuta-imovel",  label: "Permuta de Imóvel" },
    ],
  },
  {
    label: "Investimento",
    links: [
      { href: "/imovel-vs-renda-fixa", label: "Imóvel vs. Renda Fixa" },
      { href: "/tir-imovel",           label: "TIR do Imóvel" },
      { href: "/cap-rate",             label: "Cap Rate" },
      { href: "/fii-vs-imovel",        label: "FII vs. Imóvel" },
      { href: "/airbnb-vs-aluguel",    label: "Airbnb vs. Aluguel" },
      { href: "/leilao-imovel",        label: "Leilão de Imóvel" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-blue-700 shrink-0 mr-2">
          <Home size={20} />
          <span>CalculaImóvel</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {grupos.map((grupo) => {
            const ativo = grupo.links.some((l) => l.href === pathname);
            return (
              <div key={grupo.label} className="relative group">
                <button
                  className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    ativo ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {grupo.label}
                  <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all group-hover:rotate-180" />
                </button>

                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 w-52 z-50">
                  {grupo.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        pathname === l.href
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <Link
            href="/blog"
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              pathname.startsWith("/blog") ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Blog
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden ml-auto p-2 text-slate-500 hover:text-slate-900"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white max-h-[80vh] overflow-y-auto">
          {grupos.map((grupo) => (
            <div key={grupo.label} className="border-b border-slate-50">
              <p className="px-4 pt-3 pb-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {grupo.label}
              </p>
              {grupo.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    pathname === l.href
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="border-b border-slate-50">
            <p className="px-4 pt-3 pb-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Conteúdo
            </p>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                pathname.startsWith("/blog")
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
