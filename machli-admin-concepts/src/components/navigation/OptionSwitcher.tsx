import { useNavigate, useParams } from 'react-router-dom';
import { optionMeta } from './navConfig';

const OPTIONS = ['option-1', 'option-2', 'option-3'];

export default function OptionSwitcher() {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();
  const current = option ?? 'option-1';

  return (
    <div className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-surface-alt p-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => navigate(`/${opt}`)}
          className={`rounded-md px-2 py-1.5 text-xs font-medium transition sm:px-2.5 ${
            opt === current ? 'bg-navy-900 text-white shadow-sm' : 'text-slate-600 hover:bg-white'
          }`}
        >
          <span className="sm:hidden">{optionMeta[opt].short.replace('Option ', '')}</span>
          <span className="hidden sm:inline">{optionMeta[opt].short}</span>
        </button>
      ))}
    </div>
  );
}
