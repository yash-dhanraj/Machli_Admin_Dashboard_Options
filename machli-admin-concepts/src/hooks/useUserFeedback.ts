import { useSearchParams } from 'react-router-dom';
import { getFeedbackRecords } from '../lib/feedback';
import type { FeedbackSource } from '../types';

export type FeedbackTab = 'all' | 'play-store' | 'in-app';

export function useUserFeedback() {
  const [params, setParams] = useSearchParams();
  const records = getFeedbackRecords();
  const sourceParam = params.get('source');
  const source: FeedbackSource | '' = sourceParam === 'Google Play' || sourceParam === 'Machli App' ? sourceParam : '';
  const tab: FeedbackTab = source === 'Google Play' ? 'play-store' : source === 'Machli App' ? 'in-app' : 'all';
  const date = params.get('date') ?? '';
  const rating = source === 'Machli App' ? '' : params.get('rating') ?? '';
  const version = params.get('version') ?? '';

  const update = (key: string, value: string) => {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value) next.set(key, value);
      else next.delete(key);
      if (key === 'source' && value === 'Machli App') next.delete('rating');
      return next;
    }, { replace: true });
  };

  const filtered = records.filter((record) => {
    if (source && record.source !== source) return false;
    if (date && record.submittedDate !== date) return false;
    if (version && record.appVersion !== version) return false;
    if (rating && (record.source !== 'Google Play' || record.rating !== Number(rating))) return false;
    return true;
  });

  return {
    records, filtered, source, tab, date, rating, version,
    dates: [...new Set(records.map((record) => record.submittedDate))].sort().reverse(),
    versions: [...new Set(records.map((record) => record.appVersion))].sort().reverse(),
    setSource: (value: string) => update('source', value),
    setTab: (value: FeedbackTab) => update('source', value === 'play-store' ? 'Google Play' : value === 'in-app' ? 'Machli App' : ''),
    setDate: (value: string) => update('date', value),
    setRating: (value: string) => update('rating', value),
    setVersion: (value: string) => update('version', value),
    reset: () => setParams({}),
  };
}
