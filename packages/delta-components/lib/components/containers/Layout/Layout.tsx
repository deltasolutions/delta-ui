import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from '../Box';

export interface LayoutProps extends BoxProps {}

export const Layout = ({ ...rest }: LayoutProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background',
        display: 'flex',
        minHeight: '100vh',
      }}
      {...rest}
    />
  );
};
