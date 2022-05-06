import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';
import { EllipsisText } from '../EllipsisText';
export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {}
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, ...rest }: TableCellProps, ref) => {
    return (
      <td ref={ref} sx={{ height: '56px' }} {...rest}>
        <Box
          sx={{
            display: 'flex',
            paddingX: '8px',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <EllipsisText>{children}</EllipsisText>
        </Box>
      </td>
    );
  }
);
