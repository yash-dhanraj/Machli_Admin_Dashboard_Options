import type { LucideIcon } from 'lucide-react';

export default function KpiCard({
  label,
  value,
  icon: Icon,
  tone = 'ocean',
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: 'ocean' | 'teal' | 'navy' | 'warning' | 'danger';
}) {
  const toneClasses: Record<string, string> = {
    ocean: 'bg-ocean-500/10 text-ocean-600',
    teal: 'bg-teal-500/10 text-teal-600',
    navy: 'bg-navy-700/10 text-navy-700',
    warning: 'bg-status-warning-bg text-status-warning',
    danger: 'bg-status-danger-bg text-status-danger',
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
          <Icon size={16} strokeWidth={2} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-navy-900">{value}</p>
    </div>
  );
}
