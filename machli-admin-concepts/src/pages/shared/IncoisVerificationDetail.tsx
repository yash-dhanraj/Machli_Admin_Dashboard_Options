import { useParams } from 'react-router-dom';
import { useIncoisDetail } from '../../hooks/useIncoisDetail';
import NotFoundCard from '../../components/shared/NotFoundCard';
import IncoisResultScreen from '../../components/shared/IncoisResultScreen';
import Option1Layout from '../../components/option1/IncoisVerificationDetailLayout';
import Option2Layout from '../../components/option2/IncoisVerificationDetailLayout';
import Option3Layout from '../../components/option3/IncoisVerificationDetailLayout';

export default function IncoisVerificationDetail() {
  const { option } = useParams<{ option: string }>();
  const vm = useIncoisDetail();

  if (!vm.item) {
    return (
      <NotFoundCard
        message="INCOIS item not found."
        backTo={`/${option}/incois-verification`}
        backLabel="Back to INCOIS Verification"
      />
    );
  }

  if (vm.result) {
    return <IncoisResultScreen alertType={vm.item.alertType} result={vm.result} />;
  }

  if (option === 'option-2') return <Option2Layout item={vm.item} vm={vm} />;
  if (option === 'option-3') return <Option3Layout item={vm.item} vm={vm} />;
  return <Option1Layout item={vm.item} vm={vm} />;
}
