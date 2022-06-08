import { table } from 'console';
import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { FaSortDown } from 'react-icons/fa';
import { Box, BoxProps } from '../../containers';

export interface DataGridHeadCellProps extends BoxProps {}

export const DataGridHeadCell = forwardRef<
  HTMLDivElement,
  DataGridHeadCellProps
>(({ ...rest }, ref) => {
  return (
    <Box
      ref={ref}
      role="cell"
      sx={{
        fontWeight: 600,
        fontSize: 1,
        color: 'accentOnSurface',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1,
      }}
      {...rest}
    />
  );
});
