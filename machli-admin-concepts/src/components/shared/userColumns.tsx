import type { NavigateFunction } from 'react-router-dom';
import type { Column } from '../tables/DataTable';
import type { UserRecord } from '../../types';

export function getUserColumns(navigate: NavigateFunction, option?: string): Column<UserRecord>[] {
  return [
    { header: 'Name', render: (r) => <span className="font-medium text-navy-800">{r.name}</span> },
    { header: 'Mobile', render: (r) => r.mobile },
    { header: 'Occupation', render: (r) => r.occupation },
    { header: 'State', render: (r) => r.state },
    { header: 'District', render: (r) => r.district },
    { header: 'Sub-District', render: (r) => r.subDistrict },
    { header: 'Village', render: (r) => r.village },
    {
      header: 'Action',
      render: (r) => (
        <button
          onClick={() => navigate(`/${option}/users/${r.id}`)}
          className="text-xs font-medium text-ocean-600 hover:text-ocean-500"
        >
          View
        </button>
      ),
    },
  ];
}
