import { useNavigate, useParams } from 'react-router-dom';
import { PlusCircle, ClipboardCheck, Users, ShieldAlert } from 'lucide-react';

export default function QuickActions() {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  const actions = [
    { label: 'Create Manual Notification', icon: PlusCircle, path: 'manual-notifications', primary: true },
    { label: 'Review INCOIS Items', icon: ClipboardCheck, path: 'incois-verification', primary: false },
    { label: 'View Users', icon: Users, path: 'users', primary: false },
    { label: 'View Alerts & Warnings', icon: ShieldAlert, path: 'alerts-warnings', primary: false },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-navy-900">Quick Actions</h3>
      <div className="flex flex-col gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(`/${option}/${action.path}`)}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
              action.primary
                ? 'bg-teal-600 text-white hover:bg-teal-500'
                : 'border border-slate-200 text-navy-800 hover:border-ocean-400/60 hover:bg-surface-alt'
            }`}
          >
            <action.icon size={16} />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
