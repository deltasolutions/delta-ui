import { jsx } from '@theme-ui/core';
import { forwardRef, useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { Box, useThemed } from 'restyler';
import { useCoercedColumns } from '../../hooks';
import { DataTableProps } from '../../models';
import { getColumnWidth, getRowWidth } from '../../utils';
import { DataTableContext } from './DataTableContext';
import { Header } from './Header';
import { Toolbar } from './Toolbar';

export const DataTable = <T extends object>({
  columns: originalColumns,
  data,
  getRowProps,
  ...rest
}: DataTableProps<T>) => {
  const Table = useThemed('div', 'dataTable');
  const TableBody = useThemed('div', 'dataTable.body');
  const TableRow = useThemed('div', 'dataTable.row');
  const TableCell = useThemed('div', 'dataTable.cell');

  const layoutManager = useLayoutManager();
  const tabManager = useTabManager({ layoutManager });
  const columns = useCoercedColumns(originalColumns, {
    tab: tabManager.activeTab
  });

  const renderRow = useCallback(
    ({ index, style }) => {
      const datum = data[index] ?? {};
      const { onClick, ...rest } = getRowProps?.(datum, index) ?? {};
      return (
        <TableRow
          style={{
            ...style,
            cursor: onClick ? 'pointer' : undefined,
            width: `max(${getRowWidth(columns)}px, 100%)`
          }}
          onClick={onClick}
          {...rest}
        >
          {columns.map(v => {
            return (
              <TableCell
                key={v.key}
                style={{
                  display: 'inline-block',
                  width: getColumnWidth(v) + 'px'
                }}
              >
                {datum[v.key]}
              </TableCell>
            );
          })}
        </TableRow>
      );
    },
    [columns, data]
  );

  const innerElementType = useMemo(
    () =>
      forwardRef<HTMLDivElement>(({ children, ...rest }, ref) => (
        <div ref={ref} {...rest}>
          <Header />
          {children}
        </div>
      )),
    [columns]
  );

  const height = 400; // FIXME
  const rowHeight = 56; // FIXME
  const bodyContent = useMemo(
    () => (
      <FixedSizeList
        height={height ? height - rowHeight : 300}
        innerElementType={innerElementType}
        itemCount={data.length}
        itemSize={rowHeight}
        overscanCount={5}
        width="100%"
      >
        {renderRow}
      </FixedSizeList>
    ),
    [height, data, renderRow]
  );

  return (
    <Box {...rest}>
      <DataTableContext.Provider
        value={{ ...layoutManager, ...tabManager, originalColumns, columns }}
      >
        <Toolbar sx={{ height: rowHeight }} />
        <Table>
          <TableBody>{bodyContent}</TableBody>
        </Table>
      </DataTableContext.Provider>
    </Box>
  );
};
