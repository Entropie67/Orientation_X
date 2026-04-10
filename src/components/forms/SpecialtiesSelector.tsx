import { selectableSpecialties, specialties } from '../../data/specialties';
import { SelectableCard } from '../ui/SelectableCard';

interface SpecialtiesSelectorProps {
  values: string[];
  onToggle: (label: string) => void;
}

export function SpecialtiesSelector({ values, onToggle }: SpecialtiesSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {selectableSpecialties.map((specialty) => (
          <SelectableCard
            key={specialty.id}
            selected={values.includes(specialty.label)}
            disabled={!values.includes(specialty.label) && values.length >= 3}
            onClick={() => onToggle(specialty.label)}
          >
            <p className="font-semibold">{specialty.label}</p>
            {specialty.note && <p className="mt-1 text-xs text-slate-500">{specialty.note}</p>}
          </SelectableCard>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <p className="font-semibold text-slate-700">Spécialité non recommandée en v1</p>
        <p>{specialties.find((s) => s.id === 'llce')?.label} : non proposée dans les recommandations Horizon Orientation.</p>
      </div>
    </div>
  );
}
