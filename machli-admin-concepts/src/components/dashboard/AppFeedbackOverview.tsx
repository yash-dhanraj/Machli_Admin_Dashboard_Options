import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import AppMetricCard from '../feedback/AppMetricCard';
import IllustrativeLabel from '../feedback/IllustrativeLabel';
import { playStoreOverview } from '../../data/mockData';
import { getFeedbackSummary } from '../../lib/feedback';

export default function AppFeedbackOverview() {
  const { option } = useParams<{ option: string }>();
  const summary = getFeedbackSummary();
  return (
    <section className={`min-w-0 rounded-xl ${option === 'option-2' ? 'border border-teal-500/20 bg-teal-500/5 p-4' : option === 'option-3' ? 'border border-slate-200 bg-surface-alt p-5' : ''}`} aria-label="App & Feedback Overview">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-semibold text-navy-900">App &amp; Feedback Overview</h2>
          <IllustrativeLabel />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-ocean-600">
          <Link to={`/${option}/play-store`} className="inline-flex items-center gap-1 hover:underline">Play Store Overview <ArrowUpRight size={13} /></Link>
          <Link to={`/${option}/user-feedback`} className="inline-flex items-center gap-1 hover:underline">User Feedback <ArrowUpRight size={13} /></Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <AppMetricCard label="Current App Version" value={`v${playStoreOverview.currentVersion}`} source="Google Play" option={option} />
        <AppMetricCard label="Monthly Active Users" value={playStoreOverview.monthlyActiveUsers} source="Google Play" option={option} />
        <AppMetricCard label="Play Store Rating" value={`${playStoreOverview.rating} ★`} source="Google Play" option={option} />
        <AppMetricCard label="Recent In-App Feedback" value={summary.inAppCount} source="Machli App" option={option} />
        <AppMetricCard label="Recent Play Store Reviews" value={summary.playStoreCount} source="Google Play" option={option} />
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">Fixed illustrative data · Feedback sample: 16–22 Sep 2026. Active users describe Google Play usage; Registered Users remain a separate Machli user/backend metric.</p>
    </section>
  );
}
