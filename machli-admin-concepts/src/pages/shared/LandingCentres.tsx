import { useParams } from 'react-router-dom';
import { useLandingCentres } from '../../hooks/useLandingCentres';
import Option1Layout from '../../components/option1/LandingCentresLayout';
import Option2Layout from '../../components/option2/LandingCentresLayout';
import Option3Layout from '../../components/option3/LandingCentresLayout';

export default function LandingCentres() {
  const { option } = useParams<{ option: string }>();
  const vm = useLandingCentres();

  if (option === 'option-2') return <Option2Layout vm={vm} />;
  if (option === 'option-3') return <Option3Layout vm={vm} />;
  return <Option1Layout vm={vm} />;
}
