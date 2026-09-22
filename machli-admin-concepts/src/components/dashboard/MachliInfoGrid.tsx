import { useNavigate, useParams } from 'react-router-dom';
import { Waves, Fish, MapPinned, Moon, ShieldAlert, Landmark, LifeBuoy } from 'lucide-react';
import InfoCard from '../cards/InfoCard';

const items = [
  { title: 'Ocean State Forecast', description: 'Wind, wave, current and sea surface temperature by landing centre.', icon: Waves, path: 'marine-information?tab=osf' },
  { title: 'Potential Fishing Zone', description: 'Advisory fishing zones with depth and distance from coast.', icon: MapPinned, path: 'marine-information?tab=pfz' },
  { title: 'Tuna Fishing', description: 'Tuna fishing advisory information for coastal zones.', icon: Fish, path: 'marine-information?tab=tuna' },
  { title: 'Solunar / Tide', description: 'Sunrise, sunset and tide forecast information by location.', icon: Moon, path: 'marine-information?tab=solunar' },
  { title: 'Alerts & Warnings', description: 'Read-only list of active marine alerts and warnings.', icon: ShieldAlert, path: 'alerts-warnings' },
  { title: 'Government Schemes', description: 'Fisheries welfare and development scheme information.', icon: Landmark, path: 'government-schemes' },
  { title: 'Emergency Helplines', description: 'National, state and district emergency helpline numbers.', icon: LifeBuoy, path: 'emergency-helplines' },
];

export default function MachliInfoGrid() {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-navy-900">Machli Information</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <InfoCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            onView={() => navigate(`/${option}/${item.path}`)}
          />
        ))}
      </div>
    </div>
  );
}
