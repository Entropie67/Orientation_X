import { ReactNode } from 'react';

interface AppShellProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AppShell({ step, totalSteps, title, subtitle, children }: AppShellProps) {
  const progress = Math.min(100, Math.max(0, Math.round((step / totalSteps) * 100)));

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <header className="mb-6 space-y-3 border-b border-slate-100 pb-5 sm:pb-6">
          <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold tracking-wide text-brand-800">Horizon Orientation</p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          <p className="max-w-3xl text-sm text-slate-600 sm:text-base">{subtitle}</p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Progression</span>
              <span>Étape {step} / {totalSteps}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 rounded-full bg-brand-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}
