import { jsx } from '@theme-ui/core';
import { useContext, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { MdDragHandle } from 'react-icons/md';
import { BoxProps, useSharedRef, useThemed } from 'restyler';
import { DataTableContext } from '../DataTableContext';

export interface HandleProps extends BoxProps {
  index: number;
}

export const Handle = ({ index }: HandleProps) => {
  const Handle = useThemed('div', 'dataTable.handle');
  const HandleIcon = useThemed('div', 'dataTable.handle.icon');
  const {
    manager: {
      // ...
    }
  } = useContext(DataTableContext);
  const [_, dragRef, dragPreviewRef] = useDrag(
    () => ({
      type: 'resizer',
      item: { index }
    }),
    [index]
  );
  const sharedRef = useSharedRef<HTMLDivElement>(null, [dragRef]);
  useEffect(() => {
    dragPreviewRef(getEmptyImage(), { captureDraggingState: true });
  }, []);
  return (
    <Handle ref={sharedRef}>
      <HandleIcon>
        <MdDragHandle />
      </HandleIcon>
    </Handle>
  );
};
