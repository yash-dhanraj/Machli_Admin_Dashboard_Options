import { ShieldCheck, ShieldX } from 'lucide-react';
import { INCOIS_CHECKLIST_ITEMS } from '../../hooks/useIncoisDetail';

export default function CrossVerificationChecklist({
  checks,
  toggleCheck,
  note,
  setNote,
  allChecked,
  onMarkMismatch,
  onMarkVerified,
  compact = false,
}: {
  checks: Record<string, boolean>;
  toggleCheck: (label: string, value: boolean) => void;
  note: string;
  setNote: (v: string) => void;
  allChecked: boolean;
  onMarkMismatch: () => void;
  onMarkVerified: () => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? 'space-y-2.5' : 'space-y-3'}>
      {INCOIS_CHECKLIST_ITEMS.map((label) => (
        <label
          key={label}
          className={`flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 hover:border-ocean-400/50 ${
            compact ? 'px-2.5 py-2' : 'px-3 py-2.5'
          }`}
        >
          <input
            type="checkbox"
            checked={!!checks[label]}
            onChange={(e) => toggleCheck(label, e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-ocean-600 focus:ring-ocean-500"
          />
          <span className="text-sm text-navy-800">{label}</span>
        </label>
      ))}

      <div>
        <label className="text-xs font-medium text-slate-500">Reviewer Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={compact ? 3 : 4}
          placeholder="Add any observations relevant to this verification..."
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-900 outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500"
        />
      </div>

      {!allChecked && (
        <p className="text-xs text-status-warning">All checklist items should be confirmed before marking this alert as verified.</p>
      )}

      <div className="flex gap-3 pt-1">
        <button
          onClick={onMarkMismatch}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-status-danger/40 bg-status-danger-bg px-4 py-2.5 text-sm font-medium text-status-danger hover:bg-status-danger/10"
        >
          <ShieldX size={16} /> Mark Mismatch
        </button>
        <button
          onClick={onMarkVerified}
          disabled={!allChecked}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ShieldCheck size={16} /> Mark Verified
        </button>
      </div>
    </div>
  );
}
