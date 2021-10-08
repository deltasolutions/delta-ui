import { mergeBasicThemes } from 'restyler';
import { restylerDeltaTheme } from './restylerDeltaTheme';

export const restylerDarkDeltaTheme = mergeBasicThemes({}, restylerDeltaTheme, {
  fontWeights: {
    body: 400,
    heading: 300
  },
  colors: {
    primary: '#5DA2DE',
    success: '#55b158',
    warning: '#ECA843',
    danger: '#EF6D64',
    unknown: '#B3B3B3',
    surface: '#3d3d3d',
    background: '#2e2e2e',
    exterior: '#1c1d1d',
    border: 'rgba(255, 255, 255, 0.17)',
    accentPrimary: '#4A8DC7',
    accentSuccess: '#367438',
    accentWarning: '#D69431',
    accentDanger: '#DF5248',
    accentUnknown: '#A3A3A3',
    accentSurface: '#313131',
    accentBackground: '#E0E0E0',
    accentExterior: '#1C1D1F',
    accentBorder: 'rgba(255, 255, 255, 0.45)',
    onPrimary: '#FFFFFF',
    onSuccess: '#FFFFFF',
    onDanger: '#FFFFFF',
    onUnknown: '#FFFFFF',
    onSurface: '#cccccc',
    onBackground: '#a3a3a3',
    onExterior: '#dedede'
  }
});
