import { Button } from '../components/ui/Button';

interface WelcomePageProps {
  onStart: () => void;
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Horizon Orientation</h2>
        <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
          Un parcours simple pour choisir tes spécialités avec méthode, clarté et confiance.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm text-slate-700 sm:p-5">
        L’outil t’accompagne étape par étape selon ton niveau, tes résultats et ton projet.
      </div>
      <Button className="sm:mx-auto sm:max-w-xs" onClick={onStart}>Commencer</Button>
    </div>
  );
}
