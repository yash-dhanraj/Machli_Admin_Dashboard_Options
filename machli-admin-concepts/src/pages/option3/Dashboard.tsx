import { ShieldAlert, Waves } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import ExecutiveSummary from '../../components/dashboard/ExecutiveSummary';
import IncoisQueueList from '../../components/dashboard/IncoisQueueList';
import UserOverviewCharts from '../../components/dashboard/UserOverviewCharts';
import QuickActions from '../../components/dashboard/QuickActions';
import SummaryLinkCard from '../../components/dashboard/SummaryLinkCard';
import RecentNotificationsTable from '../../components/dashboard/RecentNotificationsTable';
import { alertsWarnings, oceanStateForecasts } from '../../data/mockData';
import AppFeedbackOverview from '../../components/dashboard/AppFeedbackOverview';

export default function Option3Dashboard() {
  const verifiedAlerts = alertsWarnings.filter((a) => a.verificationStatus === 'Verified').length;
  const pendingAlerts = alertsWarnings.filter((a) => a.verificationStatus !== 'Verified').length;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Executive + Operations Dashboard" subtitle="Management summary combined with daily operational visibility" />

      <ExecutiveSummary />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_420px]">
        <IncoisQueueList limit={4} />
        <UserOverviewCharts compact />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <QuickActions />
        <SummaryLinkCard
          title="Alerts & Warnings Summary"
          icon={ShieldAlert}
          path="alerts-warnings"
          stats={[
            { label: 'Verified', value: verifiedAlerts },
            { label: 'Pending / Mismatch', value: pendingAlerts },
          ]}
        />
        <SummaryLinkCard
          title="Marine Information Overview"
          icon={Waves}
          path="marine-information"
          stats={[
            { label: 'OSF Landing Centres', value: oceanStateForecasts.length },
            { label: 'Advisory Categories', value: 5 },
          ]}
        />
      </div>

      <AppFeedbackOverview />

      <RecentNotificationsTable />
    </div>
  );
}
