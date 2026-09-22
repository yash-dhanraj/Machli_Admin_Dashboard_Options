import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { FilterBar, FilterSelect } from '../../components/forms/FilterBar';
import DataTable, { type Column } from '../../components/tables/DataTable';
import StatusBadge from '../../components/cards/StatusBadge';
import KpiCard from '../../components/cards/KpiCard';
import CoastalContextMap, { type MapMarker } from '../../components/option2/CoastalContextMap';
import { alertsWarnings, statesDistricts } from '../../data/mockData';
import { tableDensity } from '../../lib/optionTheme';
import type { AlertWarning } from '../../types';

const ALERT_TYPES = ['High Wave Alert', 'Rough Sea Warning', 'Swell Surge', 'Ocean Current', 'Fishing Ban Period'];

export default function AlertsWarnings() {
  const { option } = useParams<{ option: string }>();
  const isOpt2 = option === 'option-2';
  const isOpt3 = option === 'option-3';
  const density = tableDensity(option);

  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [alertType, setAlertType] = useState('');
  const [status, setStatus] = useState('');
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const districts = state ? statesDistricts.find((s) => s.state === state)?.districts ?? [] : [];

  const filtered = useMemo(
    () =>
      alertsWarnings.filter((a) => {
        if (state && a.state !== state) return false;
        if (district && a.district !== district) return false;
        if (alertType && a.alertType !== alertType) return false;
        if (status && a.verificationStatus !== status) return false;
        return true;
      }),
    [state, district, alertType, status],
  );

  const counts = {
    verified: alertsWarnings.filter((a) => a.verificationStatus === 'Verified').length,
    pending: alertsWarnings.filter((a) => a.verificationStatus === 'Pending Verification').length,
    mismatch: alertsWarnings.filter((a) => a.verificationStatus === 'Mismatch / Not Verified').length,
  };

  const columns: Column<AlertWarning>[] = [
    { header: 'Alert Type', render: (r) => <span className="font-medium text-navy-800">{r.alertType}</span> },
    { header: 'Location', render: (r) => r.location },
    { header: 'State / District', render: (r) => `${r.state} / ${r.district}` },
    { header: 'Issue Date', render: (r) => r.issueDate },
    { header: 'Validity', render: (r) => r.validity },
    { header: 'Source', render: (r) => r.source },
    { header: 'Verification Status', render: (r) => <StatusBadge status={r.verificationStatus} /> },
  ];

  const markers: MapMarker[] = filtered.map((a) => ({
    id: a.id,
    x: a.x,
    y: a.y,
    label: a.alertType,
    sublabel: a.district,
    tone: a.verificationStatus === 'Verified' ? 'teal' : a.verificationStatus === 'Mismatch / Not Verified' ? 'warning' : 'danger',
  }));
  const selected = filtered.find((a) => a.id === selectedId);

  return (
    <div className={`flex flex-col ${isOpt3 ? 'gap-6' : isOpt2 ? 'gap-5' : 'gap-3'}`}>
      <PageHeader title="Alerts & Warnings" subtitle="Read-only operational view of active marine alerts and warnings" breadcrumb="Alerts & Warnings" />

      {isOpt3 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <KpiCard label="Verified" value={counts.verified} icon={ShieldCheck} tone="teal" />
          <KpiCard label="Pending Verification" value={counts.pending} icon={ShieldAlert} tone="warning" />
          <KpiCard label="Mismatch / Not Verified" value={counts.mismatch} icon={ShieldX} tone="danger" />
        </div>
      )}

      <FilterBar compact={!isOpt3}>
        <FilterSelect compact={!isOpt3} label="State" value={state} onChange={(v) => { setState(v); setDistrict(''); }} options={statesDistricts.map((s) => s.state)} />
        <FilterSelect compact={!isOpt3} label="District" value={district} onChange={setDistrict} options={districts} />
        <FilterSelect compact={!isOpt3} label="Alert Type" value={alertType} onChange={setAlertType} options={ALERT_TYPES} />
        <FilterSelect compact={!isOpt3} label="Verification Status" value={status} onChange={setStatus} options={['Pending Verification', 'Verified', 'Mismatch / Not Verified']} />
      </FilterBar>

      {isOpt2 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
          <CoastalContextMap markers={markers} selectedId={selectedId} onSelect={setSelectedId} />
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-4 py-3">
              <h3 className="text-sm font-semibold text-navy-900">Alert Details</h3>
            </div>
            {selected ? (
              <div className="space-y-3 p-4 text-sm">
                <p className="font-medium text-navy-900">{selected.alertType}</p>
                <p className="text-xs text-slate-500">{selected.location}</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div><p className="text-slate-400">State</p><p className="text-navy-800">{selected.state}</p></div>
                  <div><p className="text-slate-400">District</p><p className="text-navy-800">{selected.district}</p></div>
                  <div><p className="text-slate-400">Issue Date</p><p className="text-navy-800">{selected.issueDate}</p></div>
                  <div><p className="text-slate-400">Validity</p><p className="text-navy-800">{selected.validity}</p></div>
                </div>
                <StatusBadge status={selected.verificationStatus} />
              </div>
            ) : (
              <p className="p-4 text-sm text-slate-400">Select a marker to view alert details.</p>
            )}
          </div>
        </div>
      ) : (
        <DataTable columns={columns} rows={filtered} density={density} />
      )}
    </div>
  );
}
