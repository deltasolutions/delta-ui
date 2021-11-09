import { jsx } from '@theme-ui/core';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { BoxProps, useThemed } from 'restyler';

export const EmptyRow = (props: BoxProps) => {
  const TableRow = useThemed('div', 'dataTable.row');
  const TableCell = useThemed('div', 'dataTable.cell');
  return (
    <TableRow {...props}>
      <TableCell
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <IoFolderOpenOutline
          sx={{
            width: '1.5em',
            height: '1.5em'
          }}
        />
      </TableCell>
    </TableRow>
  );
};
