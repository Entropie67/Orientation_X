export type Level = 'premiere' | 'terminale';

export type GradeLevel = 1 | 2 | 3 | 4;

export interface StudentProfile {
  level: Level;
  currentSpecialties: string[];
  grades: Record<string, GradeLevel>;
  goalId: string;
}

export interface RecommendationResult {
  primaryTitle: string;
  recommended: string[];
  alternative?: string[];
  rationale: string;
  caution: string;
  nsiFocus?: string;
  complementaryOption?: string;
}
