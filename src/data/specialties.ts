export interface SpecialtyItem {
  id: string;
  label: string;
  selectable: boolean;
  note?: string;
}

export const specialties: SpecialtyItem[] = [
  { id: 'maths', label: 'Maths', selectable: true },
  { id: 'nsi', label: 'NSI', selectable: true },
  { id: 'pc', label: 'Physique-Chimie', selectable: true },
  { id: 'svt', label: 'SVT', selectable: true },
  { id: 'ses', label: 'SES', selectable: true },
  { id: 'hggsp', label: 'HGGSP', selectable: true },
  { id: 'hlp', label: 'HLP', selectable: true },
  { id: 'cav', label: 'CAV', selectable: true },
  { id: 'si', label: 'SI', selectable: true, note: 'Spécialité en voie de disparition selon les établissements.' },
  { id: 'llce', label: 'LLCE', selectable: false, note: 'Non proposé dans les recommandations Horizon Orientation.' },
];

export const selectableSpecialties = specialties.filter((specialty) => specialty.selectable);
