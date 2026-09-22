import type { ManualNotificationVm } from '../../hooks/useManualNotification';

export default function RecipientSummary({ vm }: { vm: ManualNotificationVm }) {
  if (vm.recipientMode === 'all') {
    return <p className="text-sm text-navy-800">All Applicable Users</p>;
  }
  if (vm.filterSummary.length === 0) {
    return <p className="text-sm text-navy-800">All Applicable Users (no filters selected)</p>;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {vm.filterSummary.map((f) => (
        <span key={f} className="rounded-full bg-surface-alt px-2.5 py-1 text-[11px] text-slate-600">{f}</span>
      ))}
    </div>
  );
}
