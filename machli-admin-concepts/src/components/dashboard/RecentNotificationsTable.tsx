import { useNavigate, useParams } from 'react-router-dom';
import { useNotificationHistoryStore } from '../../context/NotificationHistoryContext';
import StatusBadge from '../cards/StatusBadge';
import DataTable, { type Column } from '../tables/DataTable';
import type { NotificationRecord } from '../../types';

export default function RecentNotificationsTable({ limit = 6 }: { limit?: number }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();
  const { notifications } = useNotificationHistoryStore();
  const rows = notifications.slice(0, limit);

  const columns: Column<NotificationRecord>[] = [
    { header: 'Source', render: (r) => <span className="font-medium text-navy-800">{r.source}</span> },
    { header: 'Notification', render: (r) => r.title },
    { header: 'Location', render: (r) => r.location },
    { header: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { header: 'Date / Time', render: (r) => <span className="whitespace-nowrap text-slate-500">{r.dateTime}</span> },
    {
      header: 'Action',
      render: () => (
        <button
          onClick={() => navigate(`/${option}/notification-history`)}
          className="text-xs font-medium text-ocean-600 hover:text-ocean-500"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-navy-900">Recent Notifications</h3>
        <button
          onClick={() => navigate(`/${option}/notification-history`)}
          className="text-xs font-medium text-ocean-600 hover:text-ocean-500"
        >
          View full history
        </button>
      </div>
      <DataTable columns={columns} rows={rows} />
    </div>
  );
}
