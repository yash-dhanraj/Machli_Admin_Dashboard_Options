import { usersByState, usersByDistrict, usersByOccupation } from '../../data/mockData';
import BarChartCard from '../charts/BarChartCard';

export default function UserOverviewCharts({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-navy-900">User Overview</h3>
      <div className={compact ? 'flex flex-col gap-4' : 'grid grid-cols-1 gap-4 lg:grid-cols-3'}>
        <BarChartCard title="Users by State" data={usersByState} color="#0e84c6" compact={compact} height={compact ? 160 : 220} />
        <BarChartCard title="Users by District" data={usersByDistrict} color="#12a99b" compact={compact} height={compact ? 160 : 220} />
        <BarChartCard title="Users by Occupation" data={usersByOccupation} color="#1e5686" compact={compact} height={compact ? 160 : 220} />
      </div>
    </div>
  );
}
