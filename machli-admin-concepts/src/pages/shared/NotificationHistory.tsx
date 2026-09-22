import { useParams } from 'react-router-dom';
import { useNotificationHistory } from '../../hooks/useNotificationHistory';
import Option1Layout from '../../components/option1/NotificationHistoryLayout';
import Option2Layout from '../../components/option2/NotificationHistoryLayout';
import Option3Layout from '../../components/option3/NotificationHistoryLayout';

export default function NotificationHistory() {
  const { option } = useParams<{ option: string }>();
  const vm = useNotificationHistory();

  if (option === 'option-2') return <Option2Layout vm={vm} />;
  if (option === 'option-3') return <Option3Layout vm={vm} />;
  return <Option1Layout vm={vm} />;
}
