import { MapPin } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import { FilterBar, FilterSelect } from '../forms/FilterBar';
import StatusBadge from '../cards/StatusBadge';
import NotificationDetailModal from '../shared/NotificationDetailModal';
import { statesDistricts } from '../../data/mockData';
import type { NotificationHistoryVm } from '../../hooks/useNotificationHistory';

export default function NotificationHistoryLayout({ vm }: { vm: NotificationHistoryVm }) {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Notification History" subtitle="Notifications grouped by location" breadcrumb="Notification History" />

      <FilterBar>
        <FilterSelect label="Source" value={vm.source} onChange={vm.setSource} options={['Manual', 'INCOIS']} />
        <FilterSelect label="State" value={vm.state} onChange={vm.setState} options={statesDistricts.map((s) => s.state)} />
        <FilterSelect label="District" value={vm.district} onChange={vm.setDistrict} options={vm.districts} />
        <FilterSelect label="Status" value={vm.status} onChange={vm.setStatus} options={vm.statuses} />
        <FilterSelect label="Date" value={vm.date} onChange={vm.setDate} options={vm.dates} />
      </FilterBar>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {vm.groupedByState.map(({ state, items }) => (
          <div key={state} className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-teal-500/20 bg-teal-500/5 px-4 py-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                <MapPin size={14} className="text-teal-600" /> {state}
              </p>
              <span className="rounded-full bg-teal-500/10 px-2 py-0.5 text-xs font-medium text-teal-700">{items.length}</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {items.map((n) => (
                <li
                  key={n.id}
                  onClick={() => vm.setSelected(n)}
                  className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 hover:bg-surface-alt/60"
                >
                  <div>
                    <p className="text-sm font-medium text-navy-800">{n.title}</p>
                    <p className="text-xs text-slate-400">{n.source} · {n.district} · {n.dateTime}</p>
                  </div>
                  <StatusBadge status={n.status} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        {vm.groupedByState.length === 0 && (
          <p className="text-sm text-slate-400">No notifications match the selected filters.</p>
        )}
      </div>

      {vm.selected && <NotificationDetailModal record={vm.selected} onClose={() => vm.setSelected(null)} />}
    </div>
  );
}
