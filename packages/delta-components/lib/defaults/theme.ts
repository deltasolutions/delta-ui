export const theme = {
  colorScheme: 'dark',
  fontFamily: 'Montserrat, sans-serif',
  colors: {
    primary: '#1db954',
    secondary: '#ffffff',
    info: '#0d72ea',
    warning: '#ffa42b',
    success: '#1cb454',
    error: '#e41717',
    background: '#121212',
    surface: '#222222',
    exterior: '#333333',
    contrast: '#fafafa',
    outline: '#313030',

    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onInfo: '#ffffff',
    onSuccess: '#ffffff',
    onWarning: '#ffffff',
    onError: '#ffffff',
    onBackground: '#b3b3b3',
    onSurface: '#b3b3b3',
    onExterior: 'grey',
    onContrast: '#282828',
    onOutline: '#ffffff',

    accentPrimary: '#1aa44a',
    accentSecondary: '#e5e5e5',
    accentInfo: '#0b63cf',
    accentWarning: '#e39022',
    accentSuccess: '#149b45',
    accentError: '#cb1212',
    accentBackground: '#000000',
    accentSurface: 'rgb(17, 17, 17)',
    accentExterior: '#282828',
    accentContrast: '#e1e0e0',
    accentOutline: '#282727',
  },
  letterSpacings: [0, 1, 1.5],
  sizes: [0, 20, 32, 40, 80],
  ticks: [0, 100, 200, 300, 500, 1000, 1200, 1800],
  space: [0, 4, 8, 16, 24, 32, 42, 64, 128, 256, 512],
  fontSizes: [10, 12, 14, 16, 20, 26, 42, 48, 56],
  radii: [0, 1, 2, 4, 5, 8],
  shadows: [
    'none',
    '0px 5px 15px 0px rgba(0,0,0,0.3)',
    '0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)',
  ],
};

export type Theme = typeof theme;
