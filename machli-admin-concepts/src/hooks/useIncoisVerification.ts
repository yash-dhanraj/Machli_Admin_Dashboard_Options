import { useMemo, useState } from 'react';
import { incoisItems, statesDistricts } from '../data/mockData';
import type { VerificationStatus } from '../types';

export const INCOIS_TAB_STATUS: Record<string, VerificationStatus> = {
  pending: 'Pending Verification',
  verified: 'Verified',
  mismatch: 'Mismatch / Not Verified',
};

export const INCOIS_ALERT_TYPES = ['High Wave Alert', 'Rough Sea Warning', 'Swell Surge', 'Ocean Current'];

export type IncoisTab = 'pending' | 'verified' | 'mismatch';

export function useIncoisVerification() {
  const [tab, setTab] = useState<IncoisTab>('pending');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [alertType, setAlertType] = useState('');

  const districts = useMemo(
    () => (state ? statesDistricts.find((s) => s.state === state)?.districts ?? [] : []),
    [state],
  );

  const counts = useMemo(
    () => ({
      pending: incoisItems.filter((i) => i.verificationStatus === 'Pending Verification').length,
      verified: incoisItems.filter((i) => i.verificationStatus === 'Verified').length,
      mismatch: incoisItems.filter((i) => i.verificationStatus === 'Mismatch / Not Verified').length,
    }),
    [],
  );

  const filtered = useMemo(
    () =>
      incoisItems.filter((item) => {
        if (item.verificationStatus !== INCOIS_TAB_STATUS[tab]) return false;
        if (state && item.state !== state) return false;
        if (district && item.district !== district) return false;
        if (alertType && item.alertType !== alertType) return false;
        return true;
      }),
    [tab, state, district, alertType],
  );

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const selected = useMemo(
    () => filtered.find((i) => i.id === selectedId) ?? filtered[0],
    [filtered, selectedId],
  );

  return {
    tab,
    setTab,
    state,
    setState: (v: string) => { setState(v); setDistrict(''); },
    district,
    setDistrict,
    alertType,
    setAlertType,
    districts,
    counts,
    filtered,
    selected,
    selectedId: selected?.id,
    setSelectedId,
  };
}
