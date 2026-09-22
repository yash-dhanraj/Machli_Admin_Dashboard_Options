import { useNavigate, useParams } from 'react-router-dom';
import { landingCentres, alertsWarnings } from '../../data/mockData';

export default function CoastalMapPanel() {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();
  const activeAlerts = alertsWarnings.filter((a) => a.verificationStatus !== 'Verified');

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-navy-900">Coastal Intelligence Map</h3>
          <p className="text-xs text-slate-400">Conceptual illustration for presentation purposes — not to scale</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-teal-500" /> Landing centre
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-status-danger" /> Active alert
          </span>
        </div>
      </div>

      <div className="relative h-90 w-full overflow-hidden rounded-lg border border-slate-200 bg-linear-to-br from-ocean-500/5 via-white to-teal-500/5">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path
            d="M14 4 L28 3 L34 12 L30 20 L38 24 L44 34 L40 44 L48 54 L44 64 L50 76 L44 88 L30 94 L18 86 L22 72 L16 60 L20 48 L12 38 L18 28 L10 18 Z"
            fill="rgba(14,132,198,0.06)"
            stroke="rgba(17,50,80,0.35)"
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

        {landingCentres.map((lc) => (
          <button
            key={lc.id}
            onClick={() => navigate(`/${option}/landing-centres`)}
            title={lc.name}
            style={{ left: `${lc.x}%`, top: `${lc.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span className="block h-2.5 w-2.5 rounded-full border-2 border-white bg-teal-500 shadow" />
            <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-navy-900 px-2 py-1 text-[10px] text-white group-hover:block">
              {lc.name}
            </span>
          </button>
        ))}

        {activeAlerts.map((alert) => (
          <button
            key={alert.id}
            onClick={() => navigate(`/${option}/incois-verification`)}
            title={alert.alertType}
            style={{ left: `${alert.x}%`, top: `${alert.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span className="block h-3 w-3 animate-pulse rounded-full border-2 border-white bg-status-danger shadow" />
            <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-navy-900 px-2 py-1 text-[10px] text-white group-hover:block">
              {alert.alertType} · {alert.district}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
