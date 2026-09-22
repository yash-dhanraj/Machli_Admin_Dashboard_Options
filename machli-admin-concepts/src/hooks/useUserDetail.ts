import { useParams } from 'react-router-dom';
import { users, notifications } from '../data/mockData';

export function useUserDetail() {
  const { id } = useParams<{ id: string }>();
  const user = users.find((u) => u.id === id);
  const relatedNotifications = notifications.filter((n) => n.state === user?.state).slice(0, 3);

  return { user, relatedNotifications };
}
