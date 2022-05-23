import { jsx, ThemeProvider } from '@theme-ui/core';
import { createContext, HTMLAttributes, useMemo, useState } from 'react';
import { system, theme as defaultTheme, Theme } from '../defaults';
import { useImperativePortal } from '../hooks';
import { Box } from './Box';

export const SystemContext = createContext(system);

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  theme?: Theme;
}

export const SystemContainer = ({
  children,
  theme = defaultTheme,
  ...rest
}: ContainerProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const floatingPortal = useImperativePortal(element);
  const system = useMemo(() => ({ floatingPortal }), [floatingPortal]);
  return (
    <SystemContext.Provider value={system}>
      <ThemeProvider theme={theme} {...rest}>
        <Box
          ref={setElement}
          sx={{
            fontFamily: theme.fontFamily,
            color: theme.colors.onBackground,
            fontSize: theme.fontSizes[3],
          }}
        >
          {children}
        </Box>
        {floatingPortal}
      </ThemeProvider>
    </SystemContext.Provider>
  );
};
