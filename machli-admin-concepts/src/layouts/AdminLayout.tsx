import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import TopHeader from '../components/layout/TopHeader';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { option } = useParams<{ option: string }>();

  if (!['option-1', 'option-2', 'option-3'].includes(option ?? '')) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface text-center">
        <div>
          <p className="text-lg font-semibold text-navy-900">Unknown design option</p>
          <p className="mt-1 text-sm text-slate-500">Please return to the design options screen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-0">
        <TopHeader onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="min-w-0 flex-1 px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
