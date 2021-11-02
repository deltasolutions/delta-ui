import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { useThemed } from 'restyler';
import { getColumnWidth, getRowWidth } from '../../../utils';
import { DataTableContext } from '../DataTableContext';
import { DraggableCell } from './DraggableCell';
import { Ruler } from './Ruler';

export const Header = () => {
  const TableRow = useThemed('div', 'dataTable.row');
  const {
    manager: { coercedColumns, activeTab, updateActiveTab }
  } = useContext(DataTableContext);
  const [_, dropRef] = useDrop(() => ({
    accept: 'resizer',
    drop: ({ index }, monitor) => {
      const { x = 0 } = monitor.getDifferenceFromInitialOffset() ?? {};
      const column = coercedColumns[index];
      if (!column) {
        return;
      }
      const width = Math.min(Math.max(getColumnWidth(column) + x, 30), 400);
      updateActiveTab({
        columnSizes: {
          ...activeTab.columnSizes,
          [column.key]: width
        }
      });
    }
  }));
  return (
    <TableRow
      key="head"
      ref={dropRef}
      kind="head"
      style={{
        zIndex: 1,
        position: 'sticky',
        top: 0,
        width: `max(${getRowWidth(coercedColumns)}px, 100%)`,
        whiteSpace: 'nowrap'
      }}
    >
      {coercedColumns.map((v, i) => (
        <DraggableCell
          key={v.key + '-head'}
          index={i}
          style={{
            display: 'inline-block',
            width: getColumnWidth(v) + 'px'
          }}
        >
          {v.header}
        </DraggableCell>
      ))}
      <Ruler />
    </TableRow>
  );
};
