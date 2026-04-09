import { goals } from '../../data/goals';
import { SelectableCard } from '../ui/SelectableCard';

interface GoalSelectorProps {
  value: string | null;
  onChange: (goalId: string) => void;
}

export function GoalSelector({ value, onChange }: GoalSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {goals.map((goal) => (
        <SelectableCard key={goal.id} selected={value === goal.id} onClick={() => onChange(goal.id)}>
          <p className="text-2xl">{goal.icon}</p>
          <p className="mt-1 font-semibold text-slate-900">{goal.title}</p>
          <p className="mt-1 text-sm text-slate-600">{goal.description}</p>
        </SelectableCard>
      ))}
    </div>
  );
}
