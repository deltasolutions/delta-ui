import { jsx } from '@theme-ui/core';
import Tippy, { TippyProps } from '@tippyjs/react';
import { createRef, RefObject, useContext } from 'react';
import { SystemContext, useIsomorphicLayoutEffect, useThemed } from 'restyler';

// TODO: Remove and use theme styles. When CSS files
// will be removed from target build, one should
// enable source maps in package.json#tsup.
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';

let appendTo: RefObject<HTMLDivElement> | undefined;

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
    appendTo = createRef<HTMLDivElement>();
    portal.push(
      <div id="tooltips-container" key="tooltips-container" ref={appendTo} />
    );
  }, [portal]);
  return (
    <Tippy
      animation="shift-away"
      content={<ThemedTooltipContent>{content}</ThemedTooltipContent>}
      {...(appendTo?.current ? { appendTo: appendTo.current } : {})}
      {...rest}
    />
  );
};

Tooltip.displayName = 'Tooltip';
