import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from '../Box';

export interface LayoutMainBodyProps extends BoxProps {}

export const LayoutMainBody = (props: LayoutMainBodyProps) => {
  return (
    <Box
      sx={{
        paddingX: 5,
        display: 'flex',
        gap: 3,
        flexDirection: 'column',
        paddingY: 4,
      }}
      {...props}
    />
  );
};
