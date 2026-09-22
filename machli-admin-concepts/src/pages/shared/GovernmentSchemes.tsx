import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Landmark, Layers } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { FilterBar, FilterSelect } from '../../components/forms/FilterBar';
import DataTable, { type Column } from '../../components/tables/DataTable';
import KpiCard from '../../components/cards/KpiCard';
import { governmentSchemes, statesDistricts } from '../../data/mockData';
import { tableDensity } from '../../lib/optionTheme';
import type { GovernmentScheme } from '../../types';

export default function GovernmentSchemes() {
  const { option } = useParams<{ option: string }>();
  const isOpt2 = option === 'option-2';
  const isOpt3 = option === 'option-3';
  const density = tableDensity(option);

  const [state, setState] = useState('');
  const [category, setCategory] = useState('');
  const categories = Array.from(new Set(governmentSchemes.map((s) => s.category)));

  const filtered = governmentSchemes.filter((s) => {
    if (state && s.state !== state && s.state !== 'All States') return false;
    if (category && s.category !== category) return false;
    return true;
  });

  const groupedByState = useMemo(() => {
    const map = new Map<string, GovernmentScheme[]>();
    filtered.forEach((s) => {
      const arr = map.get(s.state) ?? [];
      arr.push(s);
      map.set(s.state, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const columns: Column<GovernmentScheme>[] = [
    { header: 'Scheme', render: (r) => <span className="font-medium text-navy-800">{r.scheme}</span> },
    { header: 'Category', render: (r) => r.category },
    { header: 'State', render: (r) => r.state },
    { header: 'District / Coverage', render: (r) => r.coverage },
    { header: 'From Date', render: (r) => r.fromDate },
    { header: 'To Date', render: (r) => r.toDate },
    { header: 'Source', render: (r) => <span className="text-xs text-slate-500">{r.source}</span> },
  ];

  return (
    <div className={`flex flex-col ${isOpt3 ? 'gap-6' : isOpt2 ? 'gap-5' : 'gap-3'}`}>
      <PageHeader title="Government Schemes" subtitle="Read-only reference of fisheries welfare and development schemes" breadcrumb="Government Schemes" />

      {isOpt3 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <KpiCard label="Active Schemes" value={governmentSchemes.length} icon={Landmark} tone="ocean" />
          <KpiCard label="Categories" value={categories.length} icon={Layers} tone="teal" />
        </div>
      )}

      <FilterBar compact={!isOpt3}>
        <FilterSelect compact={!isOpt3} label="State" value={state} onChange={setState} options={statesDistricts.map((s) => s.state)} />
        <FilterSelect compact={!isOpt3} label="Category" value={category} onChange={setCategory} options={categories} />
      </FilterBar>

      {isOpt2 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {groupedByState.map(([state, items]) => (
            <div key={state} className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-teal-500/20 bg-teal-500/5 px-4 py-3">
                <p className="text-sm font-semibold text-navy-900">{state}</p>
              </div>
              <ul className="divide-y divide-slate-100">
                {items.map((s) => (
                  <li key={s.id} className="px-4 py-3">
                    <p className="text-sm font-medium text-navy-800">{s.scheme}</p>
                    <p className="text-xs text-slate-500">{s.category} · {s.coverage}</p>
                    <p className="text-xs text-slate-400">{s.fromDate} – {s.toDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <DataTable columns={columns} rows={filtered} density={density} />
      )}
    </div>
  );
}
