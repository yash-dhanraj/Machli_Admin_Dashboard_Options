import { useParams } from 'react-router-dom';
import { getFeedbackSummary } from '../../lib/feedback';
import AppMetricCard from './AppMetricCard';

export default function FeedbackSummary() {
  const { option } = useParams<{ option: string }>();
  const summary = getFeedbackSummary();
  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
      <AppMetricCard option={option} label="Play Store Reviews" value={summary.playStoreCount} source="Google Play" note="Recent sample · 16–22 Sep 2026" />
      <AppMetricCard option={option} label="In-App Feedback" value={summary.inAppCount} source="Machli App" note="Recent sample · 16–22 Sep 2026" />
      <AppMetricCard option={option} label="Average Rating" value={`${summary.averageRating} ★`} source="Google Play" note="Average of the recent review sample; separate from the store-wide rating." />
    </div>
  );
}
