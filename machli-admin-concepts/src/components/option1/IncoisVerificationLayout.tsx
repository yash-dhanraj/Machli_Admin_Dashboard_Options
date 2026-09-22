import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../layout/PageHeader';
import Tabs from '../navigation/Tabs';
import { FilterBar, FilterSelect } from '../forms/FilterBar';
import DataTable, { type Column } from '../tables/DataTable';
import StatusBadge from '../cards/StatusBadge';
import { statesDistricts } from '../../data/mockData';
import { INCOIS_ALERT_TYPES } from '../../hooks/useIncoisVerification';
import type { IncoisItem } from '../../types';
import type { useIncoisVerification } from '../../hooks/useIncoisVerification';

export default function IncoisVerificationLayout({ vm }: { vm: ReturnType<typeof useIncoisVerification> }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  const columns: Column<IncoisItem>[] = [
    { header: 'Alert Type', render: (r) => <span className="font-medium text-navy-800">{r.alertType}</span> },
    { header: 'State', render: (r) => r.state },
    { header: 'District', render: (r) => r.district },
    { header: 'Issue Date', render: (r) => r.issueDate },
    { header: 'Validity', render: (r) => `${r.validityFrom} - ${r.validityTo}` },
    { header: 'Status', render: (r) => <StatusBadge status={r.verificationStatus} /> },
    {
      header: 'Action',
      render: (r) => (
        <button
          onClick={() => navigate(`/${option}/incois-verification/${r.id}`)}
          className="rounded-md bg-navy-900 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-navy-800"
        >
          Cross Verify
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <PageHeader title="INCOIS Verification" subtitle="Verification queue for INCOIS source alerts" breadcrumb="INCOIS Verification" />

      <FilterBar compact>
        <FilterSelect compact label="State" value={vm.state} onChange={vm.setState} options={statesDistricts.map((s) => s.state)} />
        <FilterSelect compact label="District" value={vm.district} onChange={vm.setDistrict} options={vm.districts} />
        <FilterSelect compact label="Alert Type" value={vm.alertType} onChange={vm.setAlertType} options={INCOIS_ALERT_TYPES} />
      </FilterBar>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="px-3 pt-1.5">
          <Tabs
            tabs={[
              { id: 'pending', label: 'Pending Verification', count: vm.counts.pending },
              { id: 'verified', label: 'Verified', count: vm.counts.verified },
              { id: 'mismatch', label: 'Mismatch / Not Verified', count: vm.counts.mismatch },
            ]}
            active={vm.tab}
            onChange={(id) => vm.setTab(id as typeof vm.tab)}
          />
        </div>
        <div className="p-3">
          <DataTable columns={columns} rows={vm.filtered} density="compact" />
        </div>
      </div>
    </div>
  );
}
