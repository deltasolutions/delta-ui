import { jsx } from '@theme-ui/core';
import { useContext, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useSharedRef, useThemed } from 'restyler';
import { DataTableContext } from '../DataTableContext';
import { getColumnWidth, getRowWidth } from '../utils';
import { DraggableCell } from './DraggableCell';
import { Ruler } from './Ruler';

export const Header = () => {
  const TableRow = useThemed('div', 'dataTable.row');
  const { columns, activeTab, updateActiveTab } = useContext(DataTableContext);

  const [element, setElement] = useState<HTMLDivElement | null>(null);
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
  const sharedRef = useSharedRef<HTMLDivElement>(null, [setElement, dropRef]);
  const rulerOffset = useMemo(
    () => (element ? -element.getBoundingClientRect().left : 0),
    [element]
  );

  return (
    <TableRow
      key="head"
      ref={sharedRef}
      kind="head"
      style={{
        zIndex: 1,
        position: 'sticky',
        top: 0,
        width: getRowWidth(columns) + 'px',
        whiteSpace: 'nowrap'
      }}
    >
      <Ruler offset={rulerOffset} />
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
    </TableRow>
  );
};
