import { jsx } from '@theme-ui/core';
import { createContext, forwardRef } from 'react';
import { Box, BoxProps } from '../../Box';

export interface LayoutNavigationProps extends BoxProps {
  activeId?: string;
}
export const LayoutNavigation = forwardRef<
  HTMLDivElement,
  LayoutNavigationProps
>(({ activeId, children, ...rest }, ref) => {
  return (
    <Box ref={ref} sx={{ pr: 2, overflow: 'scroll' }} {...rest}>
      <NavigationContext.Provider value={{ activeId }}>
        {children}
      </NavigationContext.Provider>
    </Box>
  );
});

export const NavigationContext = createContext({} as NavigationContextProps);
export interface NavigationContextProps {
  activeId?: string;
}
