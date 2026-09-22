import type { AdvisoryEntry } from '../../types';

export default function AdvisoryList({ data }: { data: AdvisoryEntry[] }) {
  return (
    <ul className="space-y-3">
      {data.map((entry) => (
        <li key={entry.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-navy-800">{entry.location}</p>
            <span className="text-xs text-slate-400">{entry.date}</span>
          </div>
          <p className="mt-1.5 text-sm text-slate-600">{entry.message}</p>
        </li>
      ))}
    </ul>
  );
}
