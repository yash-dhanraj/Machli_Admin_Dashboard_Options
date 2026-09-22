import { useNavigate, useParams } from 'react-router-dom';
import { LogOut, Shield, Bell, Globe, Moon } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { adminProfile } from '../../data/mockData';
import { getOptionTheme } from '../../lib/optionTheme';

function PlaceholderToggle({ icon: Icon, label, description, spacious }: { icon: typeof Bell; label: string; description: string; spacious: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 rounded-lg border border-slate-200 ${spacious ? 'px-5 py-4' : 'px-4 py-3'}`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-alt text-slate-500">
          <Icon size={15} />
        </span>
        <div>
          <p className="text-sm font-medium text-navy-800">{label}</p>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
      <span className="shrink-0 rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-medium text-slate-400">
        Not available in this concept
      </span>
    </div>
  );
}

export default function Settings() {
  const { option } = useParams<{ option: string }>();
  const theme = getOptionTheme(option);
  const isOpt2 = theme.id === 'option-2';
  const isOpt3 = theme.id === 'option-3';
  const navigate = useNavigate();
  const initials = adminProfile.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <div className={`flex flex-col ${isOpt3 ? 'gap-6' : 'gap-4'}`}>
      <PageHeader title="Admin Access / Settings" subtitle="Profile and application settings" breadcrumb="Admin Access / Settings" />

      <div
        className={`rounded-xl border shadow-sm ${
          isOpt2 ? 'border-teal-500/30 bg-teal-500/5' : 'border-slate-200 bg-white'
        } ${isOpt3 ? 'p-6' : 'p-5'}`}
      >
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-navy-900">
          <Shield size={15} className={isOpt2 ? 'text-teal-600' : 'text-ocean-600'} /> Admin Profile
        </h3>
        <div className="flex items-center gap-4">
          <span className={`flex items-center justify-center rounded-full bg-navy-800 font-semibold text-white ${isOpt3 ? 'h-16 w-16 text-lg' : 'h-14 w-14 text-base'}`}>
            {initials}
          </span>
          <div>
            <p className="text-sm font-semibold text-navy-900">{adminProfile.name}</p>
            <p className="text-xs text-slate-500">{adminProfile.email}</p>
            <p className="mt-1 text-xs text-slate-400">{adminProfile.role} &middot; Last login {adminProfile.lastLogin}</p>
          </div>
        </div>
      </div>

      <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${isOpt3 ? 'p-6' : 'p-5'}`}>
        <h3 className="mb-4 text-sm font-semibold text-navy-900">Application Settings</h3>
        <div className="space-y-3">
          <PlaceholderToggle spacious={isOpt3} icon={Bell} label="Notification Preferences" description="Configure default channels for outbound notifications." />
          <PlaceholderToggle spacious={isOpt3} icon={Globe} label="Language & Region" description="Set default language and regional formatting." />
          <PlaceholderToggle spacious={isOpt3} icon={Moon} label="Appearance" description="Switch between light and dark presentation themes." />
        </div>
      </div>

      <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${isOpt3 ? 'p-6' : 'p-5'}`}>
        <h3 className="mb-1 text-sm font-semibold text-navy-900">Session</h3>
        <p className="mb-4 text-xs text-slate-400">End the current admin session for this concept prototype.</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 rounded-lg border border-status-danger/30 bg-status-danger-bg px-4 py-2 text-sm font-medium text-status-danger hover:bg-status-danger/10"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}
