import { jsx } from '@theme-ui/core';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { BoxProps, useThemed } from 'restyler';

export const EmptyRow = (props: BoxProps) => {
  const Row = useThemed('div', 'dataTable.row');
  const Cell = useThemed('div', 'dataTable.cell');
  return (
    <Row {...props}>
      <Cell kind="empty">
        <IoFolderOpenOutline />
      </Cell>
    </Row>
  );
};
