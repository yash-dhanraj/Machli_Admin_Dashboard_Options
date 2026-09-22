export type OptId = 'option-1' | 'option-2' | 'option-3';

export interface OptionTheme {
  id: OptId;
  label: string;
  name: string;
  tagline: string;
  accent: 'ocean' | 'teal' | 'navy';
  density: 'compact' | 'comfortable' | 'spacious';
}

export const OPTION_THEMES: Record<OptId, OptionTheme> = {
  'option-1': {
    id: 'option-1',
    label: 'Option 01',
    name: 'Operations Focused',
    tagline: 'Operations control desk',
    accent: 'ocean',
    density: 'compact',
  },
  'option-2': {
    id: 'option-2',
    label: 'Option 02',
    name: 'Coastal Intelligence',
    tagline: 'Coastal intelligence command centre',
    accent: 'teal',
    density: 'comfortable',
  },
  'option-3': {
    id: 'option-3',
    label: 'Option 03',
    name: 'Executive + Operations',
    tagline: 'Executive + operations view',
    accent: 'navy',
    density: 'spacious',
  },
};

export function getOptionTheme(option?: string): OptionTheme {
  return OPTION_THEMES[(option as OptId) ?? 'option-1'] ?? OPTION_THEMES['option-1'];
}

export function isOption(option: string | undefined, id: OptId): boolean {
  return (option ?? 'option-1') === id;
}

export function tableDensity(option?: string): 'compact' | 'comfortable' | 'spacious' {
  return getOptionTheme(option).density;
}
