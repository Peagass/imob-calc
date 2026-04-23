"use client";

import { useState, useRef } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  label: string;
  id: string;
  placeholder?: string;
  hint?: string;
}

export default function CurrencyInput({ value, onChange, label, id, placeholder = "R$ 0,00", hint }: Props) {
  const [display, setDisplay] = useState(value > 0 ? formatBRL(value) : "");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    const numeric = raw ? parseInt(raw, 10) / 100 : 0;
    setDisplay(raw ? formatBRL(numeric) : "");
    onChange(numeric);
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1.5">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 bg-white transition-all"
      />
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
