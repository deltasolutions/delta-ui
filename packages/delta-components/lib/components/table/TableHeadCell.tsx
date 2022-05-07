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
    <td ref={ref} sx={{ height: 3 }} {...rest}>
      <Box
        sx={{
          display: 'flex',
          paddingX: 3,
          alignItems: 'center',
          height: '100%',
          fontSize: 1,
          color: 'onBackground'
        }}
      >
        <EllipsisText>{children}</EllipsisText>
      </Box>
    </td>
  );
});
