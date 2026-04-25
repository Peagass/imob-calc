import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-slate-400">
        <p className="font-semibold text-slate-500 mb-1">CalculaImóvel</p>
        <p>Os valores são estimativas educacionais. Consulte um especialista antes de tomar decisões financeiras.</p>
        <div className="mt-3 flex justify-center gap-4 text-slate-400">
          <Link href="/sobre" className="hover:text-slate-600 transition-colors">Sobre</Link>
          <Link href="/metodologia" className="hover:text-slate-600 transition-colors">Metodologia</Link>
          <a href="mailto:contato@calculaimovel.com.br" className="hover:text-slate-600 transition-colors">Contato</a>
        </div>
        <p className="mt-3">© {new Date().getFullYear()} CalculaImóvel · Feito para brasileiros que querem entender o mercado imobiliário</p>
      </div>
    </footer>
  );
}
