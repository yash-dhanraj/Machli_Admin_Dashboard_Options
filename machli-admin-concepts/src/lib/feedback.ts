import { inAppFeedback, playStoreReviews, users } from '../data/mockData';
import type { FeedbackRecord } from '../types';

export function getFeedbackRecords(): FeedbackRecord[] {
  return [...playStoreReviews, ...inAppFeedback].sort(
    (a, b) => b.submittedDate.localeCompare(a.submittedDate) || a.id.localeCompare(b.id),
  );
}

export function getFeedbackUser(record: FeedbackRecord) {
  return record.source === 'Machli App' ? users.find((user) => user.id === record.userId) : undefined;
}

export function feedbackDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${value}T00:00:00Z`));
}

export function getFeedbackSummary() {
  return {
    playStoreCount: playStoreReviews.length,
    inAppCount: inAppFeedback.length,
    averageRating: playStoreReviews.length
      ? (playStoreReviews.reduce((sum, review) => sum + review.rating, 0) / playStoreReviews.length).toFixed(1)
      : '—',
  };
}
