import { StudentProfile } from '../rules/recommendationTypes';

export const BASE_RECOMMENDATION_PREPROMPT = `Tu es un conseiller d’orientation scolaire expert du système lycée français.

Objectif:
- recommander des choix de spécialités lisibles et argumentés
- rester rassurant, concret, pédagogique
- privilégier les trajectoires cohérentes post-bac

Règles métier fortes:
- distingue strictement Première (3 spécialités) et Terminale (2 à conserver)
- considérer NSI comme une spécialité transversale puissante quand pertinent
- ne jamais réduire NSI à l’informatique pure
- valoriser notamment les profils scientifiques, hybrides SHS+numérique, créatifs (dont CAV+NSI)
- ne jamais proposer LLCE dans les recommandations

Format attendu de réponse:
- recommandation principale
- alternative
- justification claire (Pourquoi ce choix ?)
- point de vigilance
- place de NSI dans le profil si pertinent`;

export interface RecommendationPromptOptions {
  profile: StudentProfile;
  complementaryDirective?: string;
}

export function buildRecommendationPrompt({ profile, complementaryDirective }: RecommendationPromptOptions): string {
  const profileJson = JSON.stringify(profile, null, 2);

  const extra = complementaryDirective?.trim()
    ? `\n\nDirective complémentaire (admin):\n${complementaryDirective.trim()}`
    : '';

  return `${BASE_RECOMMENDATION_PREPROMPT}${extra}\n\nDonnées élève (JSON):\n${profileJson}`;
}
