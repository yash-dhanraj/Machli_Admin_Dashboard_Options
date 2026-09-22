import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import { getOptionTheme } from '../../lib/optionTheme';

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
  actions,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  actions?: ReactNode;
}) {
  const { option } = useParams<{ option: string }>();
  const theme = getOptionTheme(option);
  const isOpt2 = theme.id === 'option-2';
  const isOpt3 = theme.id === 'option-3';

  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${
        isOpt3 ? 'mb-8 border-b border-slate-200 pb-6' : isOpt2 ? 'mb-6' : 'mb-4'
      }`}
    >
      <div className={isOpt2 ? 'border-l-2 border-teal-500 pl-3' : ''}>
        {breadcrumb && (
          <div className="mb-1 flex items-center gap-1.5 text-xs text-slate-400">
            {isOpt2 && <MapPin size={11} className="text-teal-500" />}
            <Link to={`/${option}`} className="hover:text-ocean-600">
              Dashboard
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-500">{breadcrumb}</span>
          </div>
        )}
        <h1 className={`font-semibold text-navy-900 ${isOpt3 ? 'text-2xl sm:text-3xl' : isOpt2 ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-1 text-slate-500 ${isOpt3 ? 'text-sm' : 'text-xs sm:text-sm'}`}>{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
