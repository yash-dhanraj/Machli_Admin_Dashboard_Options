import { Waves, MapPinned, Fish, Satellite, Moon } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import DataTable from '../tables/DataTable';
import AdvisoryList from '../shared/AdvisoryList';
import { osfColumns, pfzColumns, solunarColumns } from '../shared/marineColumns';
import { MARINE_TABS } from '../../hooks/useMarineInformation';
import type { MarineInformationVm } from '../../hooks/useMarineInformation';

const TAB_ICONS = { osf: Waves, pfz: MapPinned, tuna: Fish, svas: Satellite, solunar: Moon } as const;

export default function MarineInformationLayout({ vm }: { vm: MarineInformationVm }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Marine Information" subtitle="Overview of marine advisory categories" breadcrumb="Marine Information" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {MARINE_TABS.map((t) => {
          const Icon = TAB_ICONS[t.id as keyof typeof TAB_ICONS];
          const active = vm.tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => vm.setTab(t.id)}
              className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left shadow-sm transition ${
                active ? 'border-ocean-500 bg-ocean-500/5' : 'border-slate-200 bg-white hover:border-ocean-300'
              }`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${active ? 'bg-ocean-500/15 text-ocean-700' : 'bg-surface-alt text-slate-500'}`}>
                <Icon size={17} />
              </span>
              <p className="text-2xl font-semibold text-navy-900">{vm.counts[t.id as keyof typeof vm.counts]}</p>
              <p className="text-xs text-slate-500">{t.label}</p>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-navy-900">{MARINE_TABS.find((t) => t.id === vm.tab)?.label}</h3>
        {vm.tab === 'osf' && <DataTable columns={osfColumns} rows={vm.oceanStateForecasts} density="spacious" />}
        {vm.tab === 'pfz' && (
          <div className="space-y-4">
            <div className="rounded-lg border border-dashed border-slate-300 bg-surface-alt px-4 py-3 text-xs text-slate-500">
              Fishing zone visualization is a conceptual illustration for presentation purposes and is not geographically accurate.
            </div>
            <DataTable columns={pfzColumns} rows={vm.pfzEntries} density="spacious" />
          </div>
        )}
        {vm.tab === 'tuna' && <AdvisoryList data={vm.tunaFishingAdvisories} />}
        {vm.tab === 'svas' && <AdvisoryList data={vm.svasAdvisories} />}
        {vm.tab === 'solunar' && <DataTable columns={solunarColumns} rows={vm.solunarEntries} density="spacious" />}
      </div>
    </div>
  );
}
