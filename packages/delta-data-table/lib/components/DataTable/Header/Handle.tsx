import { jsx } from '@theme-ui/core';
import { useContext, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { HiOutlineArrowNarrowUp } from 'react-icons/hi';
import { MdDragHandle } from 'react-icons/md';
import { BoxProps, useSharedRef, useThemed } from 'restyler';
import { DataTableContext } from '../DataTableContext';

export interface HandleProps extends BoxProps {
  index: number;
}

export const Handle = ({ index }: HandleProps) => {
  const Handle = useThemed('div', 'dataTable.handle');
  const HandleIcon = useThemed('div', 'dataTable.handle.icon');
  const HandleDropIcon = useThemed('div', 'dataTable.handle.dropIcon');
  const {
    manager: {
      columns,
      coercedColumns,
      activeTab: { columnExclusions = [] },
      updateActiveTab
    }
  } = useContext(DataTableContext);
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: 'column',
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      }),
      drop: (dropped: { index?: number; exclusion?: string }) => {
        const keySet = new Set(columns.map(v => v.key));
        const keys = coercedColumns.map(v => v.key);
        const splitIndex = index + 1;
        const left = keys.slice(0, splitIndex);
        const right = keys.slice(splitIndex);
        const droppedKey = (dropped.exclusion ??
          coercedColumns[dropped.index ?? -1].key)!;
        const columnOrder = [...left, droppedKey, ...right].filter(v =>
          keySet.has(v)
        );
        if (dropped.index !== undefined) {
          const formerIndex =
            index < dropped.index ? dropped.index + 1 : dropped.index;
          columnOrder.splice(formerIndex, 1);
        }
        updateActiveTab({
          columnOrder,
          columnExclusions: columnExclusions.filter(
            v => v !== dropped.exclusion
          )
        });
      }
    }),
    [index, columns, coercedColumns, columnExclusions, updateActiveTab]
  );
  const [_, dragRef, dragPreviewRef] = useDrag(
    () => ({
      type: 'resizer',
      item: { index }
    }),
    [index]
  );
  const sharedRef = useSharedRef<HTMLDivElement>(null, [dragRef, dropRef]);
  useEffect(() => {
    dragPreviewRef(getEmptyImage(), { captureDraggingState: true });
  }, []);
  return (
    <Handle ref={sharedRef}>
      <HandleIcon>
        <MdDragHandle />
      </HandleIcon>
      {isOver && canDrop && (
        <HandleDropIcon>
          <HiOutlineArrowNarrowUp />
        </HandleDropIcon>
      )}
    </Handle>
  );
};
