import { Check, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import NotificationTypeSelector from '../shared/NotificationTypeSelector';
import RecipientFilterFields from '../shared/RecipientFilterFields';
import RecipientSummary from '../shared/RecipientSummary';
import MobileNotificationPreview from '../shared/MobileNotificationPreview';
import ManualNotificationSuccess from '../shared/ManualNotificationSuccess';
import CoastalContextMap from './CoastalContextMap';
import { getMapPosition } from '../../lib/mapPositions';
import { MANUAL_NOTIFICATION_STEPS } from '../../hooks/useManualNotification';
import type { ManualNotificationVm } from '../../hooks/useManualNotification';

export default function ManualNotificationsLayout({ vm }: { vm: ManualNotificationVm }) {
  if (vm.sent) return <ManualNotificationSuccess vm={vm} />;

  const pos = vm.state ? getMapPosition(vm.state, vm.district || undefined) : undefined;

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Manual Notifications" subtitle="Who and where will receive this notification?" breadcrumb="Manual Notifications" />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[380px_1fr]">
        {/* LEFT: persistent location/targeting panel */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-teal-500/30 bg-teal-500/5 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal-700">
              <MapPin size={13} /> Recipient Targeting
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => vm.setRecipientMode('all')}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                  vm.recipientMode === 'all' ? 'border-teal-500 bg-teal-500/10 text-teal-700' : 'border-slate-200 text-slate-600'
                }`}
              >
                All Applicable Users
              </button>
              <button
                onClick={() => vm.setRecipientMode('filter')}
                className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                  vm.recipientMode === 'filter' ? 'border-teal-500 bg-teal-500/10 text-teal-700' : 'border-slate-200 text-slate-600'
                }`}
              >
                Filter by Location
              </button>
            </div>

            {vm.recipientMode === 'filter' && (
              <div className="mt-3">
                <RecipientFilterFields vm={vm} layout="stack" />
              </div>
            )}
          </div>

          <CoastalContextMap
            markers={pos ? [{ id: 'target', x: pos.x, y: pos.y, label: vm.district || vm.state, tone: 'teal' }] : []}
            height={200}
            caption={vm.state ? 'Approximate targeted region' : 'Select a state to preview the targeted region'}
          />
        </div>

        {/* RIGHT: step wizard */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            {MANUAL_NOTIFICATION_STEPS.map((label, idx) => (
              <div key={label} className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    idx < vm.step ? 'bg-teal-600 text-white' : idx === vm.step ? 'bg-navy-900 text-white' : 'bg-surface-alt text-slate-400'
                  }`}
                >
                  {idx < vm.step ? <Check size={14} /> : idx + 1}
                </div>
                <span className={`hidden truncate text-xs font-medium sm:inline ${idx <= vm.step ? 'text-navy-900' : 'text-slate-400'}`}>{label}</span>
                {idx < MANUAL_NOTIFICATION_STEPS.length - 1 && <div className="mx-1 h-px min-w-2 flex-1 bg-slate-200" />}
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {vm.step === 0 && (
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-navy-900">Step 1 · Notification Content</h2>
                <div>
                  <label className="text-xs font-medium text-slate-500">Title</label>
                  <input
                    value={vm.title}
                    onChange={(e) => vm.setTitle(e.target.value)}
                    placeholder="e.g. Rough Sea Advisory"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">Message</label>
                  <textarea
                    value={vm.message}
                    onChange={(e) => vm.setMessage(e.target.value)}
                    rows={4}
                    placeholder="Enter the notification message shown to users"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">Notification Type</label>
                  <div className="mt-2">
                    <NotificationTypeSelector value={vm.notifType} onChange={vm.setNotifType} />
                  </div>
                </div>
              </div>
            )}

            {vm.step === 1 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-navy-900">Step 2 · Recipients</h2>
                <p className="text-xs text-slate-500">
                  Audience is configured using the targeting panel on the left. Current selection:
                </p>
                <div className="rounded-lg border border-slate-200 p-3">
                  <RecipientSummary vm={vm} />
                </div>
              </div>
            )}

            {vm.step === 2 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[220px_1fr]">
                <MobileNotificationPreview title={vm.title} message={vm.message} />
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-navy-900">Step 3 · Preview & Recipients</h2>
                  <div className="rounded-lg border border-slate-200 p-3">
                    <p className="text-xs font-medium text-slate-500">Who will receive this</p>
                    <div className="mt-1"><RecipientSummary vm={vm} /></div>
                  </div>
                </div>
              </div>
            )}

            {vm.step === 3 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-navy-900">Step 4 · Send</h2>
                <div className="rounded-lg border border-slate-200 p-3">
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Title</dt>
                      <dd className="text-right font-medium text-navy-800">{vm.title}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Type</dt>
                      <dd className="text-right font-medium text-navy-800">{vm.notifType}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-slate-500">Recipients</dt>
                      <dd className="text-right font-medium text-navy-800">
                        {vm.recipientMode === 'all' ? 'All Applicable Users' : vm.filterSummary.join(', ') || 'All Applicable Users'}
                      </dd>
                    </div>
                  </dl>
                </div>
                <p className="text-xs text-slate-400">Concept prototype — no notification is actually delivered.</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={vm.goBack}
              disabled={vm.step === 0}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-navy-800 hover:bg-surface-alt disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} /> Back
            </button>

            {vm.step < MANUAL_NOTIFICATION_STEPS.length - 1 ? (
              <button
                onClick={vm.goNext}
                disabled={vm.step === 0 && !vm.step1Valid}
                className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => vm.send()}
                className="flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
              >
                Send Notification <Check size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
