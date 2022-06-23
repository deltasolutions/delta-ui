import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from '../Box';

export interface LayoutMainHeaderProps extends BoxProps {}

export const LayoutMainHeader = (props: LayoutMainHeaderProps) => {
  return (
    <Box
      sx={{
        paddingX: 5,
        paddingTop: 3,
        paddingBottom: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
      }}
      {...props}
    />
  );
};
