import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from '../Box';

export interface LayoutBodyMainProps extends BoxProps {}

export const LayoutBodyMain = (props: LayoutBodyMainProps) => {
  return <Box sx={{ width: '100%', paddingX: '32px' }} {...props} />;
};
