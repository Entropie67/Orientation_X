import { RecommendationResult } from '../../rules/recommendationTypes';

interface ResultCardProps {
  result: RecommendationResult;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{result.primaryTitle}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {result.recommended.map((item) => (
            <span key={item} className="rounded-xl bg-white px-3 py-1 text-sm font-semibold text-slate-800 shadow-sm">
              {item}
            </span>
          ))}
        </div>
      </div>

      {result.alternative && (
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="font-semibold">Alternative possible</p>
          <p className="mt-1 text-slate-700">{result.alternative.join(' + ')}</p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="font-semibold">Pourquoi ce choix ?</p>
          <p className="mt-1 text-sm text-slate-700">{result.rationale}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="font-semibold">Point de vigilance</p>
          <p className="mt-1 text-sm text-slate-700">{result.caution}</p>
        </div>
      </div>

      {result.nsiFocus && (
        <div className="rounded-2xl border border-brand-100 bg-white p-4">
          <p className="font-semibold text-brand-900">Place de NSI dans ton profil</p>
          <p className="mt-1 text-sm text-slate-700">{result.nsiFocus}</p>
        </div>
      )}

      {result.complementaryOption && (
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="font-semibold">Option complémentaire à envisager</p>
          <p className="mt-1 text-sm text-slate-700">{result.complementaryOption}</p>
        </div>
      )}
    </div>
  );
}
