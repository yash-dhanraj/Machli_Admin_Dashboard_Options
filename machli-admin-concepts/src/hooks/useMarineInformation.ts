import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  oceanStateForecasts,
  pfzEntries,
  tunaFishingAdvisories,
  svasAdvisories,
  solunarEntries,
} from '../data/mockData';

export const MARINE_TABS = [
  { id: 'osf', label: 'Ocean State Forecast' },
  { id: 'pfz', label: 'Potential Fishing Zone' },
  { id: 'tuna', label: 'Tuna Fishing' },
  { id: 'svas', label: 'SVAS' },
  { id: 'solunar', label: 'Solunar / Tide' },
];

export function useMarineInformation() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') ?? 'osf';
  const [tab, setTab] = useState(MARINE_TABS.some((t) => t.id === initialTab) ? initialTab : 'osf');

  const counts = {
    osf: oceanStateForecasts.length,
    pfz: pfzEntries.length,
    tuna: tunaFishingAdvisories.length,
    svas: svasAdvisories.length,
    solunar: solunarEntries.length,
  };

  return {
    tab,
    setTab,
    counts,
    oceanStateForecasts,
    pfzEntries,
    tunaFishingAdvisories,
    svasAdvisories,
    solunarEntries,
  };
}

export type MarineInformationVm = ReturnType<typeof useMarineInformation>;

// Parses "hh:mm AM/PM" into minutes-from-midnight for timeline positioning.
export function parseClockToMinutes(value: string): number | null {
  const match = value.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10) % 12;
  const minutes = parseInt(match[2], 10);
  if (match[3].toUpperCase() === 'PM') hours += 12;
  return hours * 60 + minutes;
}
