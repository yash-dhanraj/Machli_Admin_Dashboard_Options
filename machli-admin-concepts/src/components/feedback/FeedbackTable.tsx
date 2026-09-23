import { Link, useLocation, useParams } from 'react-router-dom';
import DataTable, { type Column } from '../tables/DataTable';
import SourceBadge from './SourceBadge';
import { feedbackDate } from '../../lib/feedback';
import { tableDensity } from '../../lib/optionTheme';
import type { FeedbackRecord } from '../../types';

export default function FeedbackTable({ records }: { records: FeedbackRecord[] }) {
  const { option } = useParams<{ option: string }>();
  const location = useLocation();
  const columns: Column<FeedbackRecord>[] = [
    { header: 'Source', render: (record) => <SourceBadge source={record.source} /> },
    { header: 'User', render: (record) => <span className="font-medium text-navy-800">{record.user}</span> },
    { header: 'Feedback', render: (record) => <p className="min-w-44 max-w-xs break-words text-xs leading-relaxed">{record.message}</p> },
    { header: 'Rating', render: (record) => record.source === 'Google Play'
      ? <span className="whitespace-nowrap text-status-warning" aria-label={`${record.rating} out of 5 stars`}>{'★'.repeat(record.rating)}{'☆'.repeat(5 - record.rating)}</span>
      : <span aria-label="No rating for in-app feedback">—</span> },
    { header: 'App Version', render: (record) => record.appVersion },
    { header: 'Date', render: (record) => <span className="whitespace-nowrap text-xs">{feedbackDate(record.submittedDate)}</span> },
    { header: 'Action', render: (record) => <Link
      to={`/${option}/user-feedback/${record.id}`}
      state={{ returnTo: `${location.pathname}${location.search}` }}
      aria-label={`View feedback from ${record.user}`}
      className="inline-flex min-h-9 items-center rounded px-1 text-xs font-semibold text-ocean-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ocean-500"
    >View</Link> },
  ];
  return <div className="min-w-0 max-w-full"><DataTable columns={columns} rows={records} density={tableDensity(option)} emptyMessage="No feedback matches these filters." /></div>;
}
