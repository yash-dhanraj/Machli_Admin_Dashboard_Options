import { Check, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import PageHeader from '../layout/PageHeader';
import NotificationTypeSelector from '../shared/NotificationTypeSelector';
import RecipientFilterFields from '../shared/RecipientFilterFields';
import RecipientSummary from '../shared/RecipientSummary';
import MobileNotificationPreview from '../shared/MobileNotificationPreview';
import ManualNotificationSuccess from '../shared/ManualNotificationSuccess';
import { MANUAL_NOTIFICATION_STEPS } from '../../hooks/useManualNotification';
import type { ManualNotificationVm } from '../../hooks/useManualNotification';

export default function ManualNotificationsLayout({ vm }: { vm: ManualNotificationVm }) {
  if (vm.sent) return <ManualNotificationSuccess vm={vm} />;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Manual Notifications" subtitle="Compose, target, and send a notification to Machli app users" breadcrumb="Manual Notifications" />

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        {MANUAL_NOTIFICATION_STEPS.map((label, idx) => (
          <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                idx < vm.step ? 'bg-teal-600 text-white' : idx === vm.step ? 'bg-navy-900 text-white' : 'bg-surface-alt text-slate-400'
              }`}
            >
              {idx < vm.step ? <Check size={15} /> : idx + 1}
            </div>
            <span className={`hidden truncate text-sm font-medium sm:inline ${idx <= vm.step ? 'text-navy-900' : 'text-slate-400'}`}>{label}</span>
            {idx < MANUAL_NOTIFICATION_STEPS.length - 1 && <div className="mx-1 h-px min-w-2 flex-1 bg-slate-200" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {vm.step === 0 && (
            <div className="mx-auto max-w-xl space-y-5">
              <h2 className="text-base font-semibold text-navy-900">Notification Content</h2>
              <div>
                <label className="text-xs font-medium text-slate-500">Title</label>
                <input
                  value={vm.title}
                  onChange={(e) => vm.setTitle(e.target.value)}
                  placeholder="e.g. Fishing Ban Advisory"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Message</label>
                <textarea
                  value={vm.message}
                  onChange={(e) => vm.setMessage(e.target.value)}
                  rows={5}
                  placeholder="Enter the notification message shown to users"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500"
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
            <div className="mx-auto max-w-xl space-y-5">
              <h2 className="text-base font-semibold text-navy-900">Recipients</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => vm.setRecipientMode('all')}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition ${
                    vm.recipientMode === 'all' ? 'border-ocean-500 bg-ocean-500/10 text-ocean-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  All Applicable Users
                </button>
                <button
                  onClick={() => vm.setRecipientMode('filter')}
                  className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition ${
                    vm.recipientMode === 'filter' ? 'border-ocean-500 bg-ocean-500/10 text-ocean-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Filter Users
                </button>
              </div>
              {vm.recipientMode === 'filter' && (
                <div className="rounded-lg border border-slate-200 p-4">
                  <RecipientFilterFields vm={vm} />
                </div>
              )}
            </div>
          )}

          {vm.step === 2 && (
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-[220px_1fr]">
              <MobileNotificationPreview title={vm.title} message={vm.message} />
              <div>
                <h2 className="mb-3 text-base font-semibold text-navy-900">Preview & Recipients</h2>
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-xs font-medium text-slate-500">Notification Type</p>
                  <p className="text-sm text-navy-800">{vm.notifType || 'Not selected'}</p>
                  <p className="mt-3 text-xs font-medium text-slate-500">Recipients</p>
                  <div className="mt-1"><RecipientSummary vm={vm} /></div>
                </div>
              </div>
            </div>
          )}

          {vm.step === 3 && (
            <div className="mx-auto max-w-xl space-y-4">
              <h2 className="text-base font-semibold text-navy-900">Final Confirmation</h2>
              <div className="rounded-lg border border-slate-200 p-4">
                <dl className="space-y-2.5 text-sm">
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

          <div className="mx-auto mt-8 flex max-w-xl items-center justify-between">
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
                className="flex items-center gap-1.5 rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => vm.setSent(true)}
                className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-500"
              >
                Send Notification <Check size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Content Summary</p>
            <p className="text-sm font-medium text-navy-900">{vm.title || 'Untitled notification'}</p>
            <p className="mt-1 text-xs text-slate-500">{vm.notifType || 'Type not selected'}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Audience Summary</p>
            <RecipientSummary vm={vm} />
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-navy-900 p-5 text-white shadow-sm">
            <Send size={18} className="text-teal-400" />
            <p className="text-xs text-slate-300">
              {vm.step < 3 ? 'Continue through the remaining steps to send this notification.' : 'Ready to send.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
