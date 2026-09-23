import { useNavigate, useParams } from 'react-router-dom';
import { Users, ClipboardList, ShieldAlert, Anchor, PlusCircle } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import CoastalMapPanel from '../../components/dashboard/CoastalMapPanel';
import IncoisQueueList from '../../components/dashboard/IncoisQueueList';
import LocationSummary from '../../components/dashboard/LocationSummary';
import RecentNotificationsTable from '../../components/dashboard/RecentNotificationsTable';
import { kpis } from '../../data/mockData';
import AppFeedbackOverview from '../../components/dashboard/AppFeedbackOverview';

function CompactKpi({ label, value, icon: Icon }: { label: string; value: string | number; icon: typeof Users }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean-500/10 text-ocean-600">
        <Icon size={17} />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
        <p className="text-lg font-semibold text-navy-900">{value}</p>
      </div>
    </div>
  );
}

export default function Option2Dashboard() {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Coastal Intelligence Dashboard"
        subtitle="Location-first visibility of coastal operations and alerts"
        actions={
          <button
            onClick={() => navigate(`/${option}/manual-notifications`)}
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-teal-500"
          >
            <PlusCircle size={16} /> Create Manual Notification
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <CompactKpi label="Registered Users" value={kpis.registeredUsers.toLocaleString('en-IN')} icon={Users} />
        <CompactKpi label="Pending INCOIS" value={String(kpis.incoisPending).padStart(2, '0')} icon={ClipboardList} />
        <CompactKpi label="Active Alerts" value={kpis.activeAlerts} icon={ShieldAlert} />
        <CompactKpi label="Landing Centres" value={kpis.landingCentres} icon={Anchor} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
        <CoastalMapPanel />
        <IncoisQueueList limit={3} compact />
      </div>

      <LocationSummary />

      <AppFeedbackOverview />

      <RecentNotificationsTable />
    </div>
  );
}
