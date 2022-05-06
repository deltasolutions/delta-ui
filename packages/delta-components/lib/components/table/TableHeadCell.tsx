import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';
import { EllipsisText } from '../EllipsisText';
export interface TableHeadCellProps
  extends HTMLAttributes<HTMLTableCellElement> {}
export const TableHeadCell = forwardRef<
  HTMLTableCellElement,
  TableHeadCellProps
>(({ children, ...rest }: TableHeadCellProps, ref) => {
  return (
    <td ref={ref} sx={{ height: '36px' }} {...rest}>
      <Box
        sx={{
          display: 'flex',
          paddingX: '8px',
          alignItems: 'center',
          height: '100%',
          textTransform: 'uppercase',
          fontSize: '12px'
        }}
      >
        <EllipsisText>{children}</EllipsisText>
      </Box>
    </td>
  );
});
