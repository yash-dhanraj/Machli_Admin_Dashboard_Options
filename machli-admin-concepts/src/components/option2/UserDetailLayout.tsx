import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, MapPin } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import Field from '../shared/Field';
import UserSecondarySections from '../shared/UserSecondarySections';
import CoastalContextMap from './CoastalContextMap';
import { getMapPosition } from '../../lib/mapPositions';
import type { UserRecord, NotificationRecord } from '../../types';

export default function UserDetailLayout({ user, relatedNotifications }: { user: UserRecord; relatedNotifications: NotificationRecord[] }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();
  const pos = getMapPosition(user.state, user.district);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title={user.name} subtitle={`${user.mobile} · ${user.occupation}`} breadcrumb="User Management" />

      <button
        onClick={() => navigate(`/${option}/users`)}
        className="flex w-fit items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-teal-600"
      >
        <ArrowLeft size={13} /> Back to User Management
      </button>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-5 shadow-sm">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal-700">
            <MapPin size={13} /> Location Hierarchy
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-navy-900">
            <span>{user.state}</span>
            <ChevronRight size={14} className="text-teal-400" />
            <span>{user.district}</span>
            <ChevronRight size={14} className="text-teal-400" />
            <span>{user.subDistrict}</span>
            <ChevronRight size={14} className="text-teal-400" />
            <span className="text-teal-700">{user.village}</span>
          </div>
        </div>

        <CoastalContextMap
          markers={[{ id: user.id, x: pos.x, y: pos.y, label: user.village, sublabel: user.district, tone: 'teal' }]}
          selectedId={user.id}
          height={140}
          caption="Approximate location context"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-navy-900">Profile Details</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Field label="Name" value={user.name} />
          <Field label="Mobile" value={user.mobile} />
          <Field label="Age" value={user.age} />
          <Field label="Occupation" value={user.occupation} />
          <Field label="Other Occupation" value={user.otherOccupation ?? 'Not applicable'} />
          <Field label="Platform" value={user.platform} />
        </div>
      </div>

      <UserSecondarySections user={user} relatedNotifications={relatedNotifications} />
    </div>
  );
}
