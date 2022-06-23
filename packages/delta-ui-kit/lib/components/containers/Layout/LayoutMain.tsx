import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from '../Box';

export interface LayoutMainProps extends BoxProps {}

export const LayoutMain = (props: LayoutMainProps) => {
  return (
    <Box
      role="body"
      sx={{
        width: '100%',
        flex: '1 1 10%',
        display: 'flex',
        flexDirection: 'column',
      }}
      {...props}
    />
  );
};
