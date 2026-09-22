import { Anchor, Map } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import KpiCard from '../cards/KpiCard';
import LandingCentreShortcuts from '../shared/LandingCentreShortcuts';
import DataTable, { type Column } from '../tables/DataTable';
import type { LandingCentresVm } from '../../hooks/useLandingCentres';
import type { LandingCentre } from '../../types';

export default function LandingCentresLayout({ vm }: { vm: LandingCentresVm }) {
  const columns: Column<LandingCentre>[] = [
    { header: 'Name', render: (r) => <span className="font-medium text-navy-800">{r.name}</span> },
    { header: 'FLC / Location ID', render: (r) => r.flcId },
    { header: 'State', render: (r) => r.state },
    { header: 'District', render: (r) => r.district },
    { header: 'Location', render: (r) => r.location },
    {
      header: 'Action',
      render: (r) => (
        <button onClick={() => vm.setSelectedId(r.id)} className="text-xs font-medium text-ocean-600 hover:text-ocean-500">
          View Links
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Landing Centres / Nearby Ports" subtitle="Registered fish landing centres and ports" breadcrumb="Landing Centres" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard label="Landing Centres" value={vm.landingCentres.length} icon={Anchor} tone="ocean" />
        <KpiCard label="States Covered" value={vm.groupedByState.length} icon={Map} tone="teal" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_300px]">
        <DataTable columns={columns} rows={vm.landingCentres} density="spacious" />

        <div className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          {vm.selected ? (
            <>
              <p className="text-sm font-semibold text-navy-900">{vm.selected.name}</p>
              <p className="mb-3 text-xs text-slate-400">{vm.selected.flcId}</p>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Quick Navigation</p>
              <LandingCentreShortcuts />
            </>
          ) : (
            <p className="text-sm text-slate-400">Select "View Links" on a landing centre.</p>
          )}
        </div>
      </div>
    </div>
  );
}
