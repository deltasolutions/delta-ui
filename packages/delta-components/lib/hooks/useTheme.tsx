import { useThemeUI } from '@theme-ui/core';
import { Theme } from '../encoreDarkScheme';

export const useTheme = <T extends Theme>(): T => {
  const { theme } = useThemeUI();
  return theme as unknown as T;
};
