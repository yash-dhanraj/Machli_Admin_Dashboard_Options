import { useMemo, useState } from 'react';
import { users, statesDistricts, subDistrictsVillages } from '../data/mockData';

export function useUserManagement() {
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [subDistrict, setSubDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [occupation, setOccupation] = useState('');
  const [platform, setPlatform] = useState('');

  const districts = state ? statesDistricts.find((s) => s.state === state)?.districts ?? [] : [];
  const subDistricts = district
    ? Array.from(new Set(subDistrictsVillages.filter((s) => s.district === district).map((s) => s.subDistrict)))
    : [];
  const villages = subDistrict ? subDistrictsVillages.find((s) => s.subDistrict === subDistrict)?.villages ?? [] : [];

  const filtered = useMemo(
    () =>
      users.filter((u) => {
        if (search && !`${u.name} ${u.mobile}`.toLowerCase().includes(search.toLowerCase())) return false;
        if (state && u.state !== state) return false;
        if (district && u.district !== district) return false;
        if (subDistrict && u.subDistrict !== subDistrict) return false;
        if (village && u.village !== village) return false;
        if (occupation && u.occupation !== occupation) return false;
        if (platform && u.platform !== platform) return false;
        return true;
      }),
    [search, state, district, subDistrict, village, occupation, platform],
  );

  const usersByStateCount = useMemo(() => {
    const map = new Map<string, number>();
    users.forEach((u) => map.set(u.state, (map.get(u.state) ?? 0) + 1));
    return Array.from(map.entries()).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
  }, []);

  const statesRepresented = usersByStateCount.length;
  const occupationsRepresented = new Set(users.map((u) => u.occupation)).size;
  const villagesCovered = new Set(users.map((u) => u.village)).size;

  return {
    search, setSearch,
    state, setState: (v: string) => { setState(v); setDistrict(''); setSubDistrict(''); setVillage(''); },
    district, setDistrict: (v: string) => { setDistrict(v); setSubDistrict(''); setVillage(''); },
    subDistrict, setSubDistrict: (v: string) => { setSubDistrict(v); setVillage(''); },
    village, setVillage,
    occupation, setOccupation,
    platform, setPlatform,
    districts, subDistricts, villages,
    filtered,
    total: users.length,
    usersByStateCount,
    statesRepresented,
    occupationsRepresented,
    villagesCovered,
  };
}

export type UserManagementVm = ReturnType<typeof useUserManagement>;
