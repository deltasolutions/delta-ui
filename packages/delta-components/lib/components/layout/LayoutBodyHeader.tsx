import { jsx } from '@theme-ui/core';
import { Fragment, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface LayoutBodyHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export const LayoutBodyHeader = ({
  children,
  ...rest
}: LayoutBodyHeaderProps) => {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        width: '100%',
        height: `${64}px`
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
