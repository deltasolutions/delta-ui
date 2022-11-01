const baseColors = {
  brandAlpha: '#cc3922',
  brandBeta: '#1b6cbd',

  primary: '#247fd9',
  secondary: '#ffffff',
  info: '#1d75e0',
  warning: '#e19127',
  success: '#18a33f',
  error: '#cc3922',
  background: '#0f111a',
  mundane: 'rgba(190, 202, 255, 0.035)',
  celestial: 'rgb(21 23 36)',
  contrast: '#fafafa',
  exterior: '#09090e',

  accentPrimary: '#1e70c1',
  accentSecondary: '#e5e5e5',
  accentInfo: '#1c6ac9',
  accentWarning: '#cb8224',
  accentSuccess: '#159038',
  accentError: '#b5301b',
  accentBackground: 'rgb(21 23 36)',
  accentMundane: 'rgba(190, 202, 255, 0.05)',
  accentCelestial: '#21273a',
  accentContrast: '#e1e0e0',
  accentExterior: '#171724',

  onPrimary: '#ffffff',
  onSecondary: '#2c2c2c',
  onInfo: '#ffffff',
  onSuccess: '#ffffff',
  onWarning: '#ffffff',
  onError: '#ffffff',
  onBackground: 'rgba(255, 255, 255, 0.7)',
  onMundane: 'rgba(255, 255, 255, 0.7)',
  onCelestial: 'rgba(255, 255, 255, 0.7)',
  onContrast: '#282828',
  onExterior: 'rgba(255, 255, 255, 0.7)',

  accentOnPrimary: '#ffffff',
  accentOnSecondary: '#000000',
  accentOnInfo: '#ffffff',
  accentOnSuccess: '#ffffff',
  accentOnWarning: '#ffffff',
  accentOnError: '#ffffff',
  accentOnBackground: 'rgba(255, 255, 255, 0.9)',
  accentOnMundane: 'rgba(255, 255, 255, 0.9)',
  accentOnCelestial: 'rgba(255, 255, 255, 0.9)',
  accentOnContrast: '#282828',
  accentOnExterior: '#ffffff',
};

export const deltaTheme = {
  colorScheme: 'dark',
  fontFamily: 'Stolzl, sans-serif',
  colors: {
    ...baseColors,
    context: baseColors.background,
    accentContext: baseColors.accentBackground,
    onContext: baseColors.onBackground,
    accentOnContext: baseColors.accentOnBackground,
  },
  letterSpacings: [0, 1, 1.5],
  sizes: [0, 20, 32, 40, 64, 80],
  ticks: [0, 100, 200, 300, 500, 1000, 1200, 1800],
  space: [0, 4, 8, 16, 24, 32, 42, 64, 128, 256, 512],
  fontSizes: [10, 12, 14, 16, 20, 24, 36, 48, 56],
  radii: [0, 1, 2, 4, 5, 8],
  shadows: [
    'none',
    '0px 5px 15px 0px rgba(0,0,0,0.3)',
    '0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)',
  ],
};

const baseLightColors = {
  brandAlpha: '#cc3922',
  brandBeta: '#1b6cbd',

  primary: '#a285e1',
  secondary: 'rgba(0,0,0, 0.86)',
  info: '#1d75e0',
  warning: '#e19127',
  success: '#18a33f',
  error: '#cc3922',
  background: '#f8f5f5',
  mundane: 'rgba(65,53,0, 0.35)',
  celestial: '#dae4dc',
  contrast: '#e8f0eb',
  exterior: '#ffffff',

  accentPrimary: '#8667c8',
  accentSecondary: 'black',
  accentInfo: '#1c6ac9',
  accentWarning: '#cb8224',
  accentSuccess: '#159038',
  accentError: '#b5301b',
  accentBackground: 'rgb(234 232 219)',
  accentMundane: 'rgba(65,53,0, 0.5)',
  accentCelestial: '#bad2bd',
  accentContrast: '#e1e0e0',
  accentExterior: '#171724',

  onPrimary: 'rgba(0, 0, 0, 0.9)',
  onSecondary: 'rgba(255,255,255, 0.95)',
  onInfo: '#ffffff',
  onSuccess: '#ffffff',
  onWarning: '#ffffff',
  onError: '#ffffff',
  onBackground: 'rgba(0, 0, 0, 0.8)',
  onMundane: '#482727',
  onCelestial: 'rgba(13, 7, 7, 0.7)',
  onContrast: '#282828',
  onExterior: 'rgba(12, 11, 11, 0.7)',

  accentOnPrimary: '#ffffff',
  accentOnSecondary: '#000000',
  accentOnInfo: '#ffffff',
  accentOnSuccess: '#ffffff',
  accentOnWarning: '#ffffff',
  accentOnError: '#ffffff',
  accentOnBackground: 'rgba(0, 0, 0, 0.9)',
  accentOnMundane: 'rgba(0, 0, 0, 0.9)',
  accentOnCelestial: 'rgba(255, 255, 255, 0.9)',
  accentOnContrast: '#282828',
  accentOnExterior: 'black',
};

export const deltaLightTheme = {
  colorScheme: 'light',
  fontFamily: 'Stolzl, sans-serif',
  colors: {
    ...baseLightColors,
    context: baseLightColors.background,
    accentContext: baseLightColors.accentBackground,
    onContext: baseLightColors.onBackground,
    accentOnContext: baseLightColors.accentOnBackground,
  },
  letterSpacings: [0, 1, 1.5],
  sizes: [0, 20, 32, 40, 64, 80],
  ticks: [0, 100, 200, 300, 500, 1000, 1200, 1800],
  space: [0, 4, 8, 16, 24, 32, 42, 64, 128, 256, 512],
  fontSizes: [10, 12, 14, 16, 20, 24, 36, 48, 56],
  radii: [0, 1, 2, 4, 5, 8],
  shadows: [
    'none',
    '0px 5px 15px 0px rgba(0,0,0,0.3)',
    '0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)',
  ],
};

export type DeltaTheme = typeof deltaTheme;
