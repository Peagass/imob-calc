export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-slate-400">
        <p className="font-semibold text-slate-500 mb-1">CalcImóvel</p>
        <p>Os valores são estimativas educacionais. Consulte um especialista antes de tomar decisões financeiras.</p>
        <p className="mt-2">© {new Date().getFullYear()} CalcImóvel · Feito para brasileiros que querem entender o mercado imobiliário</p>
      </div>
    </footer>
  );
}
