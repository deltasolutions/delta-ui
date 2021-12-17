import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd';
import { HiOutlineArrowNarrowUp } from 'react-icons/hi';
import { ButtonProps, useSharedRef, useThemedFactory } from 'restyler';
import { DataTableContext } from '../..';
import { getTabImageUri } from '../../../../utils';

export interface ItemProps extends ButtonProps {
  index?: number;
  isActive?: boolean;
}

export const Item = ({ index, isActive, children, ...rest }: ItemProps) => {
  const useTypedThemed = useThemedFactory<{ isActive?: boolean }>();
  const ThemedItem = useTypedThemed('button', 'dataTable.tabs.item');
  const ThemedItemContent = useTypedThemed(
    'div',
    'dataTable.tabs.item.content'
  );
  const ThemedItemDropIcon = useTypedThemed(
    'div',
    'dataTable.tabs.item.dropIcon'
  );
  const {
    manager: { layout, setLayout }
  } = useContext(DataTableContext);
  const isTab = index !== undefined;
  const [isDragging, dragRef, connectPreview] = useDrag(
    () => ({
      canDrag: isActive && isTab,
      type: 'tab',
      item: { index },
      collect: monitor => monitor.isDragging()
    }),
    [isActive, index, isTab]
  );
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: 'tab',
      canDrop: toBeDropped => toBeDropped.index !== index,
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      }),
      drop: (dropped: { index: number }) => {
        if (index === undefined) {
          return;
        }
        const droppedTab = layout.tabs[dropped.index];
        const splitIndex = index + 1;
        const left = layout.tabs.slice(0, splitIndex);
        const right = layout.tabs.slice(splitIndex);
        const nextTabs = [...left, droppedTab, ...right];
        const formerIndex =
          index < dropped.index ? dropped.index + 1 : dropped.index;
        nextTabs.splice(formerIndex, 1);
        setLayout({
          ...layout,
          tabs: nextTabs
        });
      }
    }),
    [layout, index]
  );
  const sharedRef = useSharedRef<HTMLButtonElement>(null, [dragRef, dropRef]);
  return (
    <ThemedItem
      ref={sharedRef}
      isActive={isActive}
      sx={{ opacity: isDragging ? 0.5 : 1 }}
      {...rest}
    >
      <ThemedItemContent>
        <DragPreviewImage src={getTabImageUri()} connect={connectPreview} />
        {children}
      </ThemedItemContent>
      {isOver && canDrop && (
        <ThemedItemDropIcon>
          <HiOutlineArrowNarrowUp />
        </ThemedItemDropIcon>
      )}
    </ThemedItem>
  );
};
