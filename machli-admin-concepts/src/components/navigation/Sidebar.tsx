import { NavLink, useParams } from 'react-router-dom';
import { ArrowLeft, Anchor, X, Waves, LayoutGrid } from 'lucide-react';
import { navGroups } from './navConfig';
import { getOptionTheme } from '../../lib/optionTheme';

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { option } = useParams<{ option: string }>();
  const optionId = option ?? 'option-1';
  const base = `/${optionId}`;
  const theme = getOptionTheme(optionId);

  const isOpt2 = theme.id === 'option-2';
  const isOpt3 = theme.id === 'option-3';

  const widthClass = isOpt2 ? 'w-80' : isOpt3 ? 'w-76' : 'w-64';
  const itemPadding = isOpt3 ? 'px-3.5 py-2.5' : isOpt2 ? 'px-3 py-2.5' : 'px-2.5 py-1.5';
  const groupGap = isOpt3 ? 'mb-6' : isOpt2 ? 'mb-5' : 'mb-3';
  const accentText = isOpt2 ? 'text-teal-400' : isOpt3 ? 'text-ocean-400' : 'text-teal-400';
  const accentBg = isOpt2 ? 'bg-teal-500/15 text-teal-300' : isOpt3 ? 'bg-ocean-500/15 text-ocean-300' : 'bg-teal-500/15 text-teal-300';

  const OptionIcon = isOpt2 ? Waves : isOpt3 ? LayoutGrid : Anchor;

  return (
    <>
      {open && (
        <button
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-navy-950/40 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex ${widthClass} flex-col border-r border-navy-800 bg-navy-900 text-slate-200 transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className={`flex items-center justify-between gap-2 border-b border-navy-800 px-5 ${isOpt3 ? 'py-5' : isOpt2 ? 'py-4' : 'py-3.5'}`}>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/15 text-teal-400">
              <OptionIcon size={18} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">MACHLI</p>
              <p className="text-[11px] text-slate-400">Admin Dashboard</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-navy-800 hover:text-white lg:hidden">
            <X size={18} />
          </button>
        </div>

        <div className={`border-b border-navy-800 px-5 ${isOpt3 ? 'py-4' : 'py-3'} ${isOpt2 ? 'bg-navy-950/40' : ''}`}>
          <NavLink
            to="/"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-teal-400"
          >
            <ArrowLeft size={13} /> Back to Design Options
          </NavLink>
          <div className={`mt-2.5 flex min-w-0 items-center gap-2 rounded-lg px-2.5 py-1.5 ${accentBg}`}>
            <span className="shrink-0 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest">{theme.label}</span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-current opacity-50" />
            <span className="min-w-0 flex-1 truncate whitespace-nowrap text-[10px] font-medium uppercase tracking-wide opacity-90">{theme.name}</span>
          </div>
          {isOpt2 && <p className={`mt-1.5 text-[10px] italic ${accentText}`}>{theme.tagline}</p>}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group, gi) => (
            <div key={group.label} className={groupGap}>
              {isOpt2 && gi > 0 && <div className="mb-3 h-px bg-linear-to-r from-teal-500/30 via-navy-700 to-transparent" />}
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const to = item.path ? `${base}/${item.path}` : base;
                  return (
                    <li key={item.label}>
                      <NavLink
                        to={to}
                        end={item.path === ''}
                        className={({ isActive }) =>
                          `flex items-center gap-2.5 rounded-lg ${itemPadding} text-sm transition ${
                            isActive
                              ? `${accentBg} font-medium`
                              : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                          }`
                        }
                      >
                        <item.icon size={16} strokeWidth={2} />
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
