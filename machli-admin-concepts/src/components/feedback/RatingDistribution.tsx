import { playStoreOverview } from '../../data/mockData';
import SourceBadge from './SourceBadge';

export default function RatingDistribution() {
  const total = playStoreOverview.ratingDistribution.reduce((sum, bucket) => sum + bucket.count, 0);
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm" aria-label="Rating distribution">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-navy-900">Rating Distribution</h2>
        <SourceBadge source="Google Play" />
      </div>
      <p className="mt-2 text-xs text-slate-500">Source: Google Play · {total} illustrative store-wide ratings, separate from recent written reviews.</p>
      <ul className="mt-4 space-y-3">
        {playStoreOverview.ratingDistribution.map(({ stars, count }) => (
          <li key={stars} className="flex items-center gap-3 text-xs">
            <span className="w-12 shrink-0 font-medium text-slate-600">{stars} Star</span>
            <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-surface-alt" aria-hidden="true">
              <div className="h-full rounded-full bg-teal-500" style={{ width: `${total ? count / total * 100 : 0}%` }} />
            </div>
            <span className="w-16 shrink-0 text-right tabular-nums text-slate-500">{count} ({total ? Math.round(count / total * 100) : 0}%)</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
