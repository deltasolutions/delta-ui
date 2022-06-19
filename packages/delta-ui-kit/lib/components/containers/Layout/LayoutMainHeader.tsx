import { jsx, ThemeProvider } from '@theme-ui/core';
import { parseToRgb } from 'polished';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { useDeltaTheme } from '../../../hooks';
import { Box, BoxProps } from '../Box';

export const layoutHeaderHeight = 52;

export interface LayoutMainHeaderProps extends BoxProps {}

export const LayoutMainHeader = forwardRef<
  HTMLDivElement,
  LayoutMainHeaderProps
>((props: LayoutMainHeaderProps, ref) => {
  const theme = useDeltaTheme({
    colors: {
      context: 'exterior',
      accentContext: 'accentExterior',
      onContext: 'onExterior',
      accentOnContext: 'accentOnExterior',
    },
  });
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const handleScroll = useCallback(() => {
    const { red, green, blue } = parseToRgb(theme.colors.exterior);
    const ratio = Math.min(window.scrollY / layoutHeaderHeight, 1);
    setBackgroundColor(`rgba(${red}, ${green}, ${blue}, ${ratio})`);
  }, [theme]);
  useEffect(() => {
    addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={ref}
        style={{ backgroundColor }}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          width: '100%',
          height: `${layoutHeaderHeight}px`,
          display: 'flex',
          alignItems: 'center',
          paddingX: 5,
          color: 'onContext',
        }}
        {...props}
      />
    </ThemeProvider>
  );
});
