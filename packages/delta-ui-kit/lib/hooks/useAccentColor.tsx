import { lighten, darken } from 'polished';
import { useDeltaTheme } from './useDeltaTheme';

export const useAccentColor = (color, coeff) => {
  const { colorScheme } = useDeltaTheme();
  const isDark = colorScheme === 'dark';
  return isDark ? lighten(color, coeff) : darken(color, coeff);
};
