import { Sunrise, Sunset, Waves } from 'lucide-react';
import { parseClockToMinutes } from '../../hooks/useMarineInformation';
import type { SolunarEntry } from '../../types';

const DAY_MINUTES = 24 * 60;

function TimelineDot({ minutes, label, tone }: { minutes: number; label: string; tone: string }) {
  const left = (minutes / DAY_MINUTES) * 100;
  return (
    <div className="group absolute -translate-x-1/2" style={{ left: `${left}%`, top: 0 }}>
      <span className={`block h-3 w-3 rounded-full border-2 border-white shadow ${tone}`} />
      <span className="pointer-events-none absolute left-1/2 top-5 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-navy-900 px-2 py-1 text-[10px] text-white group-hover:block">
        {label}
      </span>
    </div>
  );
}

function TideTimeline({ entry }: { entry: SolunarEntry }) {
  const sunrise = parseClockToMinutes(entry.sunrise);
  const sunset = parseClockToMinutes(entry.sunset);
  const highTides = entry.highTide.split('/').map((t) => parseClockToMinutes(t.trim())).filter((v): v is number => v !== null);
  const lowTides = entry.lowTide.split('/').map((t) => parseClockToMinutes(t.trim())).filter((v): v is number => v !== null);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-navy-900">{entry.location}</p>
        <span className="text-xs text-slate-400">{entry.date}</span>
      </div>
      <div className="relative mt-6 h-3 rounded-full bg-linear-to-r from-navy-800 via-ocean-400 to-navy-800">
        {sunrise !== null && <TimelineDot minutes={sunrise} label={`Sunrise ${entry.sunrise}`} tone="bg-status-warning" />}
        {sunset !== null && <TimelineDot minutes={sunset} label={`Sunset ${entry.sunset}`} tone="bg-status-danger" />}
        {highTides.map((m, i) => <TimelineDot key={`h${i}`} minutes={m} label={`High Tide`} tone="bg-teal-500" />)}
        {lowTides.map((m, i) => <TimelineDot key={`l${i}`} minutes={m} label={`Low Tide`} tone="bg-ocean-600" />)}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
        <div className="flex items-center gap-1.5"><Sunrise size={13} className="text-status-warning" /> {entry.sunrise}</div>
        <div className="flex items-center gap-1.5"><Sunset size={13} className="text-status-danger" /> {entry.sunset}</div>
        <div className="flex items-center gap-1.5"><Waves size={13} className="text-teal-600" /> High: {entry.highTide}</div>
        <div className="flex items-center gap-1.5"><Waves size={13} className="text-ocean-600" /> Low: {entry.lowTide}</div>
      </div>
      <p className="mt-3 text-xs text-slate-500">{entry.tideForecast}</p>
    </div>
  );
}

export default function MarineTidePanel({ entries }: { entries: SolunarEntry[] }) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <TideTimeline key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
