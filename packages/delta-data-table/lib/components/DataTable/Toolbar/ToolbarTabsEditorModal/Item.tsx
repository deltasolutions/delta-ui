import { jsx } from '@theme-ui/core';
import { Tooltip } from 'delta-tooltip';
import { t } from 'i18next';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { IoMove, IoRemoveCircleOutline } from 'react-icons/io5';
import { Box, Button, Input, useThemed } from 'restyler';
import { DataTableTabDef } from '../../../../models';

const itemType = Symbol('tabsEditorItem');

export interface ItemDef extends DataTableTabDef {
  id: string;
}

export interface ItemProps {
  def: ItemDef;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onRemove?: () => void;
  onRename?: (v: string) => void;
}

export const Item = ({ def, index, onMove, onRemove, onRename }: ItemProps) => {
  const [t] = useTranslation('common');
  const ThemedItem = useThemed('div', 'dataTable.toolbar.tabsEditor.list.item');
  const ref = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const [_, drop] = useDrop<Pick<ItemProps, 'def' | 'index'>, void, void>({
    accept: itemType,
    hover(item, monitor) {
      if (!ref.current) {
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
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: itemType,
    item: () => {
      return { def, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });
  dragPreview(drop(ref));
  drag(handleRef);
  return (
    <ThemedItem ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
      <Input value={def.name} onChange={onRename} />
      <Button ref={handleRef} kind="icon" sx={{ cursor: 'move' }}>
        <IoMove />
      </Button>
      {onRemove && (
        <Tooltip content={t('actions.remove')}>
          <Button kind="icon" onClick={onRemove}>
            <IoRemoveCircleOutline />
          </Button>
        </Tooltip>
      )}
    </ThemedItem>
  );
};
