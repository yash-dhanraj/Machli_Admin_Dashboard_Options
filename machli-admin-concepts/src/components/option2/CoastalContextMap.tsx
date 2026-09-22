export interface MapMarker {
  id: string;
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  tone?: 'teal' | 'danger' | 'ocean' | 'warning';
}

const TONE_DOT: Record<NonNullable<MapMarker['tone']>, string> = {
  teal: 'bg-teal-500',
  danger: 'bg-status-danger',
  ocean: 'bg-ocean-500',
  warning: 'bg-status-warning',
};

export default function CoastalContextMap({
  markers,
  selectedId,
  onSelect,
  height = 340,
  caption = 'Conceptual illustration for presentation purposes — not to scale',
}: {
  markers: MapMarker[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  height?: number;
  caption?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs text-slate-400">{caption}</p>
      </div>
      <div
        className="relative w-full overflow-hidden rounded-lg border border-teal-500/20 bg-linear-to-br from-ocean-500/5 via-white to-teal-500/5"
        style={{ height }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path
            d="M14 4 L28 3 L34 12 L30 20 L38 24 L44 34 L40 44 L48 54 L44 64 L50 76 L44 88 L30 94 L18 86 L22 72 L16 60 L20 48 L12 38 L18 28 L10 18 Z"
            fill="rgba(18,169,155,0.06)"
            stroke="rgba(17,50,80,0.3)"
            strokeWidth="0.5"
          />
          <path
            d="M14 4 L28 3 L34 12 L30 20 L38 24 L44 34 L40 44 L48 54 L44 64 L50 76 L44 88"
            fill="none"
            stroke="rgba(46,196,182,0.6)"
            strokeWidth="0.6"
            strokeDasharray="1.5 1"
          />
        </svg>

        {markers.map((m) => {
          const isSelected = m.id === selectedId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelect?.(m.id)}
              title={m.label}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
            >
              {isSelected && (
                <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-teal-400/40" />
              )}
              <span
                className={`relative block rounded-full border-2 border-white shadow ${
                  isSelected ? 'h-4 w-4' : 'h-2.5 w-2.5'
                } ${TONE_DOT[m.tone ?? 'teal']}`}
              />
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-navy-900 px-2 py-1 text-[10px] text-white group-hover:block">
                {m.label}
                {m.sublabel ? ` · ${m.sublabel}` : ''}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
