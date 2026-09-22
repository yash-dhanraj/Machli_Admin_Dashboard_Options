import { useParams } from 'react-router-dom';
import { useMarineInformation } from '../../hooks/useMarineInformation';
import Option1Layout from '../../components/option1/MarineInformationLayout';
import Option2Layout from '../../components/option2/MarineInformationLayout';
import Option3Layout from '../../components/option3/MarineInformationLayout';

export default function MarineInformation() {
  const { option } = useParams<{ option: string }>();
  const vm = useMarineInformation();

  if (option === 'option-2') return <Option2Layout vm={vm} />;
  if (option === 'option-3') return <Option3Layout vm={vm} />;
  return <Option1Layout vm={vm} />;
}
