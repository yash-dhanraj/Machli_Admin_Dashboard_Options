import { Anchor } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import LandingCentreShortcuts from '../shared/LandingCentreShortcuts';
import type { LandingCentresVm } from '../../hooks/useLandingCentres';

export default function LandingCentresLayout({ vm }: { vm: LandingCentresVm }) {
  return (
    <div className="flex flex-col gap-3">
      <PageHeader title="Landing Centres / Nearby Ports" subtitle="Registered fish landing centres and ports" breadcrumb="Landing Centres" />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-160 border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-surface-alt">
                {['Name', 'FLC / Location ID', 'State', 'District', 'Location'].map((h) => (
                  <th key={h} className="whitespace-nowrap px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vm.landingCentres.map((lc) => (
                <tr
                  key={lc.id}
                  onClick={() => vm.setSelectedId(lc.id)}
                  className={`cursor-pointer border-b border-slate-100 last:border-0 transition hover:bg-surface-alt/60 ${
                    vm.selectedId === lc.id ? 'bg-ocean-500/5' : ''
                  }`}
                >
                  <td className="px-3 py-2 font-medium text-navy-800">{lc.name}</td>
                  <td className="px-3 py-2 text-slate-600">{lc.flcId}</td>
                  <td className="px-3 py-2 text-slate-600">{lc.state}</td>
                  <td className="px-3 py-2 text-slate-600">{lc.district}</td>
                  <td className="px-3 py-2 text-slate-600">{lc.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="h-fit rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          {vm.selected ? (
            <>
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
                  <Anchor size={15} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{vm.selected.name}</p>
                  <p className="text-xs text-slate-400">{vm.selected.flcId}</p>
                </div>
              </div>
              <p className="mb-2 mt-2.5 text-xs font-medium uppercase tracking-wide text-slate-400">Quick Navigation</p>
              <LandingCentreShortcuts compact />
            </>
          ) : (
            <p className="text-sm text-slate-400">Select a landing centre to view quick navigation.</p>
          )}
        </div>
      </div>
    </div>
  );
}
