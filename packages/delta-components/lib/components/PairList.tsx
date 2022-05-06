import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export interface PairListProps extends BoxProps {
  pairs: any[][];
}

export const PairList = forwardRef<HTMLDivElement, PairListProps>(
  ({ pairs, ...rest }: PairListProps, ref) => {
    return (
      <Box
        ref={ref}
        sx={{ gap: '16px', flexDirection: 'column', display: 'flex' }}
        {...rest}
      >
        {pairs.map(([key, value], index) => {
          return (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: '40px',
                gap: 2,
                flexDirection: 'column'
              }}
              key={index}
            >
              <Box sx={{ color: 'text_base', fontWeight: 600 }}>{key}</Box>
              <Box>{value}</Box>
            </Box>
          );
        })}
      </Box>
    );
  }
);
