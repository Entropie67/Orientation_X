import { SelectableCard } from '../ui/SelectableCard';

interface LevelSelectorProps {
  value: 'premiere' | 'terminale' | null;
  onChange: (value: 'premiere' | 'terminale') => void;
}

export function LevelSelector({ value, onChange }: LevelSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SelectableCard selected={value === 'premiere'} onClick={() => onChange('premiere')}>
        <p className="text-lg font-semibold">Je passe en Première</p>
        <p className="mt-1 text-sm text-slate-600">Recommandation d’un trio de spécialités.</p>
      </SelectableCard>
      <SelectableCard selected={value === 'terminale'} onClick={() => onChange('terminale')}>
        <p className="text-lg font-semibold">Je passe en Terminale</p>
        <p className="mt-1 text-sm text-slate-600">Recommandation d’un duo à conserver parmi mes 3 spécialités.</p>
      </SelectableCard>
    </div>
  );
}
