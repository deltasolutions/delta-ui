import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Header } from './Header';

export const InnerElement = forwardRef<HTMLDivElement>(
  ({ children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Header />
        {children}
      </div>
    );
  }
);
