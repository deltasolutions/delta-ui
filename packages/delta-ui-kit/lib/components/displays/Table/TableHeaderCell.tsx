import { jsx } from '@theme-ui/core';
import { rgba } from 'polished';
import { forwardRef, HTMLAttributes, ReactNode, useContext } from 'react';
import { useDeltaTheme } from '../../../hooks';
import { Box } from '../../containers';
import { TableHeaderContext } from './TableHeader';

export interface TableHeaderCellProps
  extends HTMLAttributes<HTMLTableCellElement> {
  label?: ReactNode;
}

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(({ children, ...rest }, ref) => {
  const { colors } = useDeltaTheme();
  const { sticked } = useContext(TableHeaderContext);
  return (
    <th
      ref={ref}
      role="cell"
      sx={{
        position: 'relative',
        gap: 1,
        px: 2,
        py: '0.65em',
        width: 'auto',
        textTransform: 'uppercase',
        fontSize: 1,
        fontWeight: 300,
        letterSpacing: '0.06em',
        borderBottom: sticked ? '1px solid' : undefined,
        borderBottomColor: rgba(colors.onContext, 0.2),
        '&:first-of-type': { pl: 4 },
        '&:last-of-type': { pr: 4 },
      }}
      {...rest}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pr: 1,
          fontSize: 1,
          fontWeight: 300,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {children}
      </Box>
    </th>
  );
});
