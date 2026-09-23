import type { FeedbackSource } from '../../types';

export default function AppMetricCard({ label, value, source, note, option }: {
  label: string;
  value: string | number;
  source: FeedbackSource;
  note?: string;
  option?: string;
}) {
  return (
    <div className={`min-w-0 rounded-xl border bg-white shadow-sm ${option === 'option-2' ? 'border-teal-500/25 border-t-2 p-4' : option === 'option-3' ? 'border-slate-200 p-5' : 'border-slate-200 p-3'}`}>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className={`mt-2 break-words font-semibold text-navy-900 ${option === 'option-3' ? 'text-2xl' : 'text-xl'}`}>{typeof value === 'number' ? value.toLocaleString('en-IN') : value}</p>
      <p className={`mt-2 text-[11px] font-medium ${source === 'Google Play' ? 'text-ocean-600' : 'text-teal-600'}`}>Source: {source}</p>
      {note && <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{note}</p>}
    </div>
  );
}
