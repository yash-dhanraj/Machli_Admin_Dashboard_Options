export default function ReadOnlyField({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`mt-1 rounded-lg border border-slate-200 bg-surface-alt text-navy-800 ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'}`}>
        {value}
      </p>
    </div>
  );
}
