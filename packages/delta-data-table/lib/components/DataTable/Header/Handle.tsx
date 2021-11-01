import { useCallback, useContext, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { HiOutlineArrowNarrowUp } from 'react-icons/hi';
import { MdDragHandle } from 'react-icons/md';
import { Box, BoxProps, useSharedRef } from 'restyler';
import { DataTableContext } from '../DataTableContext';

export interface HandleProps extends BoxProps {
  index: number;
}

export const Handle = ({ index }: HandleProps) => {
  const {
    columns,
    activeTab: { columnExclusions = [] },
    updateActiveTab
  } = useContext(DataTableContext);
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: 'column',
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      }),
      drop: (dropped: { index?: number; exclusion?: string }) => {
        const splitIndex = index + 1;
        const keys = columns.map(v => v.key);
        const left = keys.slice(0, splitIndex);
        const right = keys.slice(splitIndex);
        const droppedKey = (dropped.exclusion ??
          columns[dropped.index ?? -1].key)!;
        const columnOrder = [...left, droppedKey, ...right];
        if (dropped.index) {
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
    [columns, columnExclusions, updateActiveTab]
  );
  const [_, dragRef, dragPreviewRef] = useDrag(() => ({
    type: 'resizer',
    item: { index }
  }));
  const sharedRef = useSharedRef<HTMLDivElement>(null, [dragRef, dropRef]);
  useEffect(() => {
    dragPreviewRef(getEmptyImage(), { captureDraggingState: true });
  }, []);
  return (
    <Box
      ref={sharedRef}
      sx={{
        position: 'relative',
        zIndex: 1,
        display: 'inline-block',
        marginLeft: '-1em',
        marginRight: '-1em',
        width: '2em',
        height: '3em',
        verticalAlign: 'middle',
        background: 'transparent',
        color: 'onSurface',
        cursor: 'col-resize',
        '&:hover': {
          color: 'primary'
        }
      }}
    >
      <MdDragHandle
        sx={{
          width: '1.5em',
          height: '1.5em',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(90deg)'
        }}
      />
      {isOver && canDrop && (
        <HiOutlineArrowNarrowUp
          sx={{
            width: '2em',
            height: '2em',
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, 1em)',
            color: 'primary'
          }}
        />
      )}
    </Box>
  );
};
