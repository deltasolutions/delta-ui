import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../containers';

export interface PairListProps extends BoxProps {
  pairs: any[][];
  variant?: 'column' | 'row' | 'row-space';
}

export const PairList = forwardRef<HTMLDivElement, PairListProps>(
  ({ pairs, variant = 'row', ...rest }, ref) => {
    return variant === 'row-space' ? (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
        {...rest}
      >
        {pairs.map(([key, value]) => {
          return (
            <Box
              key={key}
              sx={{
                display: 'flex',
                minHeight: 2,
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                aria-label="key"
                sx={{
                  color: 'accentOnContext',
                  textAlign: 'right',
                  fontWeight: 600,
                }}
              >
                {key}
              </Box>
              <Box
                aria-label="value"
                sx={{
                  textAlign: 'right',
                  ml: 4,
                }}
              >
                {value}
              </Box>
            </Box>
          );
        })}
      </Box>
    ) : variant === 'column' ? (
      <Box
        ref={ref}
        sx={{ gap: 4, flexDirection: 'column', display: 'flex' }}
        {...rest}
      >
        {pairs.map(([key, value]) => {
          return (
            <Box
              key={key}
              sx={{
                display: 'flex',
                minHeight: 2,
                gap: 2,
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
            >
              <Box
                aria-label="key"
                sx={{ color: 'accentOnContext', fontWeight: 600 }}
              >
                {key}
              </Box>
              <Box aria-label="value">{value}</Box>
            </Box>
          );
        })}
      </Box>
    ) : (
      <Box ref={ref} {...rest}>
        <table
          sx={{
            borderCollapse: 'separate',
          }}
        >
          <tbody
            sx={{
              '& > tr:not(:last-of-type) > td': { pb: 3 },
            }}
          >
            {pairs.map(([key, value], index) => (
              <tr key={key}>
                <td
                  aria-label="key"
                  sx={{ color: 'accentOnContext', fontWeight: 600 }}
                >
                  {key}
                </td>
                <td aria-label="space" sx={{ width: '2rem' }}></td>
                <td aria-label="value">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    );
  }
);
