import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IoMove } from 'react-icons/io5';
import { Box, Button, useThemed } from 'restyler';
import { DataTableColumnOptions } from '../../../../models';

export const itemType = Symbol('columnsEditorItem');

export interface ItemOptions extends DataTableColumnOptions<object> {
  id: string;
}

export interface ItemProps {
  options: ItemOptions;
  index: number;
  traverseDirection?: 'left' | 'right';
  onTraverse?: (item: ItemOptions) => void;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
}

export const Item = ({
  options,
  index,
  traverseDirection = 'right',
  onTraverse,
  onMove
}: ItemProps) => {
  const ThemedItem = useThemed(
    'div',
    'dataTable.toolbar.columnsEditor.list.item'
  );
  const ThemedItemContent = useThemed(
    'div',
    'dataTable.toolbar.columnsEditor.list.item.content'
  );
  const ref = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const [_, drop] = useDrop<Pick<ItemProps, 'options' | 'index'>, void, void>({
    accept: itemType,
    hover(item, monitor) {
      if (!ref.current || !onMove) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset?.y! - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });
  const [{ isDragging }, drag, dragPreview] = useDrag(
    {
      type: itemType,
      canDrag: !!onMove,
      item: () => ({ options, index }),
      collect: (monitor: any) => ({ isDragging: monitor.isDragging() })
    },
    [!!onMove, options, index]
  );
  dragPreview(drop(ref));
  drag(handleRef);
  return (
    <ThemedItem
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: traverseDirection === 'right' ? 'e-resize' : 'w-resize'
      }}
      onClick={() => onTraverse?.(options)}
    >
      <Tooltip content={options.description} disabled={!options.description}>
        <ThemedItemContent>{options.header ?? options.key}</ThemedItemContent>
      </Tooltip>
      {onMove && (
        <Button ref={handleRef} kind="icon" sx={{ cursor: 'move' }}>
          <IoMove />
        </Button>
      )}
    </ThemedItem>
  );
};
