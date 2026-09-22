import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map, Briefcase } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { FilterSelect } from '../../components/forms/FilterBar';
import DataTable, { type Column } from '../../components/tables/DataTable';
import KpiCard from '../../components/cards/KpiCard';
import CoastalContextMap, { type MapMarker } from '../../components/option2/CoastalContextMap';
import { getMapPosition } from '../../lib/mapPositions';
import { statesDistricts, subDistrictsVillages, occupations } from '../../data/mockData';
import { tableDensity } from '../../lib/optionTheme';

type Section = 'states-districts' | 'sub-districts-villages' | 'occupations';

const TITLES: Record<Section, { title: string; subtitle: string }> = {
  'states-districts': { title: 'States & Districts', subtitle: 'Reference list of coastal states and their districts' },
  'sub-districts-villages': { title: 'Sub-Districts & Villages', subtitle: 'Reference list of sub-districts and villages by district' },
  occupations: { title: 'Occupations', subtitle: 'Reference list of registered occupation categories' },
};

interface StateRow { id: string; state: string; districtCount: number; districts: string }
interface SubDistrictRow { id: string; district: string; subDistrict: string; villages: string }
interface OccupationRow { id: string; name: string; description: string; userCount: number }

export default function ReferenceData({ section }: { section: Section }) {
  const { option } = useParams<{ option: string }>();
  const isOpt2 = option === 'option-2';
  const isOpt3 = option === 'option-3';
  const density = tableDensity(option);

  const [district, setDistrict] = useState('');

  if (section === 'states-districts') {
    const rows: StateRow[] = statesDistricts.map((s) => ({
      id: s.state,
      state: s.state,
      districtCount: s.districts.length,
      districts: s.districts.join(', '),
    }));
    const columns: Column<StateRow>[] = [
      { header: 'State', render: (r) => <span className="font-medium text-navy-800">{r.state}</span> },
      { header: 'District Count', render: (r) => r.districtCount },
      { header: 'Districts', render: (r) => <span className="text-xs text-slate-500">{r.districts}</span> },
    ];
    const markers: MapMarker[] = statesDistricts.map((s) => {
      const pos = getMapPosition(s.state);
      return { id: s.state, x: pos.x, y: pos.y, label: s.state, sublabel: `${s.districts.length} districts`, tone: 'teal' };
    });
    return (
      <div className={`flex flex-col ${isOpt3 ? 'gap-6' : isOpt2 ? 'gap-5' : 'gap-3'}`}>
        <PageHeader title={TITLES[section].title} subtitle={TITLES[section].subtitle} breadcrumb="Reference Data" />
        {isOpt3 && <KpiCard label="States Covered" value={statesDistricts.length} icon={Map} tone="ocean" />}
        {isOpt2 && <CoastalContextMap markers={markers} height={220} caption="Coastal states covered" />}
        <DataTable columns={columns} rows={rows} density={density} />
      </div>
    );
  }

  if (section === 'sub-districts-villages') {
    const rows: SubDistrictRow[] = subDistrictsVillages
      .filter((s) => !district || s.district === district)
      .map((s) => ({
        id: `${s.district}-${s.subDistrict}`,
        district: s.district,
        subDistrict: s.subDistrict,
        villages: s.villages.join(', '),
      }));
    const columns: Column<SubDistrictRow>[] = [
      { header: 'District', render: (r) => <span className="font-medium text-navy-800">{r.district}</span> },
      { header: 'Sub-District', render: (r) => r.subDistrict },
      { header: 'Villages', render: (r) => <span className="text-xs text-slate-500">{r.villages}</span> },
    ];
    return (
      <div className={`flex flex-col ${isOpt3 ? 'gap-6' : isOpt2 ? 'gap-5' : 'gap-3'}`}>
        <PageHeader title={TITLES[section].title} subtitle={TITLES[section].subtitle} breadcrumb="Reference Data" />
        <div className="w-fit">
          <FilterSelect
            compact={!isOpt3}
            label="District"
            value={district}
            onChange={setDistrict}
            options={Array.from(new Set(subDistrictsVillages.map((s) => s.district)))}
          />
        </div>
        <DataTable columns={columns} rows={rows} density={density} />
      </div>
    );
  }

  const rows: OccupationRow[] = occupations.map((o) => ({ id: o.name, ...o }));
  const columns: Column<OccupationRow>[] = [
    { header: 'Occupation', render: (r) => <span className="font-medium text-navy-800">{r.name}</span> },
    { header: 'Description', render: (r) => <span className="text-xs text-slate-500">{r.description}</span> },
    { header: 'Registered Users', render: (r) => r.userCount.toLocaleString('en-IN') },
  ];
  return (
    <div className={`flex flex-col ${isOpt3 ? 'gap-6' : isOpt2 ? 'gap-5' : 'gap-3'}`}>
      <PageHeader title={TITLES[section].title} subtitle={TITLES[section].subtitle} breadcrumb="Reference Data" />
      {isOpt3 && <KpiCard label="Occupation Categories" value={occupations.length} icon={Briefcase} tone="teal" />}
      <DataTable columns={columns} rows={rows} density={density} />
    </div>
  );
}
