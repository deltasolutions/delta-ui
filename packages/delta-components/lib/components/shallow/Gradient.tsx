import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { SHALLOW_GRADIENT_COLOR } from '../../variables';
import { Box } from '../Box';
export interface GradientProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
}
export const Gradient = forwardRef<HTMLDivElement, GradientProps>(
  ({ color = SHALLOW_GRADIENT_COLOR, ...rest }: GradientProps, ref) => {
    return (
      <Box
        ref={ref}
        {...rest}
        style={{ backgroundColor: color }}
        sx={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,.75) 0,#121212 100%), url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=)',
          height: '332px',
          position: 'absolute',
          WebkitTransition: 'background 1s ease',
          transition: 'background 1s ease',
          width: '100%',
          zIndex: 1
        }}
      />
    );
  }
);
