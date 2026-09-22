import { useState } from 'react';
import { statesDistricts, subDistrictsVillages } from '../data/mockData';
import { useNotificationHistoryStore } from '../context/NotificationHistoryContext';
import { formatDateTime } from '../lib/formatDateTime';
import type { NotificationType } from '../types';

export const MANUAL_NOTIFICATION_STEPS = ['Content', 'Recipients', 'Preview', 'Send'];

export type RecipientMode = 'all' | 'filter';

export function useManualNotification() {
  const { addNotification } = useNotificationHistoryStore();
  const [step, setStep] = useState(0);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [notifType, setNotifType] = useState<string>('');

  const [recipientMode, setRecipientMode] = useState<RecipientMode>('all');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [occupation, setOccupation] = useState('');

  const [sent, setSent] = useState(false);

  const districts = state ? statesDistricts.find((s) => s.state === state)?.districts ?? [] : [];
  const subDistricts = district
    ? Array.from(new Set(subDistrictsVillages.filter((s) => s.district === district).map((s) => s.subDistrict)))
    : [];
  const villages = subDistrict
    ? subDistrictsVillages.find((s) => s.subDistrict === subDistrict)?.villages ?? []
    : [];

  const step1Valid = title.trim().length > 0 && message.trim().length > 0 && notifType.length > 0;

  const filterSummary = [
    state && `State: ${state}`,
    district && `District: ${district}`,
    subDistrict && `Sub-District: ${subDistrict}`,
    village && `Village: ${village}`,
    occupation && `Occupation: ${occupation}`,
  ].filter(Boolean) as string[];

  const goNext = () => setStep((s) => Math.min(s + 1, MANUAL_NOTIFICATION_STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onStateChange = (v: string) => { setState(v); setDistrict(''); setSubDistrict(''); setVillage(''); };
  const onDistrictChange = (v: string) => { setDistrict(v); setSubDistrict(''); setVillage(''); };
  const onSubDistrictChange = (v: string) => { setSubDistrict(v); setVillage(''); };

  const send = () => {
    const audienceSummary = recipientMode === 'all' ? 'All Applicable Users' : filterSummary.join(', ') || 'All Applicable Users';

    addNotification({
      id: `NTF-M-${Date.now()}`,
      source: 'Manual',
      title,
      notificationType: notifType as NotificationType,
      message,
      location: audienceSummary,
      state: state || 'All States',
      district: district || 'All Districts',
      status: 'Sent',
      dateTime: formatDateTime(new Date()),
    });

    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setStep(0);
    setTitle('');
    setMessage('');
    setNotifType('');
    setRecipientMode('all');
    setState('');
    setDistrict('');
    setSubDistrict('');
    setVillage('');
    setOccupation('');
  };

  return {
    step, setStep, goNext, goBack,
    title, setTitle,
    message, setMessage,
    notifType, setNotifType,
    recipientMode, setRecipientMode,
    state, district, subDistrict, village, occupation,
    setOccupation,
    onStateChange, onDistrictChange, onSubDistrictChange, setVillage,
    districts, subDistricts, villages,
    step1Valid, filterSummary,
    sent, setSent,
    send,
    reset,
  };
}

export type ManualNotificationVm = ReturnType<typeof useManualNotification>;
