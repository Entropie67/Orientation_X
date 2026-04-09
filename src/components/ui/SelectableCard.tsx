import { ReactNode } from 'react';

interface SelectableCardProps {
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function SelectableCard({ selected = false, disabled = false, onClick, children }: SelectableCardProps) {
  const classes = selected
    ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-100'
    : 'border-slate-200 bg-white hover:border-brand-200 hover:shadow-card';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${classes} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
    </button>
  );
}
