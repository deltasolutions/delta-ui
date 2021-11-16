import { jsx } from '@theme-ui/core';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';
import { useThemed } from 'restyler';
import { DataTableProps } from '../../models';
import { getRowWidth } from '../../utils';
import { DataRow } from './DataRow';
import { DataTableContext } from './DataTableContext';
import { EmptyRow } from './EmptyRow';
import { Header } from './Header';
import { LoaderRow } from './LoaderRow';
import { Toolbar } from './Toolbar';

export const DataTable = <T extends object>({
  getRowProps,
  isHeightAdaptive,
  toolbar,
  manager,
  manager: {
    layout: { maxRowCount = 5 },
    coercedColumns,
    data,
    hasNextChunk
  },
  ...rest
}: DataTableProps<T>) => {
  const Table = useThemed('div', 'dataTable');
  const TableContent = useThemed('div', 'dataTable.content');

  const rowHeight = 56; // FIXME
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(200);
  useEffect(() => {
    if (!container) {
      return;
    }
    const updateHeight = () => setContainerHeight(container.clientHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(container);
    return () => observer.disconnect();
  }, [container]);

  const renderRow = useCallback(
    ({ index, style }) => {
      const width = `max(${getRowWidth(coercedColumns)}px, 100%)`;
      const top = `${parseFloat(style.top) + rowHeight}px`;
      if (data.length === 0) {
        return <EmptyRow style={{ ...style, top, width }} />;
      }
      if (index === data.length) {
        return <LoaderRow style={{ ...style, top, width }} />;
      }
      return <DataRow index={index} style={{ ...style, top, width }} />;
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

  const rows = useMemo(
    () => (
      <FixedSizeList
        height={
          isHeightAdaptive
            ? containerHeight - rowHeight
            : ((data.length <= maxRowCount
                ? Math.max(data.length, 1)
                : maxRowCount) +
                1) *
              rowHeight
        }
        innerElementType={innerElementType}
        itemCount={Math.max(data.length, 1) + (hasNextChunk ? 1 : 0)}
        itemSize={rowHeight}
        overscanCount={5}
        width="100%"
      >
        {renderRow}
      </FixedSizeList>
    ),
    [
      isHeightAdaptive,
      maxRowCount,
      containerHeight,
      data,
      renderRow,
      hasNextChunk
    ]
  );

  const contextValue = {
    getRowProps,
    isHeightAdaptive,
    toolbar,
    manager
  };
  const memoizedContextValue = useMemo(
    () => contextValue,
    Object.values(contextValue)
  );

  return (
    <DataTableContext.Provider value={memoizedContextValue}>
      <Table ref={setContainer} {...rest}>
        <Toolbar sx={{ height: rowHeight }} />
        <TableContent>{rows}</TableContent>
      </Table>
    </DataTableContext.Provider>
  );
};
