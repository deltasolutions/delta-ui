import { jsx } from '@theme-ui/core';
import { useMemo, useState } from 'react';
import { useDragLayer } from 'react-dnd';

export const Ruler = () => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const { shouldRender, mouseX } = useDragLayer(monitor => ({
    shouldRender: monitor.isDragging() && monitor.getItemType() === 'resizer',
    mouseX: monitor.getClientOffset()?.x ?? 0
  }));
  const offset = useMemo(() => {
    if (!shouldRender || !element) {
      return 0;
    }
    let offset = 0;
    let it: HTMLElement | null = element;
    while (it) {
      if (it.style.position === 'relative') {
        const rect = it.getBoundingClientRect();
        offset -= rect.left - it.scrollLeft;
      }
      it = it.parentElement;
    }
    return offset;
  }, [shouldRender, element]);
  if (!shouldRender) {
    return null;
  }
  return (
    <div
      ref={setElement}
      style={{
        transform: `translateX(${mouseX + offset + 'px'})`
      }}
      sx={{
        zIndex: 2,
        position: 'fixed',
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
