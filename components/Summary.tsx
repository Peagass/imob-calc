interface Props {
  children: React.ReactNode;
}

export default function Summary({ children }: Props) {
  return (
    <div className="article-summary not-prose my-6 bg-slate-50 border-l-4 border-indigo-500 rounded-r-xl px-5 py-4 text-slate-700 text-base leading-relaxed">
      {children}
    </div>
  );
}
