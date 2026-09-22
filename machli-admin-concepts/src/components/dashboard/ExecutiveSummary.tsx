import { Users, ClipboardList, ShieldAlert, Bell, Anchor } from 'lucide-react';
import KpiCard from '../cards/KpiCard';
import BarChartCard from '../charts/BarChartCard';
import PieChartCard from '../charts/PieChartCard';
import { kpis, usersByState, alertStatusDistribution } from '../../data/mockData';

export default function ExecutiveSummary() {
  return (
    <div className="rounded-2xl border border-navy-800 bg-navy-900 p-5 text-white shadow-sm">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-teal-400">Executive Summary</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard label="Registered Users" value={kpis.registeredUsers.toLocaleString('en-IN')} icon={Users} tone="ocean" />
        <KpiCard label="Active Alerts" value={kpis.activeAlerts} icon={ShieldAlert} tone="danger" />
        <KpiCard label="Pending INCOIS Verification" value={String(kpis.incoisPending).padStart(2, '0')} icon={ClipboardList} tone="warning" />
        <KpiCard label="Manual Notifications" value={kpis.manualNotifications} icon={Bell} tone="teal" />
        <KpiCard label="Landing Centres" value={kpis.landingCentres} icon={Anchor} tone="navy" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BarChartCard title="Users by State" data={usersByState} color="#2ba0dd" />
        <PieChartCard title="Alert Status Distribution" data={alertStatusDistribution} />
      </div>
    </div>
  );
}
