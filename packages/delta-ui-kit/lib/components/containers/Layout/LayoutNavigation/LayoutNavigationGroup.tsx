import { jsx } from '@theme-ui/core';
import { forwardRef, ReactNode } from 'react';
import { Box, BoxProps } from '../../Box';
import { Heading } from '../../Heading';

export interface LayoutNavigationGroupProps extends Omit<BoxProps, 'title'> {
  title: ReactNode;
}

export const LayoutNavigationGroup = forwardRef<
  HTMLDivElement,
  LayoutNavigationGroupProps
>(({ children, title, ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        py: 2,
        mr: 2,
      }}
      {...rest}
    >
      <Box
        sx={{
          fontSize: '12px',
          ml: '18px',
          mb: 1,
          color: 'onExterior',
          fontWeight: 500,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
});
