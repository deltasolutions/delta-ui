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
      sx={{
        mt: 4,
        '& + &': {
          // borderTop: '1px rgba(255,255,255,0.1) solid',
        },
      }}
      {...rest}
    >
      <Heading
        level={6}
        sx={{
          textTransform: 'uppercase',
          fontFamily: 'Arial, sans-serif',
          ml: 3,
          pb: 2,
          color: 'onExterior',
          fontWeight: 600,
          letterSpacing: 0.4,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </Heading>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  );
});
