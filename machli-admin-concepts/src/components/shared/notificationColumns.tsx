import StatusBadge from '../cards/StatusBadge';
import type { Column } from '../tables/DataTable';
import type { NotificationRecord } from '../../types';

export function getNotificationColumns(onView: (record: NotificationRecord) => void): Column<NotificationRecord>[] {
  return [
    { header: 'Source', render: (r) => <span className="font-medium text-navy-800">{r.source}</span> },
    { header: 'Title / Type', render: (r) => r.title },
    { header: 'Location', render: (r) => r.location },
    { header: 'Created / Received', render: (r) => <span className="whitespace-nowrap text-slate-500">{r.dateTime}</span> },
    { header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      header: 'Action',
      render: (r) => (
        <button onClick={() => onView(r)} className="text-xs font-medium text-ocean-600 hover:text-ocean-500">
          View
        </button>
      ),
    },
  ];
}
