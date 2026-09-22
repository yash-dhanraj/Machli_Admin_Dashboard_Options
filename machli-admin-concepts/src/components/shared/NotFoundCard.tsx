import { useNavigate } from 'react-router-dom';

export default function NotFoundCard({ message, backTo, backLabel }: { message: string; backTo: string; backLabel: string }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <p className="text-sm text-slate-500">{message}</p>
      <button onClick={() => navigate(backTo)} className="mt-3 text-sm font-medium text-ocean-600 hover:text-ocean-500">
        {backLabel}
      </button>
    </div>
  );
}
