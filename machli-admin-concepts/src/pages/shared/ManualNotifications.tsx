import { useParams } from 'react-router-dom';
import { useManualNotification } from '../../hooks/useManualNotification';
import Option1Layout from '../../components/option1/ManualNotificationsLayout';
import Option2Layout from '../../components/option2/ManualNotificationsLayout';
import Option3Layout from '../../components/option3/ManualNotificationsLayout';

export default function ManualNotifications() {
  const { option } = useParams<{ option: string }>();
  const vm = useManualNotification();

  if (option === 'option-2') return <Option2Layout vm={vm} />;
  if (option === 'option-3') return <Option3Layout vm={vm} />;
  return <Option1Layout vm={vm} />;
}
