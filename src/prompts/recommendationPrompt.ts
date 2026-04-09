export function buildRecommendationPrompt(profileJson: string): string {
  return `Tu es conseiller d'orientation. Analyse ce profil élève et propose une justification claire et pédagogique:\n${profileJson}`;
}
