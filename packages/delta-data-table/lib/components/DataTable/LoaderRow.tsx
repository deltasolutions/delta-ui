import { jsx } from '@theme-ui/core';
import { useContext, useEffect } from 'react';
import { RiLoaderLine } from 'react-icons/ri';
import { BoxProps, useThemed } from 'restyler';
import { DataTableContext } from './DataTableContext';

export const LoaderRow = (props: BoxProps) => {
  const Row = useThemed('div', 'dataTable.row');
  const Cell = useThemed('div', 'dataTable.cell');
  const {
    manager: { data, query, isLoadingNextChunk, requestNextChunk }
  } = useContext(DataTableContext);
  useEffect(() => {
    requestNextChunk({
      offset: data.length,
      query
    });
  }, [data, query, isLoadingNextChunk]);
  return (
    <Row {...props}>
      <Cell kind="loader">
        <RiLoaderLine />
      </Cell>
    </Row>
  );
};
