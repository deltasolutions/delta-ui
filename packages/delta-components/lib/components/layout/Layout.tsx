import { jsx } from '@theme-ui/core';
import { HTMLAttributes, memo } from 'react';
import { BackgroundBase } from '../shallow';

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}
export const Layout = ({ ...rest }: LayoutProps) => {
  return (
    <BackgroundBase
      sx={{
        display: 'flex',
        width: '100vw'
      }}
      {...rest}
    />
  );
};
