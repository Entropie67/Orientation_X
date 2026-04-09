import { StudentProfile, RecommendationResult } from './recommendationTypes';

const has = (arr: string[], value: string): boolean => arr.includes(value);

export function buildRecommendation(profile: StudentProfile): RecommendationResult {
  const g = (k: string): number => profile.grades[k] ?? 2;
  const strongMath = g('Maths') >= 3 || g('Maths (optionnel)') >= 3;
  const strongLogic = g('Logique / appétence numérique') >= 3 || g('NSI') >= 3;
  const nsiBoost = strongMath || strongLogic;

  if (profile.level === 'premiere') {
    if (profile.goalId === 'sci') {
      return {
        primaryTitle: 'Tes 3 spécialités conseillées',
        recommended: ['Maths', 'Physique-Chimie', 'NSI'],
        alternative: ['Maths', 'SVT', 'NSI'],
        rationale: 'Tu construis un profil scientifique complet avec une forte valeur numérique transversale.',
        caution: 'Charge exigeante : garde une méthode de travail régulière.',
        nsiFocus: 'NSI apporte des compétences recherchées dans de nombreuses formations, pas seulement en informatique.',
      };
    }

    if (profile.goalId === 'health') {
      return {
        primaryTitle: 'Tes 3 spécialités conseillées',
        recommended: ['Maths', 'Physique-Chimie', nsiBoost ? 'NSI' : 'SVT'],
        alternative: ['Maths', 'Physique-Chimie', 'SVT'],
        rationale: 'Pour santé et médecine, le socle scientifique est prioritaire ; NSI peut renforcer data, logique et méthode.',
        caution: 'Vérifie les attendus précis des filières visées en post-bac.',
        nsiFocus: nsiBoost ? 'Ton profil montre qu’une spécialité NSI peut créer un avantage différenciant.' : undefined,
      };
    }

    if (profile.goalId === 'hum') {
      return {
        primaryTitle: 'Tes 3 spécialités conseillées',
        recommended: ['SES', 'HGGSP', nsiBoost ? 'NSI' : 'Maths'],
        alternative: ['SES', 'HGGSP', 'HLP'],
        rationale: 'Profil sciences humaines solide, renforcé par une approche analytique/numérique utile en supérieur.',
        caution: 'Assure un bon équilibre entre expression écrite, analyse et méthode quantitative.',
        nsiFocus: nsiBoost ? 'NSI est ici une spécialité pivot pour différencier un profil sciences humaines.' : undefined,
      };
    }

    if (profile.goalId === 'lit') {
      return {
        primaryTitle: 'Tes 3 spécialités conseillées',
        recommended: ['HLP', 'HGGSP', nsiBoost ? 'NSI' : 'SES'],
        alternative: ['HLP', 'SES', 'HGGSP'],
        rationale: 'Tu conserves un socle de culture, d’argumentation et d’ouverture stratégique.',
        caution: 'Travaille la cohérence avec les formations ciblées (communication, droit, lettres, etc.).',
        nsiFocus: nsiBoost ? 'NSI peut compléter utilement un profil littéraire moderne (culture numérique, projets, méthode).' : undefined,
      };
    }

    if (profile.goalId === 'art') {
      return {
        primaryTitle: 'Tes 3 spécialités conseillées',
        recommended: ['CAV', 'NSI', strongMath ? 'Maths' : 'HGGSP'],
        alternative: ['CAV', 'HLP', 'NSI'],
        rationale: 'Le mix création + numérique est très crédible pour les métiers audiovisuels et créatifs contemporains.',
        caution: 'Conserve une spécialité d’appui pour sécuriser les poursuites d’études.',
        nsiFocus: 'NSI valorise fortement un profil créatif (outils, narration interactive, production numérique).',
      };
    }

    return {
      primaryTitle: 'Tes 3 spécialités conseillées',
      recommended: nsiBoost ? ['Maths', 'HGGSP', 'NSI'] : ['Maths', 'Physique-Chimie', 'SVT'],
      alternative: ['SES', 'HGGSP', 'NSI'],
      rationale: 'Sans projet figé, on privilégie un socle polyvalent et robuste.',
      caution: 'Clarifie progressivement ton projet pour ajuster tes choix.',
      nsiFocus: nsiBoost ? 'NSI est pertinente dans un profil encore ouvert grâce à sa portée transversale.' : undefined,
    };
  }

  const cur = profile.currentSpecialties;
  const hasNsi = has(cur, 'NSI');
  const hasMaths = has(cur, 'Maths');
  const hasPc = has(cur, 'Physique-Chimie');
  const hasSvt = has(cur, 'SVT');
  const hasCav = has(cur, 'CAV');

  if (hasNsi && hasMaths) {
    return {
      primaryTitle: 'Les 2 spécialités à garder',
      recommended: ['Maths', 'NSI'],
      rationale: 'Duo stratégique et très lisible pour de nombreuses formations sélectives et universitaires.',
      caution: 'Maintiens un bon niveau de régularité, surtout en résolution de problèmes.',
      complementaryOption: 'Option complémentaire à envisager : approfondissement scientifique ou projet numérique.',
      nsiFocus: 'NSI reste une spécialité transversale clé dans ce duo.',
    };
  }

  if (hasNsi && (has(cur, 'HGGSP') || has(cur, 'SES'))) {
    const second = has(cur, 'HGGSP') ? 'HGGSP' : 'SES';
    return {
      primaryTitle: 'Les 2 spécialités à garder',
      recommended: [second, 'NSI'],
      rationale: 'Ce duo combine lecture des enjeux de société et compétences numériques différenciantes.',
      caution: 'Soigne l’argumentation écrite et la structuration des projets.',
      complementaryOption: 'Option complémentaire : renforcer les méthodes quantitatives selon les études visées.',
      nsiFocus: 'NSI donne un avantage concret à un profil sciences humaines moderne.',
    };
  }

  if (hasNsi && hasCav) {
    return {
      primaryTitle: 'Les 2 spécialités à garder',
      recommended: ['CAV', 'NSI'],
      rationale: 'Duo créatif et technologique pertinent pour les parcours audiovisuels et design numérique.',
      caution: 'Prépare un portfolio/projets pour matérialiser tes compétences.',
      complementaryOption: 'Option complémentaire : culture générale ou économie de la création.',
      nsiFocus: 'NSI renforce la production créative (workflow, technique, projets).',
    };
  }

  if (hasMaths && hasPc) {
    return {
      primaryTitle: 'Les 2 spécialités à garder',
      recommended: ['Maths', 'Physique-Chimie'],
      rationale: 'Duo scientifique classique, solide et reconnu.',
      caution: hasSvt ? 'Si projet santé, compare avec un maintien de SVT selon la formation visée.' : 'Vérifie la cohérence avec ton projet post-bac.',
      complementaryOption: hasNsi ? 'NSI peut rester un axe de projets personnels complémentaires.' : undefined,
    };
  }

  return {
    primaryTitle: 'Les 2 spécialités à garder',
    recommended: cur.slice(0, 2),
    rationale: 'On conserve un duo cohérent avec ton profil actuel et ton projet déclaré.',
    caution: 'Affiner ton projet permettra une recommandation encore plus ciblée.',
    complementaryOption: 'Option complémentaire : accompagnement orientation pour arbitrer finement.',
    nsiFocus: hasNsi ? 'NSI est bien prise en compte comme spécialité transversale.' : undefined,
  };
}
