import type { Column } from '../tables/DataTable';
import type { OceanStateForecastEntry, PfzEntry, SolunarEntry } from '../../types';

export const osfColumns: Column<OceanStateForecastEntry>[] = [
  { header: 'Landing Centre', render: (r) => <span className="font-medium text-navy-800">{r.landingCentre}</span> },
  { header: 'Date / Time', render: (r) => r.dateTime },
  { header: 'Range', render: (r) => r.range },
  { header: 'Wind', render: (r) => r.wind },
  { header: 'Wave', render: (r) => r.wave },
  { header: 'Ocean Current', render: (r) => r.current },
  { header: 'SST', render: (r) => r.sst },
  { header: 'Forecast Message', render: (r) => <span className="text-xs text-slate-500">{r.message}</span> },
];

export const pfzColumns: Column<PfzEntry>[] = [
  { header: 'Fishing Zone', render: (r) => <span className="font-medium text-navy-800">{r.fishingZone}</span> },
  { header: 'Depth', render: (r) => r.depth },
  { header: 'Distance', render: (r) => r.distance },
  { header: 'Landing Centre', render: (r) => r.landingCentre },
  { header: 'Validity', render: (r) => r.validity },
];

export const solunarColumns: Column<SolunarEntry>[] = [
  { header: 'Location', render: (r) => <span className="font-medium text-navy-800">{r.location}</span> },
  { header: 'Date', render: (r) => r.date },
  { header: 'Sunrise', render: (r) => r.sunrise },
  { header: 'Sunset', render: (r) => r.sunset },
  { header: 'High Tide', render: (r) => r.highTide },
  { header: 'Low Tide', render: (r) => r.lowTide },
  { header: 'Tide Forecast', render: (r) => r.tideForecast },
];
