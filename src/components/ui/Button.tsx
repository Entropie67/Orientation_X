import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base =
    'w-full rounded-2xl px-5 py-3 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  const styles =
    variant === 'primary'
      ? 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300'
      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:outline-slate-500';

  return <button className={`${base} ${styles} ${className}`.trim()} {...props} />;
}
