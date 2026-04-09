import { LevelSelector } from '../components/forms/LevelSelector';
import { Button } from '../components/ui/Button';
import { Level } from '../rules/recommendationTypes';

interface LevelPageProps {
  level: Level | null;
  onChange: (value: Level) => void;
  onNext: () => void;
}

export function LevelPage({ level, onChange, onNext }: LevelPageProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Étape 1 — Choisis ton niveau</h2>
      <LevelSelector value={level} onChange={onChange} />
      <Button disabled={!level} onClick={onNext}>Continuer</Button>
    </div>
  );
}
