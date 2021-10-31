import { forwardRef, useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { Box, useThemed } from 'restyler';
import { jsx } from 'theme-ui';
import { DataTableContext } from './DataTableContext';
import { Header } from './Header';
import { Toolbar } from './Toolbar';
import { DataTableProps } from './types';
import { useCoercedColumns } from './useCoercedColumns';
import { useLayoutManager } from './useLayoutManager';
import { useTabManager } from './useTabManager';
import { getColumnWidth, getRowWidth } from './utils';

export const DataTable = <T extends object>({
  height,
  columns: originalColumns,
  data,
  getRowProps,
  onDownload,
  ...rest
}: DataTableProps<T>) => {
  const Table = useThemed('div', 'table');
  const TableBody = useThemed('div', 'table.body');
  const TableRow = useThemed('div', 'table.row');
  const TableCell = useThemed('div', 'table.cell');

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
            width: getRowWidth(columns) + 'px'
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
        <Toolbar sx={{ height: rowHeight }} onDownload={onDownload} />
        <Table>
          <TableBody>{bodyContent}</TableBody>
        </Table>
      </DataTableContext.Provider>
    </Box>
  );
};

const rowHeight = 56;
