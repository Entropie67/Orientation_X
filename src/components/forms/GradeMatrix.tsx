import { GradeLevel } from '../../rules/recommendationTypes';
import { SelectableCard } from '../ui/SelectableCard';

const levels: Array<{ label: string; value: GradeLevel }> = [
  { label: 'Faible', value: 1 },
  { label: 'Moyen', value: 2 },
  { label: 'Bon', value: 3 },
  { label: 'Très bon', value: 4 },
];

interface GradeMatrixProps {
  subjects: string[];
  grades: Record<string, GradeLevel>;
  onChange: (subject: string, value: GradeLevel) => void;
}

export function GradeMatrix({ subjects, grades, onChange }: GradeMatrixProps) {
  return (
    <div className="space-y-4">
      {subjects.map((subject) => (
        <div key={subject} className="rounded-2xl border border-slate-200 p-4">
          <p className="mb-3 font-semibold text-slate-800">{subject}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {levels.map((level) => (
              <SelectableCard
                key={`${subject}-${level.value}`}
                selected={grades[subject] === level.value}
                onClick={() => onChange(subject, level.value)}
              >
                <p className="text-center text-sm font-medium">{level.label}</p>
              </SelectableCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
