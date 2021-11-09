import { jsx } from '@theme-ui/core';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { Box, useThemed } from 'restyler';
import { DataTableProps } from '../../models';
import { getColumnWidth, getRowWidth } from '../../utils';
import { DataTableContext } from './DataTableContext';
import { Header } from './Header';
import { LoaderRow } from './LoaderRow';
import { Toolbar } from './Toolbar';

export const DataTable = <T extends object>({
  manager,
  manager: { data, coercedColumns, hasNextChunk },
  getRowProps,
  ...rest
}: DataTableProps<T>) => {
  const Table = useThemed('div', 'dataTable');
  const TableBody = useThemed('div', 'dataTable.body');
  const TableRow = useThemed('div', 'dataTable.row');
  const TableCell = useThemed('div', 'dataTable.cell');

  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const rowHeight = 56; // FIXME
  useEffect(() => {
    if (!element) {
      return;
    }
    const updateHeight = () => setHeight(element.clientHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  const renderRow = useCallback(
    ({ index, style }) => {
      const width = `max(${getRowWidth(coercedColumns)}px, 100%)`;
      if (index === data.length) {
        return <LoaderRow style={{ ...style, width }} />;
      }
      const datum = data[index] ?? {};
      const { onClick, ...rest } = getRowProps?.(datum, index) ?? {};
      return (
        <TableRow
          style={{
            ...style,
            width,
            top: `${parseFloat(style.top) + rowHeight}px`,
            cursor: onClick ? 'pointer' : undefined
          }}
          onClick={onClick}
          {...rest}
        >
          {coercedColumns.map(v => {
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
    [coercedColumns, data]
  );

  const innerElementType = useMemo(
    () =>
      forwardRef<HTMLDivElement>(({ children, ...rest }, ref) => (
        <div ref={ref} {...rest}>
          <Header />
          {children}
        </div>
      )),
    [coercedColumns]
  );

  const bodyContent = useMemo(
    () => (
      <FixedSizeList
        height={height ? height - rowHeight : 300}
        innerElementType={innerElementType}
        itemCount={hasNextChunk ? data.length + 1 : data.length}
        itemSize={rowHeight}
        overscanCount={5}
        width="100%"
      >
        {renderRow}
      </FixedSizeList>
    ),
    [height, data, renderRow, hasNextChunk]
  );

  const contextValue = useMemo(() => ({ manager }), [manager]);

  return (
    <Box ref={setElement} {...rest}>
      <DataTableContext.Provider value={contextValue}>
        <Toolbar sx={{ height: rowHeight }} />
        <Table>
          <TableBody>{bodyContent}</TableBody>
        </Table>
      </DataTableContext.Provider>
    </Box>
  );
};
