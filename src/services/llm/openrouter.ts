export interface OpenRouterPayload {
  profile: unknown;
  prompt: string;
}

export interface OpenRouterResponse {
  explanation: string;
}

/**
 * Stub v1 : prépare l’intégration future OpenRouter sans appel réseau.
 */
export async function requestOpenRouterRecommendation(_: OpenRouterPayload): Promise<OpenRouterResponse> {
  return {
    explanation:
      'Intégration LLM désactivée en v1 locale. Cette réponse sera remplacée par une justification générée ultérieurement.',
  };
}
