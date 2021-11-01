import { jsx } from '@theme-ui/core';
import { useDragLayer } from 'react-dnd';

export interface RulerProps {
  offset: number;
}

export const Ruler = ({ offset }: RulerProps) => {
  const { itemType, isDragging, mouseX } = useDragLayer(monitor => ({
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    mouseX: monitor.getClientOffset()?.x ?? 0
  }));
  if (!isDragging || itemType !== 'resizer') {
    return null;
  }
  return (
    <div
      style={{
        transform: `translateX(${mouseX + offset + 'px'})`
      }}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: '100vh',
        borderRight: '2px dashed',
        borderRightColor: 'primary',
        pointerEvents: 'none',
        willChange: 'transform'
      }}
    />
  );
};
