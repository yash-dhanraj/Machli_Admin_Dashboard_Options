import { useParams } from 'react-router-dom';
import { useIncoisVerification } from '../../hooks/useIncoisVerification';
import Option1Layout from '../../components/option1/IncoisVerificationLayout';
import Option2Layout from '../../components/option2/IncoisVerificationLayout';
import Option3Layout from '../../components/option3/IncoisVerificationLayout';

export default function IncoisVerification() {
  const { option } = useParams<{ option: string }>();
  const vm = useIncoisVerification();

  if (option === 'option-2') return <Option2Layout vm={vm} />;
  if (option === 'option-3') return <Option3Layout vm={vm} />;
  return <Option1Layout vm={vm} />;
}
