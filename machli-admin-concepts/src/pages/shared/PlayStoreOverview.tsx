import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Smartphone } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import AppMetricCard from '../../components/feedback/AppMetricCard';
import IllustrativeLabel from '../../components/feedback/IllustrativeLabel';
import SourceBadge from '../../components/feedback/SourceBadge';
import RatingDistribution from '../../components/feedback/RatingDistribution';
import FeedbackTable from '../../components/feedback/FeedbackTable';
import FeedbackSummary from '../../components/feedback/FeedbackSummary';
import { playStoreOverview, playStoreReviews } from '../../data/mockData';
import { getFeedbackRecords } from '../../lib/feedback';

export default function PlayStoreOverview() {
  const { option } = useParams<{ option: string }>();
  const isCoastal = option === 'option-2';
  const isExecutive = option === 'option-3';
  const store = playStoreOverview;
  const recentReviews = getFeedbackRecords().filter((record) => record.source === 'Google Play').slice(0, 5);
  const release = [
    { label: 'Current Version', value: store.currentVersion },
    { label: 'Release Status', value: store.releaseStatus },
    { label: 'Last Updated', value: store.lastUpdated },
  ];
  const usage = [
    { label: 'Monthly Active Users', value: store.monthlyActiveUsers },
    { label: 'Daily Active Users', value: store.dailyActiveUsers },
    { label: 'Installed Audience / Current Install Base', value: store.installedAudience },
    { label: 'Total Installs', value: store.totalInstalls },
  ];

  return (
    <div className={`flex min-w-0 flex-col ${isExecutive ? 'gap-6' : 'gap-4'}`}>
      <PageHeader title="Play Store Overview" subtitle="Application release, usage and store quality" breadcrumb="Play Store Overview" actions={<IllustrativeLabel />} />

      <div className={`flex flex-wrap items-start justify-between gap-3 rounded-xl border p-4 ${isCoastal ? 'border-teal-500/30 bg-teal-500/5' : 'border-slate-200 bg-white'}`}>
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <Smartphone className="mt-0.5 shrink-0 text-teal-600" size={20} aria-hidden="true" />
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-navy-900">Application Overview</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">Machli · Fixed illustrative Google Play / Play Console data. No live integration. The Production label below is a sample release status.</p>
          </div>
        </div>
        <SourceBadge source="Google Play" />
      </div>

      {isExecutive && (
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AppMetricCard label="Current Version" value={`v${store.currentVersion}`} source="Google Play" option={option} />
          <AppMetricCard label="Monthly Active Users" value={store.monthlyActiveUsers} source="Google Play" option={option} />
          <AppMetricCard label="Play Store Rating" value={`${store.rating} ★`} source="Google Play" option={option} />
          <AppMetricCard label="Total Installs" value={store.totalInstalls} source="Google Play" option={option} />
        </div>
      )}

      <section className="min-w-0" aria-label="App Release">
        <h2 className="mb-3 text-sm font-semibold text-navy-900">App Release</h2>
        {option === 'option-1' ? (
          <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
            {release.map((item) => (
              <div key={item.label} className="grid grid-cols-2 items-center gap-2 py-3 sm:grid-cols-3">
                <dt className="text-xs text-slate-500">{item.label}</dt>
                <dd className="text-sm font-semibold text-navy-800">{item.value}</dd>
                <dd className="col-span-2 text-[11px] text-ocean-600 sm:col-span-1">Source: Google Play</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {release.map((item) => <AppMetricCard key={item.label} {...item} source="Google Play" option={option} />)}
          </div>
        )}
      </section>

      <section className="min-w-0" aria-label="Usage">
        <h2 className="mb-1 text-sm font-semibold text-navy-900">Usage</h2>
        <p className="mb-3 text-xs leading-relaxed text-slate-500">Google Play usage metrics are separate from Registered Users in Machli user/backend data. These counts are not combined.</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {usage.map((item) => <AppMetricCard key={item.label} {...item} source="Google Play" option={option} />)}
        </div>
      </section>

      <section className="min-w-0" aria-label="Store Quality">
        <h2 className="mb-3 text-sm font-semibold text-navy-900">Store Quality</h2>
        <div className="grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <AppMetricCard label="Play Store Rating" value={`${store.rating} ★`} source="Google Play" note="Illustrative store-wide rating" option={option} />
            <AppMetricCard label="Recent Reviews" value={playStoreReviews.length} source="Google Play" note="Sample period: 16–22 Sep 2026" option={option} />
          </div>
          <RatingDistribution />
        </div>
      </section>

      <section className="min-w-0" aria-label="Play Store Reviews">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-semibold text-navy-900">Play Store Reviews</h2><SourceBadge source="Google Play" /></div>
          <Link to={`/${option}/user-feedback?source=Google+Play`} className="inline-flex items-center gap-1 py-1 text-xs font-medium text-ocean-600 hover:underline">View all reviews <ArrowRight size={13} /></Link>
        </div>
        {isCoastal && <p className="mb-3 text-xs text-slate-500">Store reviewers have no linked location context in this sample. Their reviews remain separate from Machli user profiles.</p>}
        <FeedbackTable records={recentReviews} />
      </section>

      <section className="min-w-0" aria-label="Feedback Summary">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-navy-900">Feedback Summary</h2>
          <Link to={`/${option}/user-feedback`} className="py-1 text-xs font-medium text-ocean-600 hover:underline">Open User Feedback</Link>
        </div>
        <FeedbackSummary />
      </section>
    </div>
  );
}
