import { jsx } from '@theme-ui/core';
import { Fragment, HTMLAttributes } from 'react';
import { LAYOUT_HEADER_HEIGHT } from '../../variables';
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
        height: `${LAYOUT_HEADER_HEIGHT}px`
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
