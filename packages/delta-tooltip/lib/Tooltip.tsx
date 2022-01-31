import { jsx } from '@theme-ui/core';
import Tippy, { TippyProps } from '@tippyjs/react';
import { useContext } from 'react';
import { SystemContext, useIsomorphicLayoutEffect, useThemed } from 'restyler';

// TODO: Remove and use theme styles. When CSS files
// will be removed from target build, one should
// enable source maps in package.json#tsup.
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';

let appendTo: Element | undefined;

export interface TooltipProps extends TippyProps {}

export const Tooltip = ({ content, ...rest }: TooltipProps) => {
  const ThemedTooltipContent = useThemed('div', 'tooltip.content');
  const {
    defaults: { standaloneTransitionOptions: { portal = undefined } = {} } = {}
  } = useContext(SystemContext);
  useIsomorphicLayoutEffect(() => {
    if (appendTo || !portal) {
      return;
    }
    portal.push(
      <div
        id="tooltips-container"
        key="tooltips-container"
        ref={v => v && (appendTo = v)}
      />
    );
  }, [portal]);
  return (
    <Tippy
      appendTo={appendTo}
      animation="shift-away"
      content={<ThemedTooltipContent>{content}</ThemedTooltipContent>}
      {...rest}
    />
  );
};

Tooltip.displayName = 'Tooltip';
