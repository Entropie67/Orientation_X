import { GradeMatrix } from '../components/forms/GradeMatrix';
import { Button } from '../components/ui/Button';
import { GradeLevel, Level } from '../rules/recommendationTypes';

interface GradesPageProps {
  level: Level;
  currentSpecialties: string[];
  grades: Record<string, GradeLevel>;
  onGradeChange: (subject: string, value: GradeLevel) => void;
  onNext: () => void;
}

const firstYearSubjects = ['Maths', 'Français', 'Histoire-Géo', 'Physique-Chimie', 'SVT', 'Anglais', 'Logique / appétence numérique'];

function getSubjects(level: Level, currentSpecialties: string[]): string[] {
  if (level === 'premiere') return firstYearSubjects;
  return [...currentSpecialties, 'Maths (optionnel)', 'Français (optionnel)'];
}

export function GradesPage({ level, currentSpecialties, grades, onGradeChange, onNext }: GradesPageProps) {
  const subjects = getSubjects(level, currentSpecialties);
  const minRequired = level === 'premiere' ? 5 : 3;
  const isValid = subjects.filter((subject) => grades[subject]).length >= minRequired;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Étape notes — rapide et intuitive</h2>
      <p className="text-sm text-slate-600">Indique ton niveau ressenti : l’objectif est d’obtenir une tendance, pas un bulletin parfait.</p>
      <GradeMatrix subjects={subjects} grades={grades} onChange={onGradeChange} />
      <Button disabled={!isValid} onClick={onNext}>Continuer</Button>
    </div>
  );
}
