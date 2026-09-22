import type { ReactNode } from 'react';
import { Search } from 'lucide-react';

export function FilterBar({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white shadow-sm ${
        compact ? 'p-2.5' : 'p-3'
      }`}
    >
      {children}
    </div>
  );
}

export function FilterSelect({
  label,
  value,
  onChange,
  options,
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  compact?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-lg border border-slate-300 bg-white text-sm text-navy-900 outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 ${
          compact ? 'min-w-30 px-2.5 py-1.5' : 'min-w-37.5 px-3 py-2'
        }`}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search',
  compact = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  compact?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
      Search
      <div
        className={`flex items-center gap-2 rounded-lg border border-slate-300 bg-white focus-within:border-ocean-500 focus-within:ring-1 focus-within:ring-ocean-500 ${
          compact ? 'min-w-45 px-2.5 py-1.5' : 'min-w-55 px-3 py-2'
        }`}
      >
        <Search size={15} className="text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm text-navy-900 outline-none placeholder:text-slate-400"
        />
      </div>
    </label>
  );
}
