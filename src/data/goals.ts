export interface GoalBlock {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export const goals: GoalBlock[] = [
  { id: 'sci', title: 'Sciences, ingénierie, prépa, informatique', icon: '🧪', description: 'Analyser, résoudre, modéliser, coder, construire.' },
  { id: 'health', title: 'Santé, médecine, sciences du vivant', icon: '🩺', description: 'Comprendre le vivant, soigner, observer, expérimenter.' },
  { id: 'hum', title: 'Sciences humaines, droit, économie, géopolitique', icon: '🌍', description: 'Comprendre la société, argumenter, analyser les enjeux.' },
  { id: 'lit', title: 'Littérature, culture, philosophie, communication', icon: '📚', description: 'Écrire, interpréter, argumenter, transmettre.' },
  { id: 'art', title: 'Arts, cinéma, audiovisuel, création', icon: '🎬', description: 'Créer, raconter, produire des contenus visuels.' },
  { id: 'unknown', title: 'Je ne sais pas encore', icon: '🧭', description: 'Tu peux rester ouvert tout en gardant un socle solide.' },
];
