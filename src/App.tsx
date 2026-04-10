import { useMemo, useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { buildRecommendation } from './rules/recommendationEngine';
import { GradeLevel, Level } from './rules/recommendationTypes';
import { WelcomePage } from './pages/WelcomePage';
import { LevelPage } from './pages/LevelPage';
import { CurrentSpecialtiesPage } from './pages/CurrentSpecialtiesPage';
import { GradesPage } from './pages/GradesPage';
import { GoalsPage } from './pages/GoalsPage';
import { ResultPage } from './pages/ResultPage';

type Step = 'welcome' | 'level' | 'currentSpecialties' | 'grades' | 'goals' | 'result';

function getStepNumber(step: Step, level: Level | null): number {
  const sequence = level === 'terminale'
    ? ['welcome', 'level', 'currentSpecialties', 'grades', 'goals', 'result']
    : ['welcome', 'level', 'grades', 'goals', 'result'];
  return sequence.indexOf(step) + 1;
}

function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [level, setLevel] = useState<Level | null>(null);
  const [currentSpecialties, setCurrentSpecialties] = useState<string[]>([]);
  const [grades, setGrades] = useState<Record<string, GradeLevel>>({});
  const [goalId, setGoalId] = useState<string | null>(null);

  const result = useMemo(() => {
    if (!level || !goalId) return null;
    return buildRecommendation({ level, currentSpecialties, grades, goalId });
  }, [level, currentSpecialties, grades, goalId]);

  const totalSteps = level === 'terminale' ? 6 : 5;
  const stepNumber = getStepNumber(step, level);

  const subtitle =
    'Une interface claire, structurée et rassurante pour guider les choix de spécialités au lycée.';

  const toggleSpecialty = (label: string) => {
    setCurrentSpecialties((prev) => {
      if (prev.includes(label)) return prev.filter((item) => item !== label);
      if (prev.length >= 3) return prev;
      return [...prev, label];
    });
  };

  const onRestart = () => {
    setStep('welcome');
    setLevel(null);
    setCurrentSpecialties([]);
    setGrades({});
    setGoalId(null);
  };

  return (
    <div className="min-h-screen bg-app">
      <AppShell step={stepNumber} totalSteps={totalSteps} title="Horizon Orientation" subtitle={subtitle}>
        {step === 'welcome' && <WelcomePage onStart={() => setStep('level')} />}

        {step === 'level' && (
          <LevelPage
            level={level}
            onChange={setLevel}
            onNext={() => setStep(level === 'terminale' ? 'currentSpecialties' : 'grades')}
          />
        )}

        {step === 'currentSpecialties' && level === 'terminale' && (
          <CurrentSpecialtiesPage values={currentSpecialties} onToggle={toggleSpecialty} onNext={() => setStep('grades')} />
        )}

        {step === 'grades' && level && (
          <GradesPage
            level={level}
            currentSpecialties={currentSpecialties}
            grades={grades}
            onGradeChange={(subject, value) => setGrades((prev) => ({ ...prev, [subject]: value }))}
            onNext={() => setStep('goals')}
          />
        )}

        {step === 'goals' && (
          <GoalsPage goalId={goalId} onSelect={setGoalId} onNext={() => setStep('result')} />
        )}

        {step === 'result' && result && <ResultPage result={result} onRestart={onRestart} />}
      </AppShell>
    </div>
  );
}

export default App;
