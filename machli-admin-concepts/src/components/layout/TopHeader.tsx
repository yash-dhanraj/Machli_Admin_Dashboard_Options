import { Menu, MapPin, LayoutGrid } from 'lucide-react';
import { useParams } from 'react-router-dom';
import OptionSwitcher from '../navigation/OptionSwitcher';
import { adminProfile } from '../../data/mockData';
import { getOptionTheme } from '../../lib/optionTheme';
import { useCurrentNavItem } from '../../hooks/useCurrentNavItem';

export default function TopHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { option } = useParams<{ option: string }>();
  const theme = getOptionTheme(option);
  const nav = useCurrentNavItem();
  const initials = adminProfile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  const isOpt2 = theme.id === 'option-2';
  const isOpt3 = theme.id === 'option-3';

  return (
    <header
      className={`sticky top-0 z-20 border-b bg-white/90 backdrop-blur ${
        isOpt2 ? 'border-teal-500/30' : 'border-slate-200'
      }`}
    >
      <div className={`flex items-center justify-between gap-2 px-4 ${isOpt3 ? 'py-4' : 'py-3'} lg:px-6`}>
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <button
            onClick={onMenuClick}
            className="shrink-0 rounded-md p-1.5 text-slate-500 hover:bg-surface-alt lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          {isOpt2 ? (
            <div className="flex min-w-0 items-center gap-1.5 rounded-full bg-teal-500/10 px-3 py-1.5 text-xs font-medium text-teal-700">
              <MapPin size={13} className="shrink-0" />
              <span className="hidden sm:inline">{nav.group}</span>
              <span className="hidden text-teal-400 sm:inline">/</span>
              <span className="truncate text-teal-800">{nav.item}</span>
            </div>
          ) : isOpt3 ? (
            <div className="min-w-0">
              <div className="hidden items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-400 sm:flex">
                <LayoutGrid size={12} />
                {nav.group}
              </div>
              <p className="truncate text-sm font-semibold text-navy-900">{nav.item}</p>
            </div>
          ) : (
            <p className="hidden truncate text-xs text-slate-400 sm:block">Machli Admin Dashboard</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <OptionSwitcher />
          <div className="hidden items-center gap-2 border-l border-slate-200 pl-3 lg:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-xs font-semibold text-white">
              {initials}
            </span>
            <div className="leading-tight">
              <p className="text-xs font-medium text-navy-900">{adminProfile.name}</p>
              <p className="text-[11px] text-slate-400">{adminProfile.role}</p>
            </div>
          </div>
        </div>
      </div>
      {isOpt2 && <div className="h-0.5 bg-linear-to-r from-teal-500 via-ocean-400 to-transparent" />}
    </header>
  );
}
