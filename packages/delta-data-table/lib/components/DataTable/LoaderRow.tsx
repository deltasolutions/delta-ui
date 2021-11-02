import { keyframes } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { useContext, useEffect } from 'react';
import { RiLoaderLine } from 'react-icons/ri';
import { BoxProps, useThemed } from 'restyler';
import { DataTableContext } from './DataTableContext';

export const LoaderRow = (props: BoxProps) => {
  const TableRow = useThemed('div', 'dataTable.row');
  const TableCell = useThemed('div', 'dataTable.cell');
  const {
    manager: { requestNextChunk }
  } = useContext(DataTableContext);
  useEffect(() => {
    requestNextChunk();
  }, [requestNextChunk]);
  return (
    <TableRow {...props}>
      <TableCell
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <RiLoaderLine
          sx={{
            width: '1.5em',
            height: '1.5em',
            animation: `${loaderAnimation} 2s infinite linear`
          }}
        />
      </TableCell>
    </TableRow>
  );
};

const loaderAnimation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
});
