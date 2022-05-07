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
        width: '100vw',
        minHeight: '100%'
      }}
      {...rest}
    />
  );
};
