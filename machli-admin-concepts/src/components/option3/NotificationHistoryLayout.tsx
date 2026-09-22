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
    <div className="flex flex-col gap-6">
      <PageHeader title="Notification History" subtitle="Delivery summary and full communication record" breadcrumb="Notification History" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-2xl font-semibold text-navy-900">{vm.bySource.manual}</p>
          <p className="text-xs text-slate-500">Manual Notifications</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-2xl font-semibold text-navy-900">{vm.bySource.incois}</p>
          <p className="text-xs text-slate-500">INCOIS Notifications</p>
        </div>
        {vm.byStatus.slice(0, 2).map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-2xl font-semibold text-navy-900">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <FilterBar>
        <FilterSelect label="Source" value={vm.source} onChange={vm.setSource} options={['Manual', 'INCOIS']} />
        <FilterSelect label="State" value={vm.state} onChange={vm.setState} options={statesDistricts.map((s) => s.state)} />
        <FilterSelect label="District" value={vm.district} onChange={vm.setDistrict} options={vm.districts} />
        <FilterSelect label="Status" value={vm.status} onChange={vm.setStatus} options={vm.statuses} />
        <FilterSelect label="Date" value={vm.date} onChange={vm.setDate} options={vm.dates} />
      </FilterBar>

      <DataTable columns={columns} rows={vm.filtered} density="spacious" />

      {vm.selected && <NotificationDetailModal record={vm.selected} onClose={() => vm.setSelected(null)} />}
    </div>
  );
}
