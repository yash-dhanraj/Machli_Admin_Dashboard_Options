import { X } from 'lucide-react';
import StatusBadge from '../cards/StatusBadge';
import type { NotificationRecord } from '../../types';

export default function NotificationDetailModal({ record, onClose }: { record: NotificationRecord; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{record.source} Notification</p>
            <h3 className="mt-0.5 text-base font-semibold text-navy-900">{record.title}</h3>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-surface-alt">
            <X size={16} />
          </button>
        </div>
        <div className="space-y-3 text-sm">
          <p className="text-slate-600">{record.message}</p>
          <div className="grid grid-cols-2 gap-3 rounded-lg bg-surface-alt p-3 text-xs">
            <div>
              <p className="text-slate-400">Location</p>
              <p className="font-medium text-navy-800">{record.location}</p>
            </div>
            <div>
              <p className="text-slate-400">Date / Time</p>
              <p className="font-medium text-navy-800">{record.dateTime}</p>
            </div>
            <div>
              <p className="text-slate-400">State</p>
              <p className="font-medium text-navy-800">{record.state}</p>
            </div>
            <div>
              <p className="text-slate-400">District</p>
              <p className="font-medium text-navy-800">{record.district}</p>
            </div>
          </div>
          <StatusBadge status={record.status} />
        </div>
      </div>
    </div>
  );
}
