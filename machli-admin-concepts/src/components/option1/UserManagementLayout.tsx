import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../layout/PageHeader';
import { FilterBar } from '../forms/FilterBar';
import DataTable from '../tables/DataTable';
import UserFilterFields from '../shared/UserFilterFields';
import { getUserColumns } from '../shared/userColumns';
import type { UserManagementVm } from '../../hooks/useUserManagement';

export default function UserManagementLayout({ vm }: { vm: UserManagementVm }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();
  const columns = getUserColumns(navigate, option);

  return (
    <div className="flex flex-col gap-3">
      <PageHeader title="User Management" subtitle="Registered Machli app users" breadcrumb="User Management" />

      <FilterBar compact>
        <UserFilterFields vm={vm} compact />
      </FilterBar>

      <p className="text-xs text-slate-400">{vm.filtered.length} of {vm.total} users shown</p>

      <DataTable columns={columns} rows={vm.filtered} density="compact" />
    </div>
  );
}
