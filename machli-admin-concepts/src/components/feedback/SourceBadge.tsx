import { MessageSquare, Smartphone } from 'lucide-react';
import type { FeedbackSource } from '../../types';

export default function SourceBadge({ source }: { source: FeedbackSource }) {
  const isPlay = source === 'Google Play';
  const Icon = isPlay ? Smartphone : MessageSquare;
  return (
    <span className={`inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-1 text-[11px] font-medium ${isPlay ? 'border-ocean-400/30 bg-ocean-500/10 text-ocean-600' : 'border-teal-500/30 bg-teal-500/10 text-teal-600'}`}>
      <Icon size={12} aria-hidden="true" />{source}
    </span>
  );
}
