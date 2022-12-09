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
  celestial: 'rgb(21, 23, 36)',
  contrast: '#fafafa',
  exterior: '#09090e',
  shadow: '#00000000',
  border: 'rgb(255 255 255 / 25%)',

  accentPrimary: '#1e70c1',
  accentSecondary: '#e5e5e5',
  accentInfo: '#1c6ac9',
  accentWarning: '#cb8224',
  accentSuccess: '#159038',
  accentError: '#b5301b',
  accentBackground: 'rgb(24, 26, 42)',
  accentMundane: 'rgba(190, 202, 255, 0.05)',
  accentCelestial: '#21273a',
  accentContrast: '#e1e0e0',
  accentExterior: '#171724',
  accentBorder: 'rgb(255 255 255 / 50%)',

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
  mode: 'dark',
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
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 600,
  },
  radii: [0, 1, 2, 4, 5, 8],
  shadows: {},
};

const baseLightColors = {
  brandAlpha: '#cc3922',
  brandBeta: '#1b6cbd',

  primary: '#2585e5',
  secondary: '#4b6783',
  info: '#21b3cd',
  warning: '#e19127',
  success: '#18a33f',
  error: '#cc3922',
  background: '#e9f1f6',
  mundane: '#ffffff',
  celestial: '#ffffff',
  contrast: '#ffffff',
  exterior: '#ffffff',
  shadow: '#52759521',
  border: '#273f555b',

  accentPrimary: '#2673c1',
  accentSecondary: '#39546e',
  accentInfo: '#1ca6be',
  accentWarning: '#cb8224',
  accentSuccess: '#159038',
  accentError: '#b5301b',
  accentBackground: '#ffffff',
  accentMundane: '#e9f2f8',
  accentCelestial: '#e9f2f8',
  accentContrast: '#e9f2f8',
  accentExterior: '#e9f2f8',
  accentBorder: '#09131e7c',

  onPrimary: '#ffffff',
  onSecondary: '#ffffff',
  onInfo: '#ffffff',
  onSuccess: '#ffffff',
  onWarning: '#ffffff',
  onError: '#ffffff',
  onBackground: '#597180',
  onMundane: '#354651d4',
  onCelestial: '#354651d4',
  onContrast: '#354651d4',
  onExterior: '#354651d4',

  accentOnPrimary: '#ffffff',
  accentOnSecondary: '#ffffff',
  accentOnInfo: '#ffffff',
  accentOnSuccess: '#ffffff',
  accentOnWarning: '#ffffff',
  accentOnError: '#ffffff',
  accentOnBackground: '#415863',
  accentOnMundane: '#495d67',
  accentOnCelestial: '#495d67',
  accentOnContrast: '#495d67',
  accentOnExterior: '#495d67',
};

export const deltaLightTheme = {
  mode: 'light',
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
  fontWeights: {
    light: 400,
    normal: 400,
    bold: 600,
  },
  radii: [0, 1, 2, 4, 5, 8],
  shadows: {
    soft: '0px 5px 15px 0px #52759517',
    hard: '0px 2px 7px 0px #162a3c2f',
  },
};

export type DeltaTheme = typeof deltaTheme;
