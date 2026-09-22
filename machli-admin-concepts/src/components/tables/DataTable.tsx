import type { ReactNode } from 'react';

export interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

type Density = 'compact' | 'comfortable' | 'spacious';

const CELL_PADDING: Record<Density, string> = {
  compact: 'px-3 py-2',
  comfortable: 'px-4 py-3',
  spacious: 'px-5 py-3.5',
};

const HEAD_PADDING: Record<Density, string> = {
  compact: 'px-3 py-2',
  comfortable: 'px-4 py-3',
  spacious: 'px-5 py-3.5',
};

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = 'No records match the selected filters.',
  density = 'comfortable',
}: {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
  density?: Density;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-180 border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-surface-alt">
            {columns.map((col) => (
              <th
                key={col.header}
                className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-slate-500 ${HEAD_PADDING[density]}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 last:border-0 hover:bg-surface/70">
              {columns.map((col) => (
                <td key={col.header} className={`align-middle text-sm text-slate-700 ${CELL_PADDING[density]} ${col.className ?? ''}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
