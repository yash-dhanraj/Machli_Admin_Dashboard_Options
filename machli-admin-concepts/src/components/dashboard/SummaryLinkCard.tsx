import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Stat {
  label: string;
  value: string | number;
}

export default function SummaryLinkCard({
  title,
  icon: Icon,
  stats,
  path,
}: {
  title: string;
  icon: LucideIcon;
  stats: Stat[];
  path: string;
}) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
          <Icon size={16} className="text-ocean-600" />
          {title}
        </h3>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-lg font-semibold text-navy-900">{stat.value}</p>
            <p className="text-[11px] text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate(`/${option}/${path}`)}
        className="mt-4 flex items-center gap-1 text-xs font-medium text-ocean-600 hover:text-ocean-500"
      >
        View details <ArrowRight size={13} />
      </button>
    </div>
  );
}
