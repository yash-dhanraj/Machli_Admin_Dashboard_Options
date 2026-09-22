import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import Field from '../shared/Field';
import UserSecondarySections from '../shared/UserSecondarySections';
import type { UserRecord, NotificationRecord } from '../../types';

export default function UserDetailLayout({ user, relatedNotifications }: { user: UserRecord; relatedNotifications: NotificationRecord[] }) {
  const { option } = useParams<{ option: string }>();
  const navigate = useNavigate();
  const initials = user.name.split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="User Detail" subtitle="Profile, location, and related information" breadcrumb="User Management" />

      <button
        onClick={() => navigate(`/${option}/users`)}
        className="flex w-fit items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-ocean-600"
      >
        <ArrowLeft size={13} /> Back to User Management
      </button>

      <div className="rounded-2xl border border-navy-800 bg-navy-900 p-6 text-white shadow-sm">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/20 text-lg font-semibold text-teal-300">
            {initials}
          </span>
          <div>
            <p className="text-xl font-semibold text-white">{user.name}</p>
            <p className="text-sm text-slate-300">{user.occupation} · {user.state}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-white/5 p-3">
            <p className="flex items-center gap-1.5 text-[11px] text-slate-400"><Phone size={11} /> Mobile</p>
            <p className="text-sm font-medium text-white">{user.mobile}</p>
          </div>
          <div className="rounded-lg bg-white/5 p-3">
            <p className="text-[11px] text-slate-400">Age</p>
            <p className="text-sm font-medium text-white">{user.age}</p>
          </div>
          <div className="rounded-lg bg-white/5 p-3">
            <p className="text-[11px] text-slate-400">Platform</p>
            <p className="text-sm font-medium text-white">{user.platform}</p>
          </div>
          <div className="rounded-lg bg-white/5 p-3">
            <p className="flex items-center gap-1.5 text-[11px] text-slate-400"><MapPin size={11} /> District</p>
            <p className="text-sm font-medium text-white">{user.district}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-navy-900">Profile</h3>
          <div className="grid grid-cols-2 gap-5">
            <Field label="Name" value={user.name} />
            <Field label="Mobile" value={user.mobile} />
            <Field label="Age" value={user.age} />
            <Field label="Occupation" value={user.occupation} />
            <Field label="Other Occupation" value={user.otherOccupation ?? 'Not applicable'} />
            <Field label="Platform" value={user.platform} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-navy-900">Location</h3>
          <div className="grid grid-cols-2 gap-5">
            <Field label="State" value={user.state} />
            <Field label="District" value={user.district} />
            <Field label="Sub-District" value={user.subDistrict} />
            <Field label="Village" value={user.village} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-navy-900">Related Data</h3>
        <UserSecondarySections user={user} relatedNotifications={relatedNotifications} />
      </div>
    </div>
  );
}
