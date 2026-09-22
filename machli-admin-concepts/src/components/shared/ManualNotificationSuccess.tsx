import { CheckCircle2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ManualNotificationVm } from '../../hooks/useManualNotification';

export default function ManualNotificationSuccess({ vm }: { vm: ManualNotificationVm }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-status-success-bg text-status-success">
        <CheckCircle2 size={28} />
      </span>
      <h2 className="text-lg font-semibold text-navy-900">Notification sent successfully</h2>
      <p className="mt-2 text-sm text-slate-500">
        &ldquo;{vm.title}&rdquo; has been queued for delivery to {vm.recipientMode === 'all' ? 'all applicable users' : 'the filtered recipient group'}.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => navigate(`/${option}/notification-history`)}
          className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
        >
          View Notification History
        </button>
        <button
          onClick={vm.reset}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-navy-800 hover:bg-surface-alt"
        >
          Create Another
        </button>
      </div>
    </div>
  );
}
