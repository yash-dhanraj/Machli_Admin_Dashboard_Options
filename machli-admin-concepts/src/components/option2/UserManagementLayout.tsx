import { useNavigate, useParams } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import { FilterBar } from '../forms/FilterBar';
import DataTable from '../tables/DataTable';
import UserFilterFields from '../shared/UserFilterFields';
import { getUserColumns } from '../shared/userColumns';
import CoastalContextMap, { type MapMarker } from './CoastalContextMap';
import { getMapPosition } from '../../lib/mapPositions';
import type { UserManagementVm } from '../../hooks/useUserManagement';

export default function UserManagementLayout({ vm }: { vm: UserManagementVm }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();
  const columns = getUserColumns(navigate, option);

  const markers: MapMarker[] = vm.usersByStateCount.slice(0, 8).map((s) => {
    const pos = getMapPosition(s.label);
    return { id: s.label, x: pos.x, y: pos.y, label: s.label, sublabel: `${s.value} users`, tone: 'teal' };
  });

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="User Management" subtitle="Registered Machli app users by location" breadcrumb="User Management" />

      <FilterBar>
        <UserFilterFields vm={vm} />
      </FilterBar>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
        <div>
          <p className="mb-2 text-xs text-slate-400">{vm.filtered.length} of {vm.total} users shown</p>
          <DataTable columns={columns} rows={vm.filtered} />
        </div>

        <div className="flex flex-col gap-4">
          <CoastalContextMap markers={markers} height={200} caption="Registered users by state" />
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal-700">
              <MapPin size={13} /> Users by State
            </p>
            <ul className="space-y-2">
              {vm.usersByStateCount.map((s) => (
                <li key={s.label} className="flex items-center justify-between text-sm">
                  <span className="text-navy-800">{s.label}</span>
                  <span className="font-medium text-slate-500">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
