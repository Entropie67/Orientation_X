import { SpecialtiesSelector } from '../components/forms/SpecialtiesSelector';
import { Button } from '../components/ui/Button';

interface CurrentSpecialtiesPageProps {
  values: string[];
  onToggle: (label: string) => void;
  onNext: () => void;
}

export function CurrentSpecialtiesPage({ values, onToggle, onNext }: CurrentSpecialtiesPageProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Quelles sont tes 3 spécialités actuelles ?</h2>
      <p className="text-sm text-slate-600">Sélectionne exactement 3 spécialités pour construire une recommandation fiable.</p>
      <SpecialtiesSelector values={values} onToggle={onToggle} />
      <Button disabled={values.length !== 3} onClick={onNext}>Continuer</Button>
    </div>
  );
}
