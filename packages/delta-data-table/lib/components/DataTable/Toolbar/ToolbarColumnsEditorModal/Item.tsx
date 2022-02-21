import { jsx } from '@theme-ui/core';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useThemed } from 'restyler';
import { DataTableColumnOptions } from '../../../../models';

export const itemType = Symbol('columnsEditorItem');

export interface ItemOptions extends DataTableColumnOptions<object> {
  id: string;
}

export interface ItemProps {
  options: ItemOptions;
  index: number;
  onMove?: (dragIndex: number, hoverIndex: number) => void;
}

export const Item = ({ options: options, index, onMove }: ItemProps) => {
  const ThemedItem = useThemed('div', 'dataTable.columnsEditor.list.item');
  const ref = useRef<HTMLDivElement>(null);
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
  const [{ isDragging }, drag] = useDrag({
    type: itemType,
    item: () => {
      return { options, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(drop(ref));
  return (
    <ThemedItem ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
      {options.header ?? options.key}
    </ThemedItem>
  );
};
