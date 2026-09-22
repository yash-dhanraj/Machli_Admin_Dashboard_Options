import CoastalContextMap from './CoastalContextMap';
import { getPositionByLocationName } from '../../lib/mapPositions';
import type { AdvisoryEntry } from '../../types';

export default function MarineAdvisoryMapPanel({ entries, caption }: { entries: AdvisoryEntry[]; caption: string }) {
  const markers = entries.map((e) => {
    const pos = getPositionByLocationName(e.location);
    return { id: e.id, x: pos.x, y: pos.y, label: e.location, sublabel: e.date, tone: 'teal' as const };
  });

  return (
    <div className="flex flex-col gap-4">
      <CoastalContextMap markers={markers} height={240} caption={caption} />
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-navy-800">{entry.location}</p>
              <span className="text-xs text-slate-400">{entry.date}</span>
            </div>
            <p className="mt-1.5 text-sm text-slate-600">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
