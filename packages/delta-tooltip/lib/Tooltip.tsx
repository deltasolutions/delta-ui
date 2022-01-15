import { jsx } from '@theme-ui/core';
import Tippy, { TippyProps } from '@tippyjs/react';
import { useThemed } from 'restyler';

// TODO: Remove and use theme styles. When CSS files
// will be removed from target build, one should
// enable source maps in package.json#tsup.
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';

export interface TooltipProps extends TippyProps {}

export const Tooltip = ({ content, ...rest }: TooltipProps) => {
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
