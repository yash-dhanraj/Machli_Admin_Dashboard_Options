import { Lock, MapPin } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import StatusBadge from '../cards/StatusBadge';
import ReadOnlyField from '../shared/ReadOnlyField';
import CrossVerificationChecklist from '../shared/CrossVerificationChecklist';
import CoastalContextMap from './CoastalContextMap';
import { getMapPosition } from '../../lib/mapPositions';
import type { useIncoisDetail } from '../../hooks/useIncoisDetail';
import type { IncoisItem } from '../../types';

export default function IncoisVerificationDetailLayout({
  item,
  vm,
}: {
  item: IncoisItem;
  vm: ReturnType<typeof useIncoisDetail>;
}) {
  const pos = getMapPosition(item.state, item.district);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="INCOIS Cross-Verification"
        subtitle={`${item.alertType} · ${item.district}, ${item.state}`}
        breadcrumb="INCOIS Verification"
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-2">
          <CoastalContextMap
            markers={[{ id: item.id, x: pos.x, y: pos.y, label: item.alertType, sublabel: item.district, tone: 'danger' }]}
            selectedId={item.id}
            height={220}
            caption="Location context — conceptual illustration, not to scale"
          />
          <div className="flex items-center gap-1.5 text-xs text-teal-700">
            <MapPin size={13} /> {item.location}, {item.district}, {item.state}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-navy-900">Cross Verification</h2>
          <CrossVerificationChecklist
            checks={vm.checks}
            toggleCheck={vm.toggleCheck}
            note={vm.note}
            setNote={vm.setNote}
            allChecked={vm.allChecked}
            onMarkMismatch={() => vm.setResult('Mismatch / Not Verified')}
            onMarkVerified={() => vm.setResult('Verified')}
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-navy-900">Original Source Information</h2>
            <p className="text-xs text-slate-400">Read-only · sourced directly from INCOIS</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-medium text-slate-500">
            <Lock size={12} /> Protected
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <ReadOnlyField label="Source" value="INCOIS" />
          <ReadOnlyField label="Alert Type" value={item.alertType} />
          <ReadOnlyField label="Issue Date" value={item.issueDate} />
          <ReadOnlyField label="Status" value={item.verificationStatus} />
          <ReadOnlyField label="State" value={item.state} />
          <ReadOnlyField label="District" value={item.district} />
          <ReadOnlyField label="Validity From" value={item.validityFrom} />
          <ReadOnlyField label="Validity To" value={item.validityTo} />
        </div>
        <div className="px-5 pb-5">
          <ReadOnlyField label="Full Alert Message" value={item.fullMessage} />
        </div>
        <div className="border-t border-slate-100 px-5 py-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Machli Notification Content</h3>
          <div className="rounded-lg border border-dashed border-slate-300 bg-surface-alt p-3">
            <p className="text-sm font-medium text-navy-800">{item.alertType}</p>
            <p className="mt-1 text-xs text-slate-500">
              {item.location} &middot; Valid {item.validityFrom} &ndash; {item.validityTo}
            </p>
            <p className="mt-1.5 text-xs text-slate-500">{item.fullMessage}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400">
        Current status:
        <StatusBadge status={item.verificationStatus} />
      </div>
    </div>
  );
}
