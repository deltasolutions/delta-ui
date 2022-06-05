import { jsx } from '@theme-ui/core';
import { forwardRef, Fragment, ReactElement, ReactNode } from 'react';
import { Box, BoxProps } from '../../Box';
import { Heading } from '../../Heading';
import {} from 'react-icons';
export interface LayoutNavigationGroupProps extends Omit<BoxProps, 'title'> {
  title?: ReactNode;
}

export const LayoutNavigationGroup = forwardRef<
  HTMLDivElement,
  LayoutNavigationGroupProps
>(({ children, title, ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      sx={{ borderBottom: '1px rgba(255,255,255,0.1) solid', py: 2 }}
      {...rest}
    >
      <Heading
        level={6}
        sx={{
          textTransform: 'uppercase',
          px: 4,
          py: 2,
          color: '#b3b3b3',
          fontSize: 1,
          fontWeight: 600,
          letterSpacing: 0.4,
        }}
      >
        {title}
      </Heading>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>{children}</Box>
    </Box>
  );
});
