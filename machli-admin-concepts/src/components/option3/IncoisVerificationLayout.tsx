import { useNavigate, useParams } from 'react-router-dom';
import { ClipboardList, ShieldCheck, ShieldX, ArrowRight } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import { FilterBar, FilterSelect } from '../forms/FilterBar';
import StatusBadge from '../cards/StatusBadge';
import { statesDistricts } from '../../data/mockData';
import { INCOIS_ALERT_TYPES } from '../../hooks/useIncoisVerification';
import type { useIncoisVerification } from '../../hooks/useIncoisVerification';

function SummaryCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: typeof ClipboardList;
  tone: 'warning' | 'success' | 'danger';
}) {
  const toneClasses = {
    warning: 'bg-status-warning-bg text-status-warning',
    success: 'bg-status-success-bg text-status-success',
    danger: 'bg-status-danger-bg text-status-danger',
  }[tone];
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneClasses}`}>
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-semibold text-navy-900">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

export default function IncoisVerificationLayout({ vm }: { vm: ReturnType<typeof useIncoisVerification> }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="INCOIS Verification"
        subtitle="Management visibility with direct access to operational verification"
        breadcrumb="INCOIS Verification"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Pending Verification" value={vm.counts.pending} icon={ClipboardList} tone="warning" />
        <SummaryCard label="Verified" value={vm.counts.verified} icon={ShieldCheck} tone="success" />
        <SummaryCard label="Mismatch / Not Verified" value={vm.counts.mismatch} icon={ShieldX} tone="danger" />
      </div>

      <FilterBar>
        <FilterSelect label="State" value={vm.state} onChange={vm.setState} options={statesDistricts.map((s) => s.state)} />
        <FilterSelect label="District" value={vm.district} onChange={vm.setDistrict} options={vm.districts} />
        <FilterSelect label="Alert Type" value={vm.alertType} onChange={vm.setAlertType} options={INCOIS_ALERT_TYPES} />
        <div className="ml-auto flex gap-1 rounded-lg bg-surface-alt p-1">
          {(['pending', 'verified', 'mismatch'] as const).map((t) => (
            <button
              key={t}
              onClick={() => vm.setTab(t)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                vm.tab === t ? 'bg-navy-900 text-white' : 'text-slate-500 hover:bg-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </FilterBar>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_380px]">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h3 className="text-sm font-semibold text-navy-900">Priority Verification Queue</h3>
          </div>
          <ul className="divide-y divide-slate-100">
            {vm.filtered.map((item) => (
              <li
                key={item.id}
                onClick={() => vm.setSelectedId(item.id)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-5 py-4 transition hover:bg-surface-alt/60 ${
                  vm.selectedId === item.id ? 'bg-ocean-500/5' : ''
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-navy-900">{item.alertType}</p>
                  <p className="text-xs text-slate-500">{item.district}, {item.state} · Valid {item.validityFrom} – {item.validityTo}</p>
                </div>
                <StatusBadge status={item.verificationStatus} />
              </li>
            ))}
            {vm.filtered.length === 0 && (
              <li className="px-5 py-10 text-center text-sm text-slate-400">No alerts match the selected filters.</li>
            )}
          </ul>
        </div>

        <div className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-navy-900">Selected Alert Summary</h3>
          {vm.selected ? (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-400">Alert Type</p>
                <p className="text-base font-semibold text-navy-900">{vm.selected.alertType}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">State</p>
                  <p className="text-sm text-navy-800">{vm.selected.state}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">District</p>
                  <p className="text-sm text-navy-800">{vm.selected.district}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">Validity</p>
                  <p className="text-sm text-navy-800">{vm.selected.validityFrom} – {vm.selected.validityTo}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">Verification Status</p>
                  <StatusBadge status={vm.selected.verificationStatus} />
                </div>
              </div>
              <button
                onClick={() => navigate(`/${option}/incois-verification/${vm.selected!.id}`)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-800"
              >
                Open Cross-Verification <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-400">Select an item from the queue to view its summary.</p>
          )}
        </div>
      </div>
    </div>
  );
}
