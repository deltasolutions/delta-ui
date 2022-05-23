import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from './Box';

export interface PairListProps extends BoxProps {
  pairs: any[][];
  direction?: 'column' | 'row';
}

export const PairList = forwardRef<HTMLDivElement, PairListProps>(
  ({ pairs, direction = 'row', ...rest }: PairListProps, ref) => {
    return direction === 'column' ? (
      <Box
        ref={ref}
        sx={{ gap: 5, flexDirection: 'column', width: '100%', display: 'flex' }}
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
                flexDirection: 'column'
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
    ) : (
      <Box ref={ref} {...rest}>
        <table>
          <tbody>
            {pairs.map(([key, value], index) => (
              <tr key={index}>
                <td sx={{ color: 'onSurfaceVariant', pb: 5, fontWeight: 600 }}>
                  {key}
                </td>
                <td sx={{ width: '30px', pb: 5 }}></td>
                <td sx={{ color: 'onSurface', pb: 5 }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    );
  }
);
