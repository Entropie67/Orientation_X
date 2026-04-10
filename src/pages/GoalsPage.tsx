import { GoalSelector } from '../components/forms/GoalSelector';
import { Button } from '../components/ui/Button';

interface GoalsPageProps {
  goalId: string | null;
  onSelect: (goalId: string) => void;
  onNext: () => void;
}

export function GoalsPage({ goalId, onSelect, onNext }: GoalsPageProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Projet et centres d’intérêt</h2>
      <p className="text-sm text-slate-600">Choisis le bloc qui te correspond le mieux aujourd’hui.</p>
      <GoalSelector value={goalId} onChange={onSelect} />
      <Button disabled={!goalId} onClick={onNext}>Voir mon résultat</Button>
    </div>
  );
}
