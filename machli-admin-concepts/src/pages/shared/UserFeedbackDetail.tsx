import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import NotFoundCard from '../../components/shared/NotFoundCard';
import SourceBadge from '../../components/feedback/SourceBadge';
import IllustrativeLabel from '../../components/feedback/IllustrativeLabel';
import { feedbackDate, getFeedbackRecords, getFeedbackUser } from '../../lib/feedback';

export default function UserFeedbackDetail() {
  const { option, id } = useParams<{ option: string; id: string }>();
  const location = useLocation();
  const record = getFeedbackRecords().find((entry) => entry.id === id);
  const defaultBack = `/${option}/user-feedback`;
  const requestedBack: unknown = location.state?.returnTo;
  const backTo = typeof requestedBack === 'string' && (
    requestedBack === `/${option}/play-store` || requestedBack === defaultBack || requestedBack.startsWith(`${defaultBack}?`)
  ) ? requestedBack : defaultBack;

  if (!record) return <NotFoundCard message="Feedback not found." backTo={defaultBack} backLabel="Back to User Feedback" />;

  const userContext = getFeedbackUser(record);
  const isPlay = record.source === 'Google Play';
  const fields = [
    { label: 'Source', value: record.source },
    { label: isPlay ? 'Reviewer' : 'User', value: record.user },
    { label: 'App Version', value: record.appVersion },
    { label: 'Submitted Date', value: feedbackDate(record.submittedDate) },
    ...(record.source === 'Google Play' ? [
      { label: 'Rating', value: `${'★'.repeat(record.rating)}${'☆'.repeat(5 - record.rating)} (${record.rating} / 5)` },
      { label: 'Language', value: record.language },
    ] : []),
  ];

  return (
    <div className={`flex min-w-0 flex-col ${option === 'option-3' ? 'gap-6' : 'gap-4'}`}>
      <PageHeader title={isPlay ? 'Play Store Review' : 'In-App Feedback'} subtitle="User Feedback · Read-only detail" breadcrumb="User Feedback" actions={<IllustrativeLabel />} />
      <Link to={backTo} className="inline-flex min-h-10 w-fit items-center gap-2 text-xs font-medium text-ocean-600 hover:underline"><ArrowLeft size={14} />{backTo === `/${option}/play-store` ? 'Back to Play Store Overview' : 'Back to User Feedback'}</Link>
      <article className={`min-w-0 rounded-xl border bg-white shadow-sm ${option === 'option-2' ? 'border-teal-500/30 p-5' : option === 'option-3' ? 'border-slate-200 p-6' : 'border-slate-200 p-4'}`}>
        <SourceBadge source={record.source} />
        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fields.map((field) => <div key={field.label} className="min-w-0"><dt className="text-xs text-slate-500">{field.label}</dt><dd className="mt-1 break-words text-sm font-medium text-navy-800">{field.value}</dd></div>)}
        </dl>
        <section className="mt-5 rounded-lg bg-surface-alt p-4">
          <h2 className="text-xs font-semibold text-slate-500">{isPlay ? 'Review' : 'Feedback Message'}</h2>
          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-navy-800">{record.message}</p>
        </section>
        {record.source === 'Google Play' && <section className="mt-5 border-t border-slate-100 pt-4"><h2 className="text-xs font-semibold text-slate-500">Developer Reply</h2><p className="mt-2 text-sm leading-relaxed text-navy-800">{record.developerReply || 'No Reply'}</p></section>}
        {userContext && <section className={`mt-5 rounded-lg p-4 ${option === 'option-2' ? 'border border-teal-500/25 bg-teal-500/5' : 'bg-surface-alt'}`}>
          <h2 className="text-xs font-semibold text-slate-500">Machli User Context</h2>
          <p className="mt-2 text-sm text-navy-800">{userContext.village} · {userContext.district} · {userContext.state}</p>
          <p className="mt-1 text-[11px] text-slate-500">Source: Machli App · Existing illustrative user profile</p>
          <Link to={`/${option}/users/${userContext.id}`} className="mt-3 inline-block text-xs font-medium text-ocean-600 hover:underline">View user profile</Link>
        </section>}
      </article>
    </div>
  );
}
