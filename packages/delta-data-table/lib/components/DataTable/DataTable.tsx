import { jsx } from '@theme-ui/core';
import { forwardRef, ReactElement, Ref, useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { useThemed } from 'restyler';
import { DataTableProps } from '../../models';
import { getRowWidth } from '../../utils';
import { DataRow } from './DataRow';
import { DataTableContext } from './DataTableContext';
import { EmptyRow } from './EmptyRow';
import { InnerContainer } from './InnerContainer';
import { LoaderRow } from './LoaderRow';
import { Ruler } from './Ruler';
import { Toolbar } from './Toolbar';
import { useOuterContainer } from './useOuterContainer';
import { useRowHeight } from './useRowHeight';

const UntypedDataTable = forwardRef<FixedSizeList, DataTableProps<object>>(
  (
    {
      getRowProps,
      rowHeight: forcedRowHeight,
      maxHeight,
      toolbar,
      manager,
      manager: {
        layout: { maxRowCount = 5 },
        coercedColumns,
        data,
        hasNextChunk
      },
      ...rest
    },
    ref
  ) => {
    const Table = useThemed('div', 'dataTable');
    const TableContent = useThemed('div', 'dataTable.content');
    const rowHeight = useRowHeight({ forcedRowHeight });
    const [OuterContainer, scrollbarHeight] = useOuterContainer();
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
      [coercedColumns, rowHeight, data]
    );
    // Determine the count of rows that are rendered
    // dynamically by react-window. This list excludes
    // the header since it is added in InnerContainer directly.
    const listRowCount =
      data.length +
      // Reserving space for either loader or empty row.
      (hasNextChunk || data.length === 0 ? 1 : 0);
    // Reserving space for header anyways.
    const listReservedHeight = rowHeight;
    // Combining reserved height with dynamically
    // rendered rows height and scrollbar height.
    let listHeight = maxHeight
      ? Math.min(
          maxHeight - (toolbar ? rowHeight : 0),
          listReservedHeight + scrollbarHeight + listRowCount * rowHeight
        )
      : listReservedHeight +
        scrollbarHeight +
        Math.min(listRowCount, maxRowCount) * rowHeight;
    const rows = useMemo(
      () => (
        <FixedSizeList
          ref={ref}
          height={listHeight}
          outerElementType={OuterContainer}
          innerElementType={InnerContainer}
          itemCount={listRowCount}
          itemSize={rowHeight}
          overscanCount={5}
          width="100%"
        >
          {renderRow}
        </FixedSizeList>
      ),
      [ref, listHeight, OuterContainer, listRowCount, rowHeight, renderRow]
    );
    const contextValue = {
      manager,
      rowHeight,
      maxHeight,
      toolbar,
      getRowProps
    };
    const memoizedContextValue = useMemo(
      () => contextValue,
      Object.values(contextValue)
    );
    return (
      <DataTableContext.Provider value={memoizedContextValue}>
        <Table {...rest}>
          <Toolbar sx={{ height: rowHeight }} />
          <TableContent>
            {rows}
            <Ruler />
          </TableContent>
        </Table>
      </DataTableContext.Provider>
    );
  }
);

export const DataTable = UntypedDataTable as <T extends object>(
  props: DataTableProps<T> & { ref?: Ref<FixedSizeList> }
) => ReactElement;
