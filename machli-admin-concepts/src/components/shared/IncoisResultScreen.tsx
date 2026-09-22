import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, ShieldX } from 'lucide-react';

export default function IncoisResultScreen({ alertType, result }: { alertType: string; result: 'Verified' | 'Mismatch / Not Verified' }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <span
        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
          result === 'Verified' ? 'bg-status-success-bg text-status-success' : 'bg-status-danger-bg text-status-danger'
        }`}
      >
        {result === 'Verified' ? <CheckCircle2 size={28} /> : <ShieldX size={28} />}
      </span>
      <h2 className="text-lg font-semibold text-navy-900">
        {alertType} marked as {result}
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        {result === 'Verified'
          ? 'This alert can now be published as a verified Machli notification.'
          : 'This alert has been flagged for correction and will not be published until resolved.'}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => navigate(`/${option}/incois-verification`)}
          className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
        >
          Back to INCOIS Verification
        </button>
        <button
          onClick={() => navigate(`/${option}/notification-history`)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-navy-800 hover:bg-surface-alt"
        >
          View Notification History
        </button>
      </div>
    </div>
  );
}
