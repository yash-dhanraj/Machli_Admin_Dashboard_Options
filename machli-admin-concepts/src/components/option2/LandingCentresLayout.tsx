import { Anchor, MapPin } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import LandingCentreShortcuts from '../shared/LandingCentreShortcuts';
import CoastalContextMap, { type MapMarker } from './CoastalContextMap';
import type { LandingCentresVm } from '../../hooks/useLandingCentres';

export default function LandingCentresLayout({ vm }: { vm: LandingCentresVm }) {
  const markers: MapMarker[] = vm.landingCentres.map((lc) => ({
    id: lc.id,
    x: lc.x,
    y: lc.y,
    label: lc.name,
    sublabel: lc.district,
    tone: 'teal',
  }));

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Landing Centres / Nearby Ports" subtitle="Coastal landing centres and quick marine access" breadcrumb="Landing Centres" />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <CoastalContextMap markers={markers} selectedId={vm.selectedId} onSelect={vm.setSelectedId} height={300} />

        <div className="h-fit rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 shadow-sm">
          {vm.selected ? (
            <>
              <div className="flex items-center gap-2.5 border-b border-teal-500/20 pb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/15 text-teal-700">
                  <Anchor size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{vm.selected.name}</p>
                  <p className="text-xs text-slate-500">{vm.selected.flcId} · {vm.selected.location}</p>
                </div>
              </div>
              <p className="mb-2 mt-3 text-xs font-medium uppercase tracking-wide text-teal-700">Quick Marine Links</p>
              <LandingCentreShortcuts />
            </>
          ) : (
            <p className="text-sm text-slate-400">Select a landing centre on the map.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {vm.groupedByState.map(({ state, items }) => (
          <div key={state}>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal-700">
              <MapPin size={13} /> {state}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((lc) => (
                <button
                  key={lc.id}
                  onClick={() => vm.setSelectedId(lc.id)}
                  className={`rounded-xl border p-4 text-left shadow-sm transition ${
                    vm.selectedId === lc.id ? 'border-teal-500 bg-teal-500/5' : 'border-slate-200 bg-white hover:border-teal-300'
                  }`}
                >
                  <p className="text-sm font-semibold text-navy-900">{lc.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{lc.flcId}</p>
                  <p className="mt-2 text-xs text-slate-400">{lc.district}, {lc.state}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
