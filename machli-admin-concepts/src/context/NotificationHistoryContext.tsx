import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { notifications as mockNotifications } from '../data/mockData';
import type { NotificationRecord } from '../types';

const STORAGE_KEY = 'machli-notification-history';

function loadInitial(): NotificationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as NotificationRecord[];
    }
  } catch {
    // Corrupted or inaccessible storage — fall back to the fixed demo data below.
  }
  return mockNotifications;
}

interface NotificationHistoryContextValue {
  notifications: NotificationRecord[];
  addNotification: (record: NotificationRecord) => void;
}

const NotificationHistoryContext = createContext<NotificationHistoryContextValue | null>(null);

export function NotificationHistoryProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationRecord[]>(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch {
      // Storage unavailable (e.g. private browsing quota) — the app still works for this session.
    }
  }, [notifications]);

  const addNotification = (record: NotificationRecord) => {
    setNotifications((prev) => [record, ...prev]);
  };

  return (
    <NotificationHistoryContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationHistoryContext.Provider>
  );
}

export function useNotificationHistoryStore() {
  const ctx = useContext(NotificationHistoryContext);
  if (!ctx) throw new Error('useNotificationHistoryStore must be used within a NotificationHistoryProvider');
  return ctx;
}
