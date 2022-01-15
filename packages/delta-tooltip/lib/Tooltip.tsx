import { jsx } from '@theme-ui/core';
import Tippy, { TippyProps } from '@tippyjs/react';
import { useThemed } from 'restyler';

// TODO: Remove and use theme styles.
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';

export const Tooltip = ({ content, ...rest }: TippyProps) => {
  const ThemedTooltipContent = useThemed('div', 'tooltip.content');
  return (
    <Tippy
      appendTo="parent"
      animation="shift-away"
      content={<ThemedTooltipContent>{content}</ThemedTooltipContent>}
      {...rest}
    />
  );
};

Tooltip.displayName = 'Tooltip';
