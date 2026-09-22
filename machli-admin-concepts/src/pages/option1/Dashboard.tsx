import { ClipboardList, Bell, ShieldAlert, Users, Anchor } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import KpiCard from '../../components/cards/KpiCard';
import IncoisQueueList from '../../components/dashboard/IncoisQueueList';
import QuickActions from '../../components/dashboard/QuickActions';
import UserOverviewCharts from '../../components/dashboard/UserOverviewCharts';
import MachliInfoGrid from '../../components/dashboard/MachliInfoGrid';
import RecentNotificationsTable from '../../components/dashboard/RecentNotificationsTable';
import { kpis } from '../../data/mockData';

export default function Option1Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Operations Dashboard" subtitle="Users, communication and verification at a glance" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard label="Registered Users" value={kpis.registeredUsers.toLocaleString('en-IN')} icon={Users} tone="ocean" />
        <KpiCard label="INCOIS Pending Verification" value={String(kpis.incoisPending).padStart(2, '0')} icon={ClipboardList} tone="warning" />
        <KpiCard label="Active Alerts & Warnings" value={kpis.activeAlerts} icon={ShieldAlert} tone="danger" />
        <KpiCard label="Manual Notifications" value={kpis.manualNotifications} icon={Bell} tone="teal" />
        <KpiCard label="Landing Centres" value={kpis.landingCentres} icon={Anchor} tone="navy" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[65%_1fr]">
        <IncoisQueueList limit={4} />
        <QuickActions />
      </div>

      <UserOverviewCharts />

      <MachliInfoGrid />

      <RecentNotificationsTable />
    </div>
  );
}
