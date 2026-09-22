import { useNavigate } from 'react-router-dom';
import { Anchor, ArrowRight, Bell, ClipboardCheck, MapPin, Users, Waves, BarChart3 } from 'lucide-react';

const options = [
  {
    id: 'option-1',
    tag: 'OPTION 01',
    title: 'Operations Focused',
    description:
      'Designed for day-to-day admin operations with immediate visibility of pending INCOIS verification, notifications, users and alerts.',
    preview: 'ops' as const,
  },
  {
    id: 'option-2',
    tag: 'OPTION 02',
    title: 'Coastal Intelligence',
    description:
      'A location-focused dashboard centred around coastal areas, landing centres, alerts and marine information.',
    preview: 'coastal' as const,
  },
  {
    id: 'option-3',
    tag: 'OPTION 03',
    title: 'Executive + Operations',
    description:
      'A balanced dashboard combining management-level summary with operational tasks and user/location visibility.',
    preview: 'executive' as const,
  },
];

function OpsPreview() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-md bg-navy-800/40 p-1.5">
          <div className="h-1.5 w-6 rounded-full bg-teal-400/60" />
          <div className="mt-1.5 h-2.5 w-8 rounded bg-white/70" />
        </div>
      ))}
      <div className="col-span-2 rounded-md bg-navy-800/40 p-1.5">
        <div className="h-1.5 w-10 rounded-full bg-white/40" />
        <div className="mt-1.5 space-y-1">
          <div className="h-1.5 w-full rounded bg-teal-400/40" />
          <div className="h-1.5 w-4/5 rounded bg-white/20" />
        </div>
      </div>
      <div className="rounded-md bg-navy-800/40 p-1.5">
        <div className="h-1.5 w-8 rounded-full bg-white/40" />
        <div className="mt-1.5 h-1.5 w-full rounded bg-ocean-400/50" />
      </div>
    </div>
  );
}

function CoastalPreview() {
  return (
    <div className="relative h-full overflow-hidden rounded-md bg-navy-800/40 p-2">
      <div className="h-1.5 w-14 rounded-full bg-white/40" />
      <svg viewBox="0 0 100 50" className="mt-2 h-16 w-full">
        <path d="M8 6 L20 4 L34 10 L30 20 L40 26 L36 38 L20 44 L10 34 L14 20 Z" fill="rgba(46,196,182,0.18)" stroke="rgba(46,196,182,0.5)" strokeWidth="0.6" />
        <circle cx="20" cy="14" r="1.6" fill="#2ec4b6" />
        <circle cx="30" cy="24" r="1.6" fill="#f4b942" />
        <circle cx="18" cy="32" r="1.6" fill="#2ba0dd" />
        <circle cx="34" cy="14" r="1.6" fill="#2ec4b6" />
      </svg>
    </div>
  );
}

function ExecutivePreview() {
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-4 gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 rounded bg-navy-800/40" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="h-10 rounded-md bg-navy-800/40 p-1.5">
          <div className="h-1.5 w-8 rounded-full bg-white/40" />
        </div>
        <div className="h-10 rounded-md bg-navy-800/40 p-1.5">
          <div className="h-1.5 w-8 rounded-full bg-teal-400/50" />
        </div>
      </div>
    </div>
  );
}

const previewIcons = {
  ops: [ClipboardCheck, Bell, Users],
  coastal: [MapPin, Waves, Anchor],
  executive: [BarChart3, ClipboardCheck, Users],
};

export default function DesignSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-14 sm:px-10">
        <header className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-400">
            <Anchor size={26} />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">MACHLI</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Admin Dashboard Concepts</h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">Select a dashboard concept to preview</p>
        </header>

        <div className="mt-14 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
          {options.map((opt) => {
            const Icons = previewIcons[opt.preview];
            return (
              <div
                key={opt.id}
                className="flex flex-col rounded-2xl border border-navy-700 bg-navy-900 p-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] transition hover:border-teal-500/50"
              >
                <div className="flex items-center gap-2">
                  {Icons.map((Icon, idx) => (
                    <span
                      key={idx}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-teal-400"
                    >
                      <Icon size={15} />
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-teal-400">{opt.tag}</p>
                <h2 className="mt-1 text-xl font-semibold text-white">{opt.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{opt.description}</p>

                <div className="mt-6 h-32 rounded-lg border border-navy-700 bg-navy-950/60 p-2">
                  {opt.preview === 'ops' && <OpsPreview />}
                  {opt.preview === 'coastal' && <CoastalPreview />}
                  {opt.preview === 'executive' && <ExecutivePreview />}
                </div>

                <button
                  onClick={() => navigate(`/${opt.id}`)}
                  className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-semibold text-navy-950 transition hover:bg-teal-400"
                >
                  View {opt.tag.replace('OPTION', 'Option')}
                  <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-slate-500">
          All concepts use the same functional scope; only the UI/UX approach differs.
        </p>

        <footer className="mt-6 text-center text-xs text-slate-500">
          Machli Admin Dashboard • Concept Design Exploration
        </footer>
      </div>
    </div>
  );
}
