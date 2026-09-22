import CoastalContextMap from './CoastalContextMap';
import { getLandingCentrePosition } from '../../lib/mapPositions';
import type { PfzEntry } from '../../types';

export default function MarinePfzPanel({ entries }: { entries: PfzEntry[] }) {
  const markers = entries.map((e) => {
    const pos = getLandingCentrePosition(e.landingCentre);
    return { id: e.id, x: pos.x, y: pos.y, label: e.fishingZone, sublabel: e.distance, tone: 'teal' as const };
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-dashed border-slate-300 bg-surface-alt px-3 py-2 text-xs text-slate-500">
        Fishing zone visualization is a conceptual illustration for presentation purposes and is not geographically accurate.
      </div>
      <CoastalContextMap markers={markers} height={260} caption="Potential fishing zones near landing centres" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((e) => (
          <div key={e.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-navy-900">{e.fishingZone}</p>
            <div className="mt-2 space-y-1 text-xs text-slate-500">
              <p>Depth: <span className="text-navy-700">{e.depth}</span></p>
              <p>Distance: <span className="text-navy-700">{e.distance}</span></p>
              <p>Landing Centre: <span className="text-navy-700">{e.landingCentre}</span></p>
              <p className="text-teal-700">{e.validity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
