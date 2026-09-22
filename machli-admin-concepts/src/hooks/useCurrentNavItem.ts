import { useLocation, useParams } from 'react-router-dom';
import { navGroups } from '../components/navigation/navConfig';

export function useCurrentNavItem() {
  const { option } = useParams<{ option: string }>();
  const location = useLocation();
  const base = `/${option ?? 'option-1'}`;
  const rest = location.pathname.startsWith(base) ? location.pathname.slice(base.length).replace(/^\//, '') : '';

  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.path === '' && rest === '') return { group: group.label, item: item.label };
      if (item.path && (rest === item.path || rest.startsWith(`${item.path}/`))) {
        return { group: group.label, item: item.label };
      }
    }
  }
  return { group: 'Overview', item: 'Dashboard' };
}
