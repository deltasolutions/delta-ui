import { jsx } from '@theme-ui/core';
import { Fragment, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { useThemed } from 'restyler';
import { getColumnWidth, getRowWidth } from '../../../utils';
import { DataTableContext } from '../DataTableContext';
import { Handle } from './Handle';

export const Header = () => {
  const TableRow = useThemed('div', 'dataTable.row');
  const TableCell = useThemed('div', 'dataTable.cell');
  const {
    rowHeight,
    manager: { coercedColumns, activeTab, updateActiveTab }
  } = useContext(DataTableContext);
  const [_, dropRef] = useDrop(
    () => ({
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
    }),
    [coercedColumns, activeTab, updateActiveTab]
  );
  return (
    <TableRow
      key="head"
      ref={dropRef}
      kind="head"
      style={{
        zIndex: 1,
        height: rowHeight,
        position: 'sticky',
        top: 0,
        width: `max(${getRowWidth(coercedColumns)}px, 100%)`,
        whiteSpace: 'nowrap'
      }}
    >
      {coercedColumns.map((v, i) => (
        <Fragment>
          <TableCell
            key={v.key + '-head'}
            style={{
              display: 'inline-block',
              width: getColumnWidth(v) + 'px'
            }}
          >
            {v.header}
          </TableCell>
          <Handle key={v.key + '-handle'} index={i} />
        </Fragment>
      ))}
    </TableRow>
  );
};
