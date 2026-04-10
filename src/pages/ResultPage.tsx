import { ResultCard } from '../components/result/ResultCard';
import { Button } from '../components/ui/Button';
import { RecommendationResult } from '../rules/recommendationTypes';

interface ResultPageProps {
  result: RecommendationResult;
  onRestart: () => void;
}

export function ResultPage({ result, onRestart }: ResultPageProps) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">Résultat personnalisé</h2>
      <ResultCard result={result} />
      <Button variant="secondary" onClick={onRestart}>Recommencer</Button>
    </div>
  );
}
