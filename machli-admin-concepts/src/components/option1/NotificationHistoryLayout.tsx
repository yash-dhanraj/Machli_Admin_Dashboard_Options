import PageHeader from '../layout/PageHeader';
import { FilterBar, FilterSelect } from '../forms/FilterBar';
import DataTable from '../tables/DataTable';
import NotificationDetailModal from '../shared/NotificationDetailModal';
import { getNotificationColumns } from '../shared/notificationColumns';
import { statesDistricts } from '../../data/mockData';
import type { NotificationHistoryVm } from '../../hooks/useNotificationHistory';

export default function NotificationHistoryLayout({ vm }: { vm: NotificationHistoryVm }) {
  const columns = getNotificationColumns(vm.setSelected);

  return (
    <div className="flex flex-col gap-3">
      <PageHeader title="Notification History" subtitle="Full record of manual and INCOIS notifications" breadcrumb="Notification History" />

      <FilterBar compact>
        <FilterSelect compact label="Source" value={vm.source} onChange={vm.setSource} options={['Manual', 'INCOIS']} />
        <FilterSelect compact label="State" value={vm.state} onChange={vm.setState} options={statesDistricts.map((s) => s.state)} />
        <FilterSelect compact label="District" value={vm.district} onChange={vm.setDistrict} options={vm.districts} />
        <FilterSelect compact label="Status" value={vm.status} onChange={vm.setStatus} options={vm.statuses} />
        <FilterSelect compact label="Date" value={vm.date} onChange={vm.setDate} options={vm.dates} />
      </FilterBar>

      <p className="text-xs text-slate-400">{vm.filtered.length} of {vm.total} notifications shown</p>

      <DataTable columns={columns} rows={vm.filtered} density="compact" />

      {vm.selected && <NotificationDetailModal record={vm.selected} onClose={() => vm.setSelected(null)} />}
    </div>
  );
}
