import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ChartDatum } from '../../types';

export default function BarChartCard({
  title,
  data,
  color = '#0e84c6',
  height = 220,
  compact = false,
}: {
  title?: string;
  data: ChartDatum[];
  color?: string;
  height?: number;
  compact?: boolean;
}) {
  const showLabels = !compact && data.length <= 8;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {title && <h3 className="mb-3 text-sm font-semibold text-navy-900">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6ebef" vertical={false} />
          <XAxis
            dataKey="label"
            tick={showLabels ? { fontSize: 11, fill: '#5a6b7a' } : false}
            tickLine={false}
            axisLine={{ stroke: '#e6ebef' }}
            interval={0}
            angle={showLabels && data.length > 5 ? -20 : 0}
            textAnchor={showLabels && data.length > 5 ? 'end' : 'middle'}
            height={showLabels ? (data.length > 5 ? 40 : 24) : 6}
          />
          <YAxis tick={{ fontSize: 11, fill: '#5a6b7a' }} tickLine={false} axisLine={false} width={compact ? 30 : 52} />
          <Tooltip
            cursor={{ fill: 'rgba(14,132,198,0.06)' }}
            contentStyle={{ borderRadius: 8, borderColor: '#e2e8f0', fontSize: 12 }}
          />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} maxBarSize={compact ? 22 : 36} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
