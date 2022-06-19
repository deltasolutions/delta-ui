import { jsx, ThemeProvider } from '@theme-ui/core';
import { forwardRef } from 'react';
import { useDeltaTheme } from '../../../../hooks';
import { Box } from '../../Box';
import { ResizableBox, ResizableBoxProps } from '../../ResizableBox';

export interface LayoutSidebarProps extends ResizableBoxProps {}

export const LayoutSidebar = forwardRef<HTMLDivElement, LayoutSidebarProps>(
  (
    {
      children,
      onResize,
      width,
      maxWidth,
      minWidth,
      axis = ['e'],
      ...rest
    }: LayoutSidebarProps,
    ref
  ) => {
    const theme = useDeltaTheme({
      colors: {
        context: 'exterior',
        accentContext: 'accentExterior',
        onContext: 'onExterior',
        accentOnContext: 'accentOnExterior',
      },
    });
    return (
      <ThemeProvider theme={theme}>
        <Box
          ref={ref}
          sx={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            backgroundColor: 'context',
            color: 'onContext',
          }}
          {...rest}
        >
          <ResizableBox
            axis={axis}
            maxWidth={maxWidth}
            minWidth={minWidth}
            width={width}
            onResize={onResize}
          >
            <Box
              sx={{
                height: '100vh',
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
              }}
            >
              {children}
            </Box>
          </ResizableBox>
        </Box>
      </ThemeProvider>
    );
  }
);
