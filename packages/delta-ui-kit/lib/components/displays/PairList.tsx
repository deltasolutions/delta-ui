import { jsx } from '@theme-ui/core';
import { forwardRef, ReactNode } from 'react';
import { Box, BoxProps } from '../containers';
import { Skeleton } from './Skeleton';

export interface PairListProps extends BoxProps {
  pairs: any[][];
  variant?: 'column' | 'row' | 'row-space';
  loading?: boolean;
}

export const PairList = forwardRef<HTMLDivElement, PairListProps>(
  ({ pairs, variant = 'row', loading, ...rest }, ref) => {
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
        {pairs.map(([key, value], index) => {
          return (
            <Box
              key={['string', 'number'].includes(typeof key) ? key : index}
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
                  fontWeight: 'bold',
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
                <PairListValue loading={loading} value={value} />
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
        {pairs.map(([key, value], index) => {
          return (
            <Box
              key={['string', 'number'].includes(typeof key) ? key : index}
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
                sx={{ color: 'accentOnContext', fontWeight: 'bold' }}
              >
                {key}
              </Box>
              <Box aria-label="value">
                <PairListValue loading={loading} value={value} />
              </Box>
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
              <tr key={['string', 'number'].includes(typeof key) ? key : index}>
                <td
                  aria-label="key"
                  sx={{ color: 'accentOnContext', fontWeight: 'bold' }}
                >
                  {key}
                </td>
                <td aria-label="space" sx={{ width: '2rem' }}></td>
                <td aria-label="value">
                  <PairListValue loading={loading} value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    );
  }
);

const PairListValue = ({
  value,
  loading,
}: {
  value: ReactNode;
  loading?: boolean;
}) => {
  return loading ? (
    <Skeleton sx={{ height: '1em', width: '100px' }} />
  ) : (
    <Box>{value}</Box>
  );
};
