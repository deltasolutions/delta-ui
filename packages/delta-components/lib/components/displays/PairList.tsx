import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../containers';

export interface PairListProps extends BoxProps {
  pairs: any[][];
  variant?: 'column' | 'row';
}

export const PairList = forwardRef<HTMLDivElement, PairListProps>(
  ({ pairs, variant = 'row', ...rest }: PairListProps, ref) => {
    return variant === 'column' ? (
      <Box
        ref={ref}
        sx={{ gap: 4, flexDirection: 'column', display: 'flex' }}
        {...rest}
      >
        {pairs.map(([key, value], index) => {
          return (
            <Box
              sx={{
                display: 'flex',
                minHeight: 2,
                gap: 2,
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
              key={index}
            >
              <Box sx={{ fontWeight: 600 }}>{key}</Box>
              <Box>{value}</Box>
            </Box>
          );
        })}
      </Box>
    ) : (
      <Box ref={ref} {...rest}>
        <table
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '1rem',
          }}
        >
          <tbody>
            {pairs.map(([key, value], index) => (
              <tr key={index}>
                <td sx={{ fontWeight: 600 }}>{key}</td>
                <td sx={{ width: '30px' }}></td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    );
  }
);
