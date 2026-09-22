import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export default function InfoCard({
  title,
  description,
  icon: Icon,
  onView,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  onView?: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-ocean-400/60 hover:shadow-md">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
        <Icon size={18} strokeWidth={2} />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-navy-900">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={onView}
        className="mt-auto flex items-center gap-1 text-xs font-medium text-ocean-600 hover:text-ocean-500"
      >
        View <ArrowRight size={13} />
      </button>
    </div>
  );
}
