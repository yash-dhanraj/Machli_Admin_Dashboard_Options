import { Bell, Smartphone } from 'lucide-react';

export default function MobileNotificationPreview({ title, message }: { title: string; message: string }) {
  return (
    <div>
      <div className="rounded-2xl border border-slate-300 bg-navy-950 p-3 shadow-lg">
        <div className="rounded-xl bg-white p-3">
          <div className="flex items-start gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 text-teal-600">
              <Bell size={15} />
            </span>
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs font-semibold text-navy-900">Machli</p>
                <span className="text-[10px] text-slate-400">now</span>
              </div>
              <p className="mt-0.5 truncate text-xs font-medium text-navy-800">{title || 'Notification title'}</p>
              <p className="mt-0.5 line-clamp-3 text-[11px] text-slate-500">{message || 'Notification message will appear here.'}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
        <Smartphone size={12} /> Mobile notification preview
      </p>
    </div>
  );
}
