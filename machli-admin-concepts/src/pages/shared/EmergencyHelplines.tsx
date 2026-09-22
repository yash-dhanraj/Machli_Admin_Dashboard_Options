import { useParams } from 'react-router-dom';
import { PhoneCall, Globe2, Map, MapPinned } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import KpiCard from '../../components/cards/KpiCard';
import CoastalContextMap, { type MapMarker } from '../../components/option2/CoastalContextMap';
import { getMapPosition } from '../../lib/mapPositions';
import { helplines } from '../../data/mockData';

function HelplineGroup({ title, items, spacious = false }: { title: string; items: typeof helplines; spacious?: boolean }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-navy-900">{title}</h3>
      <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${spacious ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
        {items.map((h) => (
          <div key={h.name} className={`flex items-start gap-3 rounded-xl border border-slate-200 bg-white shadow-sm ${spacious ? 'p-5' : 'p-3.5'}`}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
              <PhoneCall size={16} />
            </span>
            <div>
              <p className="text-sm font-medium text-navy-800">{h.name}</p>
              {(h.state || h.district) && (
                <p className="text-xs text-slate-400">{[h.district, h.state].filter(Boolean).join(', ')}</p>
              )}
              <p className="mt-1 text-base font-semibold text-ocean-600">{h.number}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EmergencyHelplines() {
  const { option } = useParams<{ option: string }>();
  const isOpt2 = option === 'option-2';
  const isOpt3 = option === 'option-3';

  const national = helplines.filter((h) => h.scope === 'National');
  const state = helplines.filter((h) => h.scope === 'State');
  const district = helplines.filter((h) => h.scope === 'District / Local');

  const markers: MapMarker[] = helplines
    .filter((h) => h.state)
    .map((h) => {
      const pos = getMapPosition(h.state!, h.district);
      return { id: h.name, x: pos.x, y: pos.y, label: h.name, sublabel: h.number, tone: h.scope === 'National' ? 'danger' : 'teal' };
    });

  return (
    <div className={`flex flex-col ${isOpt3 ? 'gap-6' : isOpt2 ? 'gap-5' : 'gap-4'}`}>
      <PageHeader title="Emergency & Helplines" subtitle="Emergency contact numbers for coastal and marine safety" breadcrumb="Emergency & Helplines" />

      {isOpt3 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <KpiCard label="National Helplines" value={national.length} icon={Globe2} tone="navy" />
          <KpiCard label="State Helplines" value={state.length} icon={Map} tone="ocean" />
          <KpiCard label="District / Local" value={district.length} icon={MapPinned} tone="teal" />
        </div>
      )}

      {isOpt2 && <CoastalContextMap markers={markers} height={240} caption="Helpline coverage by state and district" />}

      <HelplineGroup title="National Helpline" items={national} spacious={isOpt3} />
      <HelplineGroup title="State Helplines" items={state} spacious={isOpt3} />
      <HelplineGroup title="District / Local Helplines" items={district} spacious={isOpt3} />
    </div>
  );
}
