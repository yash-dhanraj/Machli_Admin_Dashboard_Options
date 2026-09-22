import { statesDistricts, occupations } from '../../data/mockData';
import type { ManualNotificationVm } from '../../hooks/useManualNotification';

export default function RecipientFilterFields({ vm, layout = 'grid' }: { vm: ManualNotificationVm; layout?: 'grid' | 'stack' }) {
  const wrapClass = layout === 'grid' ? 'grid grid-cols-1 gap-3 sm:grid-cols-2' : 'flex flex-col gap-3';

  return (
    <div className={wrapClass}>
      <div>
        <label className="text-xs font-medium text-slate-500">State</label>
        <select
          value={vm.state}
          onChange={(e) => vm.onStateChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-900 outline-none focus:border-ocean-500"
        >
          <option value="">All States</option>
          {statesDistricts.map((s) => (
            <option key={s.state} value={s.state}>{s.state}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500">District</label>
        <select
          value={vm.district}
          onChange={(e) => vm.onDistrictChange(e.target.value)}
          disabled={!vm.state}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-900 outline-none focus:border-ocean-500 disabled:bg-surface-alt disabled:text-slate-400"
        >
          <option value="">All Districts</option>
          {vm.districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500">Sub-District</label>
        <select
          value={vm.subDistrict}
          onChange={(e) => vm.onSubDistrictChange(e.target.value)}
          disabled={!vm.district}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-900 outline-none focus:border-ocean-500 disabled:bg-surface-alt disabled:text-slate-400"
        >
          <option value="">All Sub-Districts</option>
          {vm.subDistricts.map((sd) => (
            <option key={sd} value={sd}>{sd}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500">Village</label>
        <select
          value={vm.village}
          onChange={(e) => vm.setVillage(e.target.value)}
          disabled={!vm.subDistrict}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-900 outline-none focus:border-ocean-500 disabled:bg-surface-alt disabled:text-slate-400"
        >
          <option value="">All Villages</option>
          {vm.villages.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500">Occupation</label>
        <select
          value={vm.occupation}
          onChange={(e) => vm.setOccupation(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-900 outline-none focus:border-ocean-500"
        >
          <option value="">All Occupations</option>
          {occupations.map((o) => (
            <option key={o.name} value={o.name}>{o.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500">Landing Centre</label>
        <select disabled className="mt-1 w-full cursor-not-allowed rounded-lg border border-slate-300 bg-surface-alt px-3 py-2 text-sm text-slate-400">
          <option>Not available</option>
        </select>
        <p className="mt-1 text-[11px] text-slate-400">Available after user-to-landing-centre mapping is confirmed</p>
      </div>
    </div>
  );
}
