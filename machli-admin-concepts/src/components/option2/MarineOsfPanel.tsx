import { useState } from 'react';
import { Wind, Waves, Navigation, Thermometer } from 'lucide-react';
import CoastalContextMap from './CoastalContextMap';
import { getLandingCentrePosition } from '../../lib/mapPositions';
import type { OceanStateForecastEntry } from '../../types';

export default function MarineOsfPanel({ entries }: { entries: OceanStateForecastEntry[] }) {
  const [selectedId, setSelectedId] = useState(entries[0]?.id);
  const selected = entries.find((e) => e.id === selectedId) ?? entries[0];

  const markers = entries.map((e) => {
    const pos = getLandingCentrePosition(e.landingCentre);
    return { id: e.id, x: pos.x, y: pos.y, label: e.landingCentre, sublabel: e.range, tone: 'ocean' as const };
  });

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
      <CoastalContextMap markers={markers} selectedId={selectedId} onSelect={setSelectedId} height={280} />

      {selected && (
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-4">
            <p className="text-sm font-semibold text-navy-900">{selected.landingCentre}</p>
            <p className="text-xs text-slate-500">{selected.dateTime} · {selected.range} range</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <Wind size={15} className="mb-1 text-ocean-600" />
              <p className="text-xs text-slate-400">Wind</p>
              <p className="text-sm font-medium text-navy-800">{selected.wind}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <Waves size={15} className="mb-1 text-ocean-600" />
              <p className="text-xs text-slate-400">Wave</p>
              <p className="text-sm font-medium text-navy-800">{selected.wave}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <Navigation size={15} className="mb-1 text-ocean-600" />
              <p className="text-xs text-slate-400">Ocean Current</p>
              <p className="text-sm font-medium text-navy-800">{selected.current}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <Thermometer size={15} className="mb-1 text-ocean-600" />
              <p className="text-xs text-slate-400">SST</p>
              <p className="text-sm font-medium text-navy-800">{selected.sst}</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs text-slate-400">Forecast Message</p>
            <p className="mt-1 text-sm text-slate-600">{selected.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
