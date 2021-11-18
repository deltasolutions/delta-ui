import { jsx } from '@theme-ui/core';
import { BoxProps, useThemed } from 'restyler';

export const EmptyRow = (props: BoxProps) => {
  const Row = useThemed('div', 'dataTable.row');
  const Cell = useThemed('div', 'dataTable.cell');
  return (
    <Row kind="empty" {...props}>
      <Cell />
    </Row>
  );
};
