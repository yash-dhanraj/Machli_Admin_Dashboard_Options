import PageHeader from '../layout/PageHeader';
import Tabs from '../navigation/Tabs';
import MarineOsfPanel from './MarineOsfPanel';
import MarinePfzPanel from './MarinePfzPanel';
import MarineAdvisoryMapPanel from './MarineAdvisoryMapPanel';
import MarineTidePanel from './MarineTidePanel';
import { MARINE_TABS } from '../../hooks/useMarineInformation';
import type { MarineInformationVm } from '../../hooks/useMarineInformation';

export default function MarineInformationLayout({ vm }: { vm: MarineInformationVm }) {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Marine Information" subtitle="Coastal marine advisory intelligence" breadcrumb="Marine Information" />

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 pt-2">
          <Tabs
            tabs={MARINE_TABS.map((t) => ({ ...t, count: vm.counts[t.id as keyof typeof vm.counts] }))}
            active={vm.tab}
            onChange={vm.setTab}
          />
        </div>
        <div className="p-4">
          {vm.tab === 'osf' && <MarineOsfPanel entries={vm.oceanStateForecasts} />}
          {vm.tab === 'pfz' && <MarinePfzPanel entries={vm.pfzEntries} />}
          {vm.tab === 'tuna' && <MarineAdvisoryMapPanel entries={vm.tunaFishingAdvisories} caption="Tuna fishing advisory locations" />}
          {vm.tab === 'svas' && <MarineAdvisoryMapPanel entries={vm.svasAdvisories} caption="Satellite advisory locations" />}
          {vm.tab === 'solunar' && <MarineTidePanel entries={vm.solunarEntries} />}
        </div>
      </div>
    </div>
  );
}
