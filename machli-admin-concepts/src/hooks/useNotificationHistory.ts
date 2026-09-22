import { useMemo, useState } from 'react';
import { notifications, statesDistricts } from '../data/mockData';
import type { NotificationRecord } from '../types';

export function useNotificationHistory() {
  const [source, setSource] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [selected, setSelected] = useState<NotificationRecord | null>(null);

  const districts = state ? statesDistricts.find((s) => s.state === state)?.districts ?? [] : [];
  const dates = useMemo(() => Array.from(new Set(notifications.map((n) => n.dateTime.split(',')[0]))), []);
  const statuses = Array.from(new Set(notifications.map((n) => n.status)));

  const filtered = useMemo(
    () =>
      notifications.filter((n) => {
        if (source && n.source !== source) return false;
        if (state && n.state !== state) return false;
        if (district && n.district !== district) return false;
        if (status && n.status !== status) return false;
        if (date && !n.dateTime.startsWith(date)) return false;
        return true;
      }),
    [source, state, district, status, date],
  );

  const groupedByState = useMemo(() => {
    const map = new Map<string, NotificationRecord[]>();
    filtered.forEach((n) => {
      const arr = map.get(n.state) ?? [];
      arr.push(n);
      map.set(n.state, arr);
    });
    return Array.from(map.entries()).map(([state, items]) => ({ state, items }));
  }, [filtered]);

  const bySource = {
    manual: notifications.filter((n) => n.source === 'Manual').length,
    incois: notifications.filter((n) => n.source === 'INCOIS').length,
  };
  const byStatus = statuses.map((s) => ({ label: s, value: notifications.filter((n) => n.status === s).length }));

  return {
    source, setSource,
    state, setState: (v: string) => { setState(v); setDistrict(''); },
    district, setDistrict,
    status, setStatus,
    date, setDate,
    districts, dates, statuses,
    filtered,
    groupedByState,
    bySource,
    byStatus,
    selected, setSelected,
    total: notifications.length,
  };
}

export type NotificationHistoryVm = ReturnType<typeof useNotificationHistory>;
