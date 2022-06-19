import { jsx, ThemeProvider } from '@theme-ui/core';
import {
  createContext,
  forwardRef,
  HTMLAttributes,
  useMemo,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { system, deltaTheme as defaultTheme, DeltaTheme } from '../../defaults';
import { useImperativePortal } from '../../hooks';
import { Box } from './Box';

export const SystemContext = createContext(system);

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  theme?: DeltaTheme;
}

export const SystemContainer = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, theme = defaultTheme, ...rest }, ref) => {
    const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
    const floatingPortal = useImperativePortal(portalNode);
    const system = useMemo(() => ({ floatingPortal }), [floatingPortal]);
    return (
      <SystemContext.Provider value={system}>
        <DndProvider backend={HTML5Backend}>
          <ThemeProvider theme={theme} {...rest}>
            <Box
              ref={ref}
              sx={{
                width: '100%',
                minHeight: '100vh',
                fontFamily: theme.fontFamily,
                backgroundColor: 'background',
                color: 'onBackground',
                fontSize: 2,
              }}
            >
              {children}
              <Box ref={setPortalNode} id="floating-portal" />
              {floatingPortal}
            </Box>
          </ThemeProvider>
        </DndProvider>
      </SystemContext.Provider>
    );
  }
);
