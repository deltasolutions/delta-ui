import { jsx, ThemeProvider } from '@theme-ui/core';
import {
  createContext,
  forwardRef,
  HTMLAttributes,
  useMemo,
  useState,
} from 'react';
import { system, theme as defaultTheme, Theme } from '../../defaults';
import { useImperativePortal } from '../../hooks';
import { Box } from './Box';

export const SystemContext = createContext(system);

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  theme?: Theme;
}

export const SystemContainer = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, theme = defaultTheme, ...rest }, ref) => {
    const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
    const floatingPortal = useImperativePortal(portalNode);
    const system = useMemo(() => ({ floatingPortal }), [floatingPortal]);
    return (
      <SystemContext.Provider value={system}>
        <ThemeProvider theme={theme} {...rest}>
          <Box
            ref={ref}
            sx={{
              width: '100%',
              minHeight: '100vh',
              fontFamily: theme.fontFamily,
              backgroundColor: theme.colors.background,
              color: theme.colors.onBackground,
              fontSize: theme.fontSizes[2],
            }}
          >
            {children}
            <Box ref={setPortalNode} id="floating-portal" />
            {floatingPortal}
          </Box>
        </ThemeProvider>
      </SystemContext.Provider>
    );
  }
);
