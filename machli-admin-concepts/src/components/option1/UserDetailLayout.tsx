import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import Field from '../shared/Field';
import UserSecondarySections from '../shared/UserSecondarySections';
import type { UserRecord, NotificationRecord } from '../../types';

export default function UserDetailLayout({ user, relatedNotifications }: { user: UserRecord; relatedNotifications: NotificationRecord[] }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <PageHeader title={user.name} subtitle={user.mobile} breadcrumb="User Management" />

      <button
        onClick={() => navigate(`/${option}/users`)}
        className="flex w-fit items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-ocean-600"
      >
        <ArrowLeft size={13} /> Back to User Management
      </button>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Profile</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Field label="Name" value={user.name} />
          <Field label="Mobile" value={user.mobile} />
          <Field label="Age" value={user.age} />
          <Field label="Occupation" value={user.occupation} />
          <Field label="Other Occupation" value={user.otherOccupation ?? 'Not applicable'} />
          <Field label="Platform" value={user.platform} />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Location</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Field label="State" value={user.state} />
          <Field label="District" value={user.district} />
          <Field label="Sub-District" value={user.subDistrict} />
          <Field label="Village" value={user.village} />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Related Information</h3>
        <UserSecondarySections user={user} relatedNotifications={relatedNotifications} />
      </div>
    </div>
  );
}
