import { parseToRgb, rgba } from 'polished';
import { useDeltaTheme } from '../../../hooks';

const coeff = 0.7;

export const useTableAccentContextColor = () => {
  const { colors } = useDeltaTheme();
  const { alpha } = parseToRgb(colors.accentContext) as {
    alpha: number | undefined;
  };
  const backgroundColor = rgba(
    colors.accentContext,
    alpha ? alpha * coeff : coeff
  );
  return backgroundColor;
};
