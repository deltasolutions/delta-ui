import { jsx } from '@theme-ui/core';
import { useContext, useEffect, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { SystemContext, useThemed } from 'restyler';
import { DataTableContext } from '../DataTableContext';
import { getColumnWidth, getRowWidth } from '../utils';
import { DraggableCell } from './DraggableCell';
import { Ruler } from './Ruler';

export const Header = () => {
  const TableRow = useThemed('div', 'dataTable.row');
  const { columns, activeTab, updateActiveTab } = useContext(DataTableContext);
  const [_, dropRef] = useDrop(() => ({
    accept: 'resizer',
    drop: ({ index }, monitor) => {
      const { x = 0 } = monitor.getDifferenceFromInitialOffset() ?? {};
      const column = columns[index];
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
        width: `max(${getRowWidth(columns)}px, 100%)`,
        whiteSpace: 'nowrap'
      }}
    >
      {columns.map((v, i) => (
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
