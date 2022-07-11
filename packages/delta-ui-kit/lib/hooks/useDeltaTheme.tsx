import { merge, Theme, useThemeUI } from '@theme-ui/core';
import { clone } from 'delta-jsf';
import { useMemo } from 'react';
import { DeltaTheme } from '../defaults';
import { hash } from '../utils';

export const useDeltaTheme = (overrides?: Theme) => {
  const currentTheme = useThemeUI().theme as DeltaTheme;
  const targetTheme = useMemo(() => {
    if (!overrides) {
      return currentTheme;
    }
    const { colors = {}, ...rest } = overrides;
    return merge(clone(currentTheme), {
      colors: Object.entries(colors).reduce(
        (p, [k, v]) => ({
          ...p,
          [k]: typeof v === 'string' ? currentTheme.colors[v] ?? v : v,
        }),
        {}
      ),
      ...rest,
    }) as DeltaTheme;
  }, [currentTheme, hash(overrides)]);
  return targetTheme;
};
