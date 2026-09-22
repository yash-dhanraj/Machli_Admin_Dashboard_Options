import { useNavigate, useParams } from 'react-router-dom';
import { ClipboardCheck } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import Tabs from '../navigation/Tabs';
import { FilterBar, FilterSelect } from '../forms/FilterBar';
import StatusBadge from '../cards/StatusBadge';
import CoastalContextMap, { type MapMarker } from './CoastalContextMap';
import { statesDistricts } from '../../data/mockData';
import { getMapPosition } from '../../lib/mapPositions';
import { INCOIS_ALERT_TYPES } from '../../hooks/useIncoisVerification';
import type { useIncoisVerification } from '../../hooks/useIncoisVerification';

export default function IncoisVerificationLayout({ vm }: { vm: ReturnType<typeof useIncoisVerification> }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  const markers: MapMarker[] = vm.filtered.map((item) => {
    const pos = getMapPosition(item.state, item.district);
    return {
      id: item.id,
      x: pos.x,
      y: pos.y,
      label: item.alertType,
      sublabel: item.district,
      tone: item.verificationStatus === 'Verified' ? 'teal' : item.verificationStatus === 'Mismatch / Not Verified' ? 'warning' : 'danger',
    };
  });

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="INCOIS Verification"
        subtitle="Location-aware verification of INCOIS source alerts"
        breadcrumb="INCOIS Verification"
      />

      <FilterBar>
        <FilterSelect label="State" value={vm.state} onChange={vm.setState} options={statesDistricts.map((s) => s.state)} />
        <FilterSelect label="District" value={vm.district} onChange={vm.setDistrict} options={vm.districts} />
        <FilterSelect label="Alert Type" value={vm.alertType} onChange={vm.setAlertType} options={INCOIS_ALERT_TYPES} />
      </FilterBar>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-4">
          <CoastalContextMap markers={markers} selectedId={vm.selectedId} onSelect={vm.setSelectedId} />

          {vm.selected && (
            <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-teal-700">Selected Alert Context</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <p className="text-[11px] text-slate-400">Alert Type</p>
                  <p className="text-sm font-medium text-navy-800">{vm.selected.alertType}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">State / District</p>
                  <p className="text-sm font-medium text-navy-800">{vm.selected.state} / {vm.selected.district}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Validity</p>
                  <p className="text-sm font-medium text-navy-800">{vm.selected.validityFrom} – {vm.selected.validityTo}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Verification Status</p>
                  <StatusBadge status={vm.selected.verificationStatus} />
                </div>
              </div>
              <button
                onClick={() => navigate(`/${option}/incois-verification/${vm.selected!.id}`)}
                className="mt-4 rounded-lg bg-teal-600 px-4 py-2 text-xs font-medium text-white hover:bg-teal-500"
              >
                Cross Verify This Alert
              </button>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
              <ClipboardCheck size={15} className="text-teal-600" /> Verification Queue
            </h3>
          </div>
          <div className="px-3 pt-2">
            <Tabs
              tabs={[
                { id: 'pending', label: 'Pending', count: vm.counts.pending },
                { id: 'verified', label: 'Verified', count: vm.counts.verified },
                { id: 'mismatch', label: 'Mismatch', count: vm.counts.mismatch },
              ]}
              active={vm.tab}
              onChange={(id) => vm.setTab(id as typeof vm.tab)}
            />
          </div>
          <ul className="max-h-105 divide-y divide-slate-100 overflow-y-auto">
            {vm.filtered.map((item) => (
              <li
                key={item.id}
                onClick={() => vm.setSelectedId(item.id)}
                className={`cursor-pointer px-4 py-3 transition hover:bg-surface-alt/60 ${
                  vm.selectedId === item.id ? 'bg-teal-500/5' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-navy-900">{item.alertType}</p>
                  <StatusBadge status={item.verificationStatus} />
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{item.district}, {item.state}</p>
                <p className="text-xs text-slate-400">Valid: {item.validityFrom} – {item.validityTo}</p>
              </li>
            ))}
            {vm.filtered.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-slate-400">No alerts match the selected filters.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
