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
    <div className="flex flex-col gap-6">
      <PageHeader title="INCOIS Cross-Verification" subtitle="Executive summary and cross-verification action" breadcrumb="INCOIS Verification" />

      <div className="rounded-2xl border border-navy-800 bg-navy-900 p-5 text-white shadow-sm">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ocean-400">Alert Summary</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div>
            <p className="text-[11px] text-slate-400">Alert Type</p>
            <p className="text-base font-semibold text-white">{item.alertType}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">State</p>
            <p className="text-base font-semibold text-white">{item.state}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">District</p>
            <p className="text-base font-semibold text-white">{item.district}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Validity</p>
            <p className="text-base font-semibold text-white">{item.validityFrom} – {item.validityTo}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Verification Status</p>
            <StatusBadge status={item.verificationStatus} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-navy-900">Original Source Information</h2>
            <span className="flex items-center gap-1.5 rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-medium text-slate-500">
              <Lock size={12} /> Protected
            </span>
          </div>
          <div className="space-y-4 p-5">
            <div className="grid grid-cols-2 gap-4">
              <ReadOnlyField label="Issue Date" value={item.issueDate} />
              <ReadOnlyField label="Source" value="INCOIS" />
            </div>
            <ReadOnlyField label="Full Alert Message" value={item.fullMessage} />
          </div>
          <div className="border-t border-slate-100 px-5 py-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Machli Notification Content</h3>
            <div className="rounded-lg border border-dashed border-slate-300 bg-surface-alt p-3">
              <p className="text-sm font-medium text-navy-800">{item.alertType}</p>
              <p className="mt-1.5 text-xs text-slate-500">{item.fullMessage}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
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
    </div>
  );
}
