import { useMemo, useState } from 'react';
import { landingCentres } from '../data/mockData';

export function useLandingCentres() {
  const [selectedId, setSelectedId] = useState(landingCentres[0]?.id);
  const selected = landingCentres.find((lc) => lc.id === selectedId);

  const groupedByState = useMemo(() => {
    const map = new Map<string, typeof landingCentres>();
    landingCentres.forEach((lc) => {
      const arr = map.get(lc.state) ?? [];
      arr.push(lc);
      map.set(lc.state, arr);
    });
    return Array.from(map.entries()).map(([state, items]) => ({ state, items }));
  }, []);

  return { landingCentres, selectedId, setSelectedId, selected, groupedByState };
}

export type LandingCentresVm = ReturnType<typeof useLandingCentres>;

export const LANDING_CENTRE_SHORTCUTS = [
  { label: 'Ocean State Forecast', iconKey: 'osf' as const, path: 'marine-information?tab=osf' },
  { label: 'Potential Fishing Zone', iconKey: 'pfz' as const, path: 'marine-information?tab=pfz' },
  { label: 'Solunar / Tide', iconKey: 'tide' as const, path: 'marine-information?tab=solunar' },
  { label: 'Alerts & Warnings', iconKey: 'alerts' as const, path: 'alerts-warnings' },
];
