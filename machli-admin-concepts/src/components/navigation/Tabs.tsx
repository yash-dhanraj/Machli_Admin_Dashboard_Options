export default function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium transition ${
            active === tab.id ? 'text-ocean-600' : 'text-slate-500 hover:text-navy-800'
          }`}
        >
          {tab.label}
          {typeof tab.count === 'number' && (
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                active === tab.id ? 'bg-ocean-500/10 text-ocean-600' : 'bg-surface-alt text-slate-500'
              }`}
            >
              {tab.count}
            </span>
          )}
          {active === tab.id && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-ocean-600" />}
        </button>
      ))}
    </div>
  );
}
