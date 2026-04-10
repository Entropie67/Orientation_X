/**
 * Prévu pour la future couche serveur.
 *
 * Idée d’intégration:
 * - Le backend lit ce préprompt par défaut
 * - Le backend peut injecter une directive complémentaire (admin/établissement)
 * - Puis il envoie le prompt final à OpenRouter
 */

export interface ServerPrepromptConfig {
  complementaryDirective?: string;
}

export const DEFAULT_SERVER_PREPROMPT_CONFIG: ServerPrepromptConfig = {
  complementaryDirective: '',
};

export function resolveServerComplementaryDirective(config?: ServerPrepromptConfig): string {
  return config?.complementaryDirective?.trim() ?? '';
}
