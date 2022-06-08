import { jsx } from '@theme-ui/core';
import { forwardRef, HtmlHTMLAttributes } from 'react';
export interface BoxProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (props: BoxProps, ref) => {
    return (
      <div ref={ref} sx={{ boxSizing: 'border-box', minWidth: 0 }} {...props} />
    );
  }
);
