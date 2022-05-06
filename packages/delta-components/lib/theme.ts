export const theme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  radii: [0, 2, 4, 8],
  fontSizes: [10, 12, 14, 16, 18, 22, 40, 48, 56],
  fonts: {
    body: 'Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontWeights: {
    body: 400,
    heading: 400
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  colors: {
    neutral: '#EEEEEE',
    success: '#53B956',
    warning: '#ECA843',
    danger: '#EF6D64',
    unknown: '#B3B3B3',
    surface: '#FFFFFF',
    background: '#EFEFEF',
    exterior: '#2C2F31',
    border: 'rgba(0, 0, 0, 0.17)',
    neutralAccent: '#E0E0E0',
    successAccent: '#40AA44',
    warningAccent: '#D69431',
    dangeAccent: '#DF5248',
    unknownAccent: '#A3A3A3',
    surfaceAccent: '#F3F3F3',
    backgroundbacAccent: '#E0E0E0',
    exterioreAccent: '#1C1D1F',
    bordeAccent: 'rgba(0, 0, 0, 0.45)',
    onPrimary: '#FFFFFF',
    onNeutral: '#525252',
    onSuccess: '#FFFFFF',
    onWarning: '#FFFFFF',
    onDanger: '#FFFFFF',
    onUnknown: '#FFFFFF',
    onSurface: '#525252',
    onBackground: '#121212',
    onExterior: '#FAFAFA',
    onBorder: '#525252'
    // onPrimaryAccent: '#FFFFFF',
    // onNeutralAccent: '#525252',
    // onSuccessAccent: '#FFFFFF',
    // onWarningAccent: '#FFFFFF',
    // onDangerAccent: '#FFFFFF',
    // onUnknownAccent: '#FFFFFF',
    // onSurfaceAccent: '#525252',
    // onBackgroundAccent: '#121212',
    // onExteriorAccent: '#FAFAFA',
    // onBorderAccent: '#525252'
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 1px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 1px -2px rgba(0, 0, 0, 0.12), ' +
      '0px 2px 2px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 3px -2px rgba(0, 0, 0, 0.12), ' +
      '0px 3px 4px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
    '0px 2px 4px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 4px 5px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 5px -1px rgba(0, 0, 0, 0.12), ' +
      '0px 6px 10px 0px rgba(0, 0, 0, 0.12), ' +
      '0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    '0px 5px 5px -3px rgba(0, 0, 0, 0.12), ' +
      '0px 8px 10px 1px rgba(0, 0, 0, 0.12), ' +
      '0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
    '0px 6px 6px -3px rgba(0, 0, 0, 0.12), ' +
      '0px 10px 14px 1px rgba(0, 0, 0, 0.12), ' +
      '0px 4px 18px 3px rgba(0, 0, 0, 0.12)'
  ],
  medias: {
    narrow: '@media (max-width: 1024px)',
    wide: '@media (min-width: 1024.2px)'
  }
};

export type Theme = typeof theme;
