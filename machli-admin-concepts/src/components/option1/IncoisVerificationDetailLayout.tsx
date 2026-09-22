import { Lock } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import StatusBadge from '../cards/StatusBadge';
import ReadOnlyField from '../shared/ReadOnlyField';
import CrossVerificationChecklist from '../shared/CrossVerificationChecklist';
import type { useIncoisDetail } from '../../hooks/useIncoisDetail';
import type { IncoisItem } from '../../types';

export default function IncoisVerificationDetailLayout({
  item,
  vm,
}: {
  item: IncoisItem;
  vm: ReturnType<typeof useIncoisDetail>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="INCOIS Cross-Verification"
        subtitle={`${item.alertType} · ${item.district}, ${item.state}`}
        breadcrumb="INCOIS Verification"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-navy-900">Original Source Information</h2>
              <p className="text-xs text-slate-400">Read-only · sourced directly from INCOIS</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-medium text-slate-500">
              <Lock size={12} /> Protected
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4">
            <ReadOnlyField compact label="Source" value="INCOIS" />
            <ReadOnlyField compact label="Alert Type" value={item.alertType} />
            <ReadOnlyField compact label="Issue Date" value={item.issueDate} />
            <ReadOnlyField compact label="State" value={item.state} />
            <ReadOnlyField compact label="Validity From" value={item.validityFrom} />
            <ReadOnlyField compact label="Validity To" value={item.validityTo} />
            <ReadOnlyField compact label="District" value={item.district} />
            <ReadOnlyField compact label="Status" value={item.verificationStatus} />
            <div className="col-span-2">
              <ReadOnlyField compact label="Full Alert Message" value={item.fullMessage} />
            </div>
          </div>

          <div className="border-t border-slate-100 px-4 py-3">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Machli Notification Content</h3>
            <div className="rounded-lg border border-dashed border-slate-300 bg-surface-alt p-2.5">
              <p className="text-sm font-medium text-navy-800">{item.alertType}</p>
              <p className="mt-1 text-xs text-slate-500">
                {item.location} &middot; Valid {item.validityFrom} &ndash; {item.validityTo}
              </p>
              <p className="mt-1.5 text-xs text-slate-500">{item.fullMessage}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <h2 className="mb-1 text-sm font-semibold text-navy-900">Verification Checklist</h2>
          <p className="mb-3 text-xs text-slate-400">Confirm each item, then record the result.</p>
          <CrossVerificationChecklist
            compact
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

      <div className="flex items-center gap-2 text-xs text-slate-400">
        Current status:
        <StatusBadge status={item.verificationStatus} />
      </div>
    </div>
  );
}
