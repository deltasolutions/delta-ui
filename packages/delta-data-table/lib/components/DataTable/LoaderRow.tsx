import { jsx } from '@theme-ui/core';
import { useContext, useEffect } from 'react';
import { RiLoaderLine } from 'react-icons/ri';
import { BoxProps, useThemed } from 'restyler';
import { DataTableContext } from './DataTableContext';

export const LoaderRow = (props: BoxProps) => {
  const Row = useThemed('div', 'dataTable.row');
  const Cell = useThemed('div', 'dataTable.cell');
  const {
    manager: { requestNextChunk }
  } = useContext(DataTableContext);
  useEffect(() => {
    requestNextChunk();
  }, [requestNextChunk]);
  return (
    <Row {...props}>
      <Cell kind="loader">
        <RiLoaderLine />
      </Cell>
    </Row>
  );
};
