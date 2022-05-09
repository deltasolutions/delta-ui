import { jsx } from '@theme-ui/core';
import { HTMLAttributes, memo } from 'react';
import { Box } from '../Box';
import { BackgroundBase } from '../shallow';

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}
export const Layout = ({ ...rest }: LayoutProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background',
        display: 'flex',
        minHeight: '100vh'
      }}
      {...rest}
    />
  );
};
