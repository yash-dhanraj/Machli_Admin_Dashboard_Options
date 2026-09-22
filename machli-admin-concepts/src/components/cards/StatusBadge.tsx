import type { ReactNode } from 'react';

type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const TONE_CLASSES: Record<Tone, string> = {
  success: 'bg-status-success-bg text-status-success',
  warning: 'bg-status-warning-bg text-status-warning',
  danger: 'bg-status-danger-bg text-status-danger',
  info: 'bg-status-info-bg text-status-info',
  neutral: 'bg-status-neutral-bg text-status-neutral',
};

const STATUS_TONE_MAP: Record<string, Tone> = {
  Verified: 'success',
  Sent: 'success',
  'Pending Verification': 'warning',
  Pending: 'warning',
  'Mismatch / Not Verified': 'danger',
  Mismatch: 'danger',
  Active: 'info',
};

export function toneForStatus(status: string): Tone {
  return STATUS_TONE_MAP[status] ?? 'neutral';
}

export default function StatusBadge({ status, icon, tone }: { status: string; icon?: ReactNode; tone?: Tone }) {
  const resolvedTone = tone ?? toneForStatus(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${TONE_CLASSES[resolvedTone]}`}
    >
      {icon}
      {status}
    </span>
  );
}
