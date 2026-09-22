import { useNavigate, useParams } from 'react-router-dom';
import { Waves, MapPinned, Moon, ShieldAlert } from 'lucide-react';
import { LANDING_CENTRE_SHORTCUTS } from '../../hooks/useLandingCentres';

const ICONS = { osf: Waves, pfz: MapPinned, tide: Moon, alerts: ShieldAlert };

export default function LandingCentreShortcuts({ compact = false }: { compact?: boolean }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      {LANDING_CENTRE_SHORTCUTS.map((s) => {
        const Icon = ICONS[s.iconKey];
        return (
          <button
            key={s.label}
            onClick={() => navigate(`/${option}/${s.path}`)}
            className={`flex items-center gap-2.5 rounded-lg border border-slate-200 text-left text-sm text-navy-800 transition hover:border-ocean-400/60 hover:bg-surface-alt ${
              compact ? 'px-2.5 py-2' : 'px-3 py-2.5'
            }`}
          >
            <Icon size={15} className="text-ocean-600" />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
