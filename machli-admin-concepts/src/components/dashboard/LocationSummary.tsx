import { usersByState, landingCentresByState, alertsWarnings } from '../../data/mockData';
import BarChartCard from '../charts/BarChartCard';
import StatusBadge from '../cards/StatusBadge';

export default function LocationSummary() {
  const currentAlerts = alertsWarnings.slice(0, 5);

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-navy-900">Location Summary</h3>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <BarChartCard title="Users by State" data={usersByState} color="#0e84c6" />
        <BarChartCard title="Landing Centres by State" data={landingCentresByState} color="#12a99b" />
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-navy-900">Current Alerts by Location</h3>
          <ul className="space-y-2.5">
            {currentAlerts.map((alert) => (
              <li key={alert.id} className="flex items-center justify-between gap-2 text-xs">
                <div>
                  <p className="font-medium text-navy-800">{alert.alertType}</p>
                  <p className="text-slate-400">
                    {alert.district}, {alert.state}
                  </p>
                </div>
                <StatusBadge status={alert.verificationStatus} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
