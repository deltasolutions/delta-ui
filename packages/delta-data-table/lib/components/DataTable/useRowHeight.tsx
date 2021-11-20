import { jsx } from '@theme-ui/core';
import { useEffect, useState } from 'react';
import { useMeter, useThemed } from 'restyler';

export interface RowHeightOptions {
  forcedRowHeight?: number;
}

export const useRowHeight = ({ forcedRowHeight }: RowHeightOptions) => {
  const Row = useThemed('div', 'dataTable.row');
  const Cell = useThemed('div', 'dataTable.cell');
  const [rowHeight, setRowHeight] = useState(forcedRowHeight ?? 0);
  const measure = useMeter(
    container => {
      setRowHeight(container.offsetHeight);
    },
    { deps: [] }
  );
  useEffect(() => {
    if (forcedRowHeight) {
      return;
    }
    measure?.(
      <Row>
        <Cell>&nbsp;</Cell>
      </Row>
    );
  }, [measure]);
  return rowHeight;
};
