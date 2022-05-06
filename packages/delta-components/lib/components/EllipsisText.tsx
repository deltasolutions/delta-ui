import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from './Box';
export interface EllipsisTextProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
}

export const EllipsisText = forwardRef<HTMLDivElement, EllipsisTextProps>(
  ({ width, children, ...rest }: EllipsisTextProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width,
          color: 'inherit'
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);
