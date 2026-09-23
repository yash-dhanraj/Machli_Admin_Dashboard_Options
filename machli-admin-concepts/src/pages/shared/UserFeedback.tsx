import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import FeedbackTable from '../../components/feedback/FeedbackTable';
import FeedbackSummary from '../../components/feedback/FeedbackSummary';
import IllustrativeLabel from '../../components/feedback/IllustrativeLabel';
import SourceBadge from '../../components/feedback/SourceBadge';
import { useUserFeedback, type FeedbackTab } from '../../hooks/useUserFeedback';
import { feedbackDate, getFeedbackUser } from '../../lib/feedback';

const TABS: { id: FeedbackTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'play-store', label: 'Play Store' },
  { id: 'in-app', label: 'In-App Feedback' },
];

export default function UserFeedback() {
  const { option } = useParams<{ option: string }>();
  const vm = useUserFeedback();
  const isCoastal = option === 'option-2';
  const isExecutive = option === 'option-3';
  const latestApp = vm.filtered.find((record) => record.source === 'Machli App');
  const userContext = latestApp ? getFeedbackUser(latestApp) : undefined;
  const controlClass = 'mt-1 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-navy-900 focus:border-ocean-500 focus:outline-ocean-500 disabled:bg-surface-alt disabled:text-slate-400';

  return (
    <div className={`flex min-w-0 flex-col ${isExecutive ? 'gap-6' : 'gap-4'}`}>
      <PageHeader title="User Feedback" subtitle="Google Play reviews and feedback submitted inside Machli" breadcrumb="User Feedback" actions={<IllustrativeLabel />} />
      <p className="text-xs leading-relaxed text-slate-500">Read-only illustrative feedback · Sample period: 16–22 Sep 2026. Source badges identify every record. Ratings apply only to Google Play reviews.</p>

      {isExecutive && <FeedbackSummary />}

      <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm" role="group" aria-label="Feedback tabs">
        {TABS.map((tab) => (
          <button key={tab.id} type="button" aria-pressed={vm.tab === tab.id} onClick={() => vm.setTab(tab.id)}
            className={`min-h-10 rounded-lg px-3 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-ocean-500 ${vm.tab === tab.id ? (isCoastal ? 'bg-teal-600 text-white' : 'bg-navy-900 text-white') : 'text-slate-500 hover:bg-surface-alt'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`grid min-w-0 grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 xl:grid-cols-4 ${option === 'option-1' ? 'p-3' : 'p-4'}`} aria-label="Feedback filters">
        <label className="min-w-0 text-xs font-medium text-slate-500">Source
          <select className={controlClass} value={vm.source} onChange={(event) => vm.setSource(event.target.value)}>
            <option value="">All sources</option><option>Google Play</option><option>Machli App</option>
          </select>
        </label>
        <label className="min-w-0 text-xs font-medium text-slate-500">Date
          <select className={controlClass} value={vm.date} onChange={(event) => vm.setDate(event.target.value)}>
            <option value="">All dates</option>{vm.dates.map((date) => <option key={date} value={date}>{feedbackDate(date)}</option>)}
          </select>
        </label>
        <label className="min-w-0 text-xs font-medium text-slate-500">Rating
          <select className={controlClass} value={vm.rating} disabled={vm.source === 'Machli App'} onChange={(event) => vm.setRating(event.target.value)}>
            <option value="">{vm.source === 'Machli App' ? 'Not applicable' : 'All ratings'}</option>
            {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} {rating === 1 ? 'star' : 'stars'} · Google Play</option>)}
          </select>
        </label>
        <label className="min-w-0 text-xs font-medium text-slate-500">App Version
          <select className={controlClass} value={vm.version} onChange={(event) => vm.setVersion(event.target.value)}>
            <option value="">All versions</option>{vm.versions.map((version) => <option key={version}>{version}</option>)}
          </select>
        </label>
        <div className="flex flex-wrap items-center justify-between gap-2 sm:col-span-2 xl:col-span-4">
          <p className="text-[11px] text-slate-500">A rating filter shows Google Play reviews only.</p>
          <button type="button" onClick={vm.reset} className="min-h-9 rounded px-2 text-xs font-semibold text-ocean-600 hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-ocean-500">Reset filters</button>
        </div>
      </div>

      {isCoastal && (
        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
          <section className="min-w-0 rounded-xl border border-ocean-400/25 bg-white p-4 shadow-sm">
            <SourceBadge source="Google Play" />
            <h2 className="mt-3 text-sm font-semibold text-navy-900">Play Store Reviews</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">Public store feedback with reviewer ratings, app versions and existing developer replies. No reviewer location is supplied.</p>
          </section>
          <section className="min-w-0 rounded-xl border border-teal-500/25 bg-teal-500/5 p-4 shadow-sm">
            <SourceBadge source="Machli App" />
            <h2 className="mt-3 text-sm font-semibold text-navy-900">In-App Feedback</h2>
            {latestApp && userContext ? (
              <>
                <p className="mt-2 break-words text-sm text-navy-800">“{latestApp.message}”</p>
                <p className="mt-2 text-xs text-slate-500">{userContext.name} · {userContext.village}, {userContext.district}, {userContext.state}</p>
                <p className="mt-1 text-[11px] text-teal-600">Context from the existing illustrative Machli user profile.</p>
              </>
            ) : <p className="mt-2 text-xs text-slate-500">No in-app feedback matches the current filters.</p>}
          </section>
        </div>
      )}

      <section className="min-w-0" aria-label="Feedback results">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-navy-900">{vm.source === 'Google Play' ? 'Play Store Reviews' : vm.source === 'Machli App' ? 'In-App Feedback' : 'All Feedback'}</h2>
          <p role="status" className="text-xs text-slate-500">{vm.filtered.length} of {vm.records.length} records shown · {vm.source || 'Google Play + Machli App'}</p>
        </div>
        <FeedbackTable records={vm.filtered} />
      </section>
    </div>
  );
}
