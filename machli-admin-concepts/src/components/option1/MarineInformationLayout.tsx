import PageHeader from '../layout/PageHeader';
import Tabs from '../navigation/Tabs';
import DataTable from '../tables/DataTable';
import AdvisoryList from '../shared/AdvisoryList';
import { osfColumns, pfzColumns, solunarColumns } from '../shared/marineColumns';
import { MARINE_TABS } from '../../hooks/useMarineInformation';
import type { MarineInformationVm } from '../../hooks/useMarineInformation';

export default function MarineInformationLayout({ vm }: { vm: MarineInformationVm }) {
  return (
    <div className="flex flex-col gap-3">
      <PageHeader title="Marine Information" subtitle="Read-only marine advisory information" breadcrumb="Marine Information" />

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="px-3 pt-1.5">
          <Tabs
            tabs={MARINE_TABS.map((t) => ({ ...t, count: vm.counts[t.id as keyof typeof vm.counts] }))}
            active={vm.tab}
            onChange={vm.setTab}
          />
        </div>
        <div className="p-3">
          {vm.tab === 'osf' && <DataTable columns={osfColumns} rows={vm.oceanStateForecasts} density="compact" />}
          {vm.tab === 'pfz' && (
            <div className="space-y-3">
              <div className="rounded-lg border border-dashed border-slate-300 bg-surface-alt px-3 py-2 text-xs text-slate-500">
                Fishing zone visualization is a conceptual illustration for presentation purposes and is not geographically accurate.
              </div>
              <DataTable columns={pfzColumns} rows={vm.pfzEntries} density="compact" />
            </div>
          )}
          {vm.tab === 'tuna' && <AdvisoryList data={vm.tunaFishingAdvisories} />}
          {vm.tab === 'svas' && <AdvisoryList data={vm.svasAdvisories} />}
          {vm.tab === 'solunar' && <DataTable columns={solunarColumns} rows={vm.solunarEntries} density="compact" />}
        </div>
      </div>
    </div>
  );
}
