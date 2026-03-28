export const colors = {
  // Primary
  primary: '#4a40e0',
  primaryDim: '#3d30d4',
  primaryContainer: '#9795ff',
  primaryFixedDim: '#8885ff',
  onPrimary: '#f4f1ff',
  onPrimaryContainer: '#14007e',
  inversePrimary: '#8582ff',

  // Secondary
  secondary: '#6249b2',
  secondaryDim: '#563ca5',
  secondaryContainer: '#d8caff',
  onSecondary: '#f7f0ff',
  onSecondaryContainer: '#4e339c',

  // Tertiary
  tertiary: '#983772',
  tertiaryDim: '#892a65',
  tertiaryContainer: '#fd8bca',
  onTertiary: '#ffeff4',
  onTertiaryContainer: '#610244',

  // Surface hierarchy (tonal layering)
  surface: '#f5f6f7',
  surfaceBright: '#f5f6f7',
  surfaceDim: '#d1d5d7',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#eff1f2',
  surfaceContainer: '#e6e8ea',
  surfaceContainerHigh: '#e0e3e4',
  surfaceContainerHighest: '#dadddf',
  surfaceVariant: '#dadddf',

  // On Surface
  background: '#f5f6f7',
  onBackground: '#2c2f30',
  onSurface: '#2c2f30',
  onSurfaceVariant: '#595c5d',
  inverseOnSurface: '#9b9d9e',
  inverseSurface: '#0c0f10',

  // Outline
  outline: '#757778',
  outlineVariant: '#abadae',

  // Error
  error: '#b41340',
  errorDim: '#a70138',
  errorContainer: '#f74b6d',
  onError: '#ffefef',
  onErrorContainer: '#510017',

  // Utility
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Participant color tokens (100% for text, 20% for backgrounds)
  participant: {
    blue: { base: '#3B82F6', bg: 'rgba(59, 130, 246, 0.2)' },
    green: { base: '#22C55E', bg: 'rgba(34, 197, 94, 0.2)' },
    pink: { base: '#EC4899', bg: 'rgba(236, 72, 153, 0.2)' },
    indigo: { base: '#6366F1', bg: 'rgba(99, 102, 241, 0.2)' },
    orange: { base: '#F97316', bg: 'rgba(249, 115, 22, 0.2)' },
    teal: { base: '#14B8A6', bg: 'rgba(20, 184, 166, 0.2)' },
    purple: { base: '#A855F7', bg: 'rgba(168, 85, 247, 0.2)' },
    amber: { base: '#F59E0B', bg: 'rgba(245, 158, 11, 0.2)' },
  },

  // Status
  statusInProgress: { bg: '#f7f0ff', text: '#563ca5' },
  statusCompleted: { bg: '#dcfce7', text: '#15803d' },
  statusUnclaimed: { bg: 'rgba(180, 19, 64, 0.1)', text: '#b41340' },
} as const;
