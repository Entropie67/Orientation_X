import { StudentProfile } from '../../rules/recommendationTypes';
import { buildRecommendationPrompt } from '../../prompts/recommendationPrompt';
import { resolveServerComplementaryDirective, ServerPrepromptConfig } from './serverPreprompt';

export interface OpenRouterPayload {
  profile: StudentProfile;
  serverPreprompt?: ServerPrepromptConfig;
}

export interface OpenRouterResponse {
  explanation: string;
  promptPreview: string;
}

/**
 * Stub v1 : prépare l’intégration future OpenRouter sans appel réseau.
 */
export async function requestOpenRouterRecommendation(payload: OpenRouterPayload): Promise<OpenRouterResponse> {
  const complementaryDirective = resolveServerComplementaryDirective(payload.serverPreprompt);

  const finalPrompt = buildRecommendationPrompt({
    profile: payload.profile,
    complementaryDirective,
  });

  return {
    explanation:
      'Intégration LLM désactivée en v1 locale. Cette réponse sera remplacée par une justification générée ultérieurement.',
    promptPreview: finalPrompt,
  };
}
