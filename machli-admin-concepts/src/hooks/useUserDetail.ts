import { useParams } from 'react-router-dom';
import { users } from '../data/mockData';
import { useNotificationHistoryStore } from '../context/NotificationHistoryContext';

export function useUserDetail() {
  const { id } = useParams<{ id: string }>();
  const { notifications } = useNotificationHistoryStore();
  const user = users.find((u) => u.id === id);
  const relatedNotifications = notifications.filter((n) => n.state === user?.state).slice(0, 3);

  return { user, relatedNotifications };
}
