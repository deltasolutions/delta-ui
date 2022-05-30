import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from '../Box';

export interface LayoutBodyProps extends BoxProps {}

export const LayoutBody = (props: LayoutBodyProps) => {
  return (
    <Box
      role="body"
      sx={{ width: '100%', flex: '1 1 10%', minWidth: 0 }}
      {...props}
    />
  );
};
