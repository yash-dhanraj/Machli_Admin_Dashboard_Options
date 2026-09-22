import { Bookmark, Users2, History } from 'lucide-react';
import type { UserRecord, NotificationRecord } from '../../types';

export default function UserSecondarySections({
  user,
  relatedNotifications,
}: {
  user: UserRecord;
  relatedNotifications: NotificationRecord[];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
          <Bookmark size={15} className="text-ocean-600" /> Saved Locations
        </h3>
        {user.savedLocations && user.savedLocations.length > 0 ? (
          <ul className="space-y-1.5 text-sm text-slate-600">
            {user.savedLocations.map((loc) => (
              <li key={loc} className="rounded-lg bg-surface-alt px-3 py-2">{loc}</li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-400">Displayed only when corresponding linked data is available.</p>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
          <Users2 size={15} className="text-ocean-600" /> Emergency Contacts
        </h3>
        {user.emergencyContacts && user.emergencyContacts.length > 0 ? (
          <ul className="space-y-2 text-sm text-slate-600">
            {user.emergencyContacts.map((c) => (
              <li key={c.mobile} className="rounded-lg bg-surface-alt px-3 py-2">
                <p className="font-medium text-navy-800">{c.name} <span className="font-normal text-slate-400">· {c.relation}</span></p>
                <p className="text-xs text-slate-500">{c.mobile}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-400">Displayed only when corresponding linked data is available.</p>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
          <History size={15} className="text-ocean-600" /> Notification History
        </h3>
        {relatedNotifications.length > 0 ? (
          <ul className="space-y-2 text-sm text-slate-600">
            {relatedNotifications.map((n) => (
              <li key={n.id} className="rounded-lg bg-surface-alt px-3 py-2">
                <p className="font-medium text-navy-800">{n.title}</p>
                <p className="text-xs text-slate-400">{n.dateTime}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-400">Displayed only when corresponding linked data is available.</p>
        )}
      </div>
    </div>
  );
}
