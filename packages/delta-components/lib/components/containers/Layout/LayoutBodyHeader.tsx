import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from '../Box';

export interface LayoutBodyHeaderProps extends BoxProps {}

export const LayoutBodyHeader = (props: LayoutBodyHeaderProps) => {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        width: '100%',
        height: '64px',
      }}
      {...props}
    />
  );
};
