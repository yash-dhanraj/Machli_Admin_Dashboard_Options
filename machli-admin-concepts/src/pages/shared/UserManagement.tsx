import { useParams } from 'react-router-dom';
import { useUserManagement } from '../../hooks/useUserManagement';
import Option1Layout from '../../components/option1/UserManagementLayout';
import Option2Layout from '../../components/option2/UserManagementLayout';
import Option3Layout from '../../components/option3/UserManagementLayout';

export default function UserManagement() {
  const { option } = useParams<{ option: string }>();
  const vm = useUserManagement();

  if (option === 'option-2') return <Option2Layout vm={vm} />;
  if (option === 'option-3') return <Option3Layout vm={vm} />;
  return <Option1Layout vm={vm} />;
}
