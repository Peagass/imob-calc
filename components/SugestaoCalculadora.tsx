"use client";

import { useState } from "react";
import { Lightbulb, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type Status = "idle" | "loading" | "success" | "error";

export default function SugestaoCalculadora() {
  const [sugestao, setSugestao] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sugestao.trim()) return;

    setStatus("loading");

    const body = new URLSearchParams({
      "form-name": "sugestao-calculadora",
      sugestao: sugestao.trim(),
      email: email.trim(),
    });

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (res.ok) {
        setStatus("success");
        setSugestao("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Formulário oculto para o Netlify detectar em build */}
      <form name="sugestao-calculadora" data-netlify="true" hidden>
        <input type="text" name="sugestao" />
        <input type="email" name="email" />
      </form>

      <div className="mt-10 rounded-2xl p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Texto */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Faltou alguma?
              </span>
            </div>
            <h2 className="text-xl font-bold mb-2">
              Não encontrou a calculadora certa?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Se você chegou aqui procurando algo que ainda não existe, nos conta. Revisamos todas as sugestões e implementamos as que fazem mais sentido.
            </p>
            <Link
              href="/blog/o-que-nao-conseguimos-calcular"
              className="inline-block mt-3 text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 transition-colors"
            >
              Por que algumas calculadoras não existem?
            </Link>
          </div>

          {/* Formulário */}
          <div className="flex-1 min-w-0">
            {status === "success" ? (
              <div className="flex items-center gap-3 bg-slate-700/50 rounded-xl p-5">
                <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Sugestão enviada!</p>
                  <p className="text-slate-400 text-sm">Obrigado — vamos analisar em breve.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  value={sugestao}
                  onChange={(e) => setSugestao(e.target.value)}
                  placeholder="Ex: calculadora de aluguel por temporada no interior, simulador de herança com holding..."
                  rows={3}
                  required
                  className="w-full rounded-xl bg-slate-700/60 border border-slate-600 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 resize-none"
                />
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu e-mail (opcional)"
                    className="flex-1 rounded-xl bg-slate-700/60 border border-slate-600 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || !sugestao.trim()}
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    {status === "loading" ? "Enviando..." : "Enviar"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-xs">
                    Erro ao enviar. Tente novamente ou mande para contato@calculaimovel.com.br
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
