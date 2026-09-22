import { FilterSelect, SearchInput } from '../forms/FilterBar';
import { statesDistricts, occupations } from '../../data/mockData';
import type { UserManagementVm } from '../../hooks/useUserManagement';

export default function UserFilterFields({ vm, compact = false }: { vm: UserManagementVm; compact?: boolean }) {
  return (
    <>
      <SearchInput compact={compact} value={vm.search} onChange={vm.setSearch} placeholder="Search by name or mobile" />
      <FilterSelect compact={compact} label="State" value={vm.state} onChange={vm.setState} options={statesDistricts.map((s) => s.state)} />
      <FilterSelect compact={compact} label="District" value={vm.district} onChange={vm.setDistrict} options={vm.districts} />
      <FilterSelect compact={compact} label="Sub-District" value={vm.subDistrict} onChange={vm.setSubDistrict} options={vm.subDistricts} />
      <FilterSelect compact={compact} label="Village" value={vm.village} onChange={vm.setVillage} options={vm.villages} />
      <FilterSelect compact={compact} label="Occupation" value={vm.occupation} onChange={vm.setOccupation} options={occupations.map((o) => o.name)} />
      <FilterSelect compact={compact} label="Platform" value={vm.platform} onChange={vm.setPlatform} options={['Android', 'iOS']} />
    </>
  );
}
