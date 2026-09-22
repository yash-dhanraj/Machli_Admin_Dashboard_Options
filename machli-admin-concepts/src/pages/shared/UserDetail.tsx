import { useParams } from 'react-router-dom';
import { useUserDetail } from '../../hooks/useUserDetail';
import NotFoundCard from '../../components/shared/NotFoundCard';
import Option1Layout from '../../components/option1/UserDetailLayout';
import Option2Layout from '../../components/option2/UserDetailLayout';
import Option3Layout from '../../components/option3/UserDetailLayout';

export default function UserDetail() {
  const { option } = useParams<{ option: string }>();
  const { user, relatedNotifications } = useUserDetail();

  if (!user) {
    return <NotFoundCard message="User not found." backTo={`/${option}/users`} backLabel="Back to User Management" />;
  }

  if (option === 'option-2') return <Option2Layout user={user} relatedNotifications={relatedNotifications} />;
  if (option === 'option-3') return <Option3Layout user={user} relatedNotifications={relatedNotifications} />;
  return <Option1Layout user={user} relatedNotifications={relatedNotifications} />;
}
