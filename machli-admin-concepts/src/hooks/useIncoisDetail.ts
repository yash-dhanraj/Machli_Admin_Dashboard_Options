import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { incoisItems } from '../data/mockData';

export const INCOIS_CHECKLIST_ITEMS = [
  'Location Verified',
  'State / District Verified',
  'Validity Period Verified',
  'Alert / Warning Type Verified',
  'Alert Message Verified',
];

export function useIncoisDetail() {
  const { id } = useParams<{ id: string }>();
  const item = useMemo(() => incoisItems.find((i) => i.id === id), [id]);

  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState('');
  const [result, setResult] = useState<'Verified' | 'Mismatch / Not Verified' | null>(null);

  const allChecked = INCOIS_CHECKLIST_ITEMS.every((c) => checks[c]);
  const toggleCheck = (label: string, value: boolean) => setChecks((prev) => ({ ...prev, [label]: value }));

  return { item, checks, toggleCheck, note, setNote, result, setResult, allChecked };
}
