import { useNavigate, useParams } from 'react-router-dom';
import { ClipboardCheck } from 'lucide-react';
import { incoisItems } from '../../data/mockData';
import StatusBadge from '../cards/StatusBadge';

export default function IncoisQueueList({ limit = 4, compact = false }: { limit?: number; compact?: boolean }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();
  const pending = incoisItems.filter((i) => i.verificationStatus === 'Pending Verification').slice(0, limit);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
          <ClipboardCheck size={16} className="text-ocean-600" />
          INCOIS Items Requiring Verification
        </h3>
        <button
          onClick={() => navigate(`/${option}/incois-verification`)}
          className="text-xs font-medium text-ocean-600 hover:text-ocean-500"
        >
          View all
        </button>
      </div>
      <ul className="divide-y divide-slate-100">
        {pending.map((item, idx) => (
          <li key={item.id} className={`flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${compact ? 'py-2.5' : ''}`}>
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-alt text-xs font-semibold text-slate-500">
                {idx + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-navy-900">{item.alertType}</p>
                <p className="text-xs text-slate-500">
                  {item.state} &middot; {item.district}
                </p>
                <p className="text-xs text-slate-400">
                  Valid: {item.validityFrom} &ndash; {item.validityTo}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-9 sm:pl-0">
              <StatusBadge status={item.verificationStatus} />
              <button
                onClick={() => navigate(`/${option}/incois-verification/${item.id}`)}
                className="whitespace-nowrap rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-navy-800"
              >
                Cross Verify
              </button>
            </div>
          </li>
        ))}
        {pending.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-slate-400">No items pending verification.</li>
        )}
      </ul>
    </div>
  );
}
