import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export interface PairListProps extends BoxProps {
  pairs: any[][];
  direction?: 'column' | 'row';
}

export const PairList = forwardRef<HTMLDivElement, PairListProps>(
  ({ pairs, direction = 'row', ...rest }: PairListProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{ gap: 5, flexDirection: 'column', width: '100%', display: 'flex' }}
        {...rest}
      >
        {pairs.map(([key, value], index, array) => {
          return (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: 2,
                gap: 2,
                flexDirection: direction
              }}
              key={index}
            >
              <Box sx={{ color: 'onSurfaceVariant', fontWeight: 600 }}>
                {key}
              </Box>
              <Box sx={{ color: 'onSurface' }}>{value}</Box>
            </Box>
          );
        })}
      </Box>
    );
  }
);
