import { mergeBasicThemes } from 'restyler';
import { theme } from './theme';

export const darkTheme = mergeBasicThemes({}, theme, {
  fontWeights: {
    body: 400,
    heading: 300
  },
  colors: {
    primary: '#5897cf',
    // primary: '#5DA2DE',
    secondary: '#3c4146',
    success: '#53B956',
    warning: '#ECA843',
    danger: '#EF6D64',
    unknown: '#B3B3B3',
    surface: '#202224',
    background: '#181a1b',
    exterior: '#202224',
    border: 'rgba(255, 255, 255, 0.15)',
    accentPrimary: '#4A8DC7',
    accentSecondary: '#303438',
    accentSuccess: '#40AA44',
    accentWarning: '#D69431',
    accentDanger: '#DF5248',
    accentUnknown: '#A3A3A3',
    accentSurface: '#2b2e31',
    accentBackground: '#1c1f20',
    accentExterior: '#2b2e31',
    accentBorder: 'rgba(255, 255, 255, 0.45)',
    onPrimary: '#FFFFFF',
    onSecondary: '#FAFAFA',
    onSuccess: '#FFFFFF',
    onWarning: '#FFFFFF',
    onDanger: '#FFFFFF',
    onUnknown: '#FFFFFF',
    onSurface: '#dbdbdb',
    onBackground: '#b1b1b1',
    onExterior: '#FAFAFA',
    onBorder: '#FAFAFA'
  }
});
