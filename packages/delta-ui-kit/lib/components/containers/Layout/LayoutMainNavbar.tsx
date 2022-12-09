import { jsx, ThemeProvider } from '@theme-ui/core';
import { forwardRef, ReactNode, useMemo } from 'react';
import { useDeltaTheme, useSticked } from '../../../hooks';
import { mergeRefs } from '../../../utils';
import { Box, BoxProps } from '../Box';

export const layoutMainNavbarHeight = 52;

export interface LayoutMainNavbarProps extends Omit<BoxProps, 'children'> {
  children?: ReactNode | ((ratio: boolean) => ReactNode);
}

export const LayoutMainNavbar = forwardRef<
  HTMLDivElement,
  LayoutMainNavbarProps
>(({ children, ...rest }: LayoutMainNavbarProps, ref) => {
  const theme = useDeltaTheme({
    colors: {
      context: 'exterior',
      accentContext: 'accentExterior',
      onContext: 'onExterior',
      accentOnContext: 'accentOnExterior',
    },
  });
  const [sticked, setElement] = useSticked();
  const mergedRef = useMemo(
    () => mergeRefs([ref, setElement]),
    [ref, setElement]
  );
  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={mergedRef}
        sx={{
          mt: 2,
          zIndex: 2,
          width: '100%',
          position: 'sticky',
          top: 0,
          flex: '0 0 auto',
          height: `${layoutMainNavbarHeight}px`,
          paddingX: 5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 3,
          backgroundColor: sticked ? 'exterior' : 'transparent',
          color: 'onContext',
          transition: 'background-color 0.15s linear',
          '&::before': {
            opacity: sticked ? 1 : 0,
            content: '""',
            display: 'block',
            position: 'absolute',
            left: 0,
            top: '100%',
            width: '100%',
            height: '20px',
            boxShadow: 'drop',
            transform: 'opacity 0.15s linear',
          },
        }}
        {...rest}
      >
        {children instanceof Function ? children(sticked) : children}
      </Box>
    </ThemeProvider>
  );
});
