import { useParams } from 'react-router-dom';
import Option1Dashboard from './option1/Dashboard';
import Option2Dashboard from './option2/Dashboard';
import Option3Dashboard from './option3/Dashboard';

export default function OptionDashboardRouter() {
  const { option } = useParams<{ option: string }>();

  if (option === 'option-2') return <Option2Dashboard />;
  if (option === 'option-3') return <Option3Dashboard />;
  return <Option1Dashboard />;
}
