import { notificationTypes } from '../../data/mockData';

export default function NotificationTypeSelector({
  value,
  onChange,
  columns = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <div className={`grid grid-cols-2 gap-2 ${columns === 3 ? 'sm:grid-cols-3' : ''}`}>
      {notificationTypes.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
            value === type
              ? 'border-ocean-500 bg-ocean-500/10 text-ocean-700'
              : 'border-slate-200 text-slate-600 hover:border-ocean-300'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
