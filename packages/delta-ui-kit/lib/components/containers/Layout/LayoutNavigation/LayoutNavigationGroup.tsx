import { jsx } from '@theme-ui/core';
import { forwardRef, ReactNode } from 'react';
import { useDeltaTheme } from '../../../../hooks';
import { Box, BoxProps } from '../../Box';

export interface LayoutNavigationGroupProps extends Omit<BoxProps, 'title'> {
  title: ReactNode;
}

export const LayoutNavigationGroup = forwardRef<
  HTMLDivElement,
  LayoutNavigationGroupProps
>(({ children, title, ...rest }, ref) => {
  const { mode } = useDeltaTheme();
  return (
    <Box ref={ref} {...rest}>
      <Box
        sx={{
          px: '1.35rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: 2,
          fontWeight: mode === 'light' ? 400 : 300,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          '&:not(:last-of-type)': { mt: 3 },
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
});
