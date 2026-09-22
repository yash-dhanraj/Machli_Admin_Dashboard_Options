import { useNavigate, useParams } from 'react-router-dom';
import { Users, Map, Briefcase, MapPinned } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import { FilterBar } from '../forms/FilterBar';
import DataTable from '../tables/DataTable';
import KpiCard from '../cards/KpiCard';
import UserFilterFields from '../shared/UserFilterFields';
import { getUserColumns } from '../shared/userColumns';
import type { UserManagementVm } from '../../hooks/useUserManagement';

export default function UserManagementLayout({ vm }: { vm: UserManagementVm }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();
  const columns = getUserColumns(navigate, option);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="User Management" subtitle="Management overview of registered Machli app users" breadcrumb="User Management" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard label="Registered Users" value={vm.total.toLocaleString('en-IN')} icon={Users} tone="ocean" />
        <KpiCard label="States Represented" value={vm.statesRepresented} icon={Map} tone="teal" />
        <KpiCard label="Occupations" value={vm.occupationsRepresented} icon={Briefcase} tone="navy" />
        <KpiCard label="Villages Covered" value={vm.villagesCovered} icon={MapPinned} tone="ocean" />
      </div>

      <FilterBar>
        <UserFilterFields vm={vm} />
      </FilterBar>

      <p className="text-xs text-slate-400">{vm.filtered.length} of {vm.total} users shown</p>

      <DataTable columns={columns} rows={vm.filtered} density="spacious" />
    </div>
  );
}
