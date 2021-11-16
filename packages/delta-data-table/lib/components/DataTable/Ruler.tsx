import { jsx } from '@theme-ui/core';
import { useMemo, useState } from 'react';
import { useDragLayer } from 'react-dnd';
import { useThemed } from 'restyler';

export const Ruler = () => {
  const Themed = useThemed('div', 'dataTable.ruler');
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const { shouldRender, mouseX } = useDragLayer(monitor => ({
    shouldRender: monitor.isDragging() && monitor.getItemType() === 'resizer',
    mouseX: monitor.getClientOffset()?.x ?? 0
  }));
  const offset = useMemo(() => {
    if (!shouldRender || !element || !element.parentElement) {
      return 0;
    }
    return -element.parentElement.getBoundingClientRect().left;
  }, [shouldRender, element]);
  if (!shouldRender) {
    return null;
  }
  return (
    <Themed
      ref={setElement}
      style={{
        transform: `translateX(${mouseX + offset + 'px'})`,
        willChange: 'transform'
      }}
    />
  );
};
