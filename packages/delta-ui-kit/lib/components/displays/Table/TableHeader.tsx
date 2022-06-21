import { jsx } from '@theme-ui/core';
import {
  createContext,
  forwardRef,
  HTMLAttributes,
  useMemo,
  useState,
} from 'react';
import { useIsomorphicLayoutEffect } from '../../../hooks';
import { mergeRefs } from '../../../utils';

export const TableHeaderContext = createContext({
  sticked: false,
});

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  stickyOffset?: number;
}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ stickyOffset = 0, ...rest }, ref) => {
  const [element, setElement] = useState<HTMLTableSectionElement | null>(null);
  const mergedRef = useMemo(
    () => mergeRefs([ref, setElement]),
    [ref, setElement]
  );
  const [sticked, setSticked] = useState(false);
  const contextValue = useMemo(() => ({ sticked }), [sticked]);
  useIsomorphicLayoutEffect(() => {
    if (!element) {
      return;
    }
    const frameOffset = window.frameElement?.getBoundingClientRect().y ?? 0;
    const observer = new IntersectionObserver(
      ([ev]) => {
        const sticked = ev.intersectionRatio < 1;
        setSticked(sticked);
      },
      {
        rootMargin: `-${stickyOffset + frameOffset + 1}px 1000px 1000px 1000px`,
        threshold: [1],
      }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return (
    <TableHeaderContext.Provider value={contextValue}>
      <thead
        ref={mergedRef}
        role="thead"
        sx={{
          position: 'sticky',
          top: `${stickyOffset}px`,
          ...(sticked && {
            '& > tr > th': {
              borderBottom: '1px rgba(255,255,255,0.1) solid',
            },
          }),
          backgroundColor: 'accentContext',
          borderBottom: '1px red solid',
          color: 'onContext',
          transition: 'background-color 0.1s linear, box-shadow 0.1s linear',
        }}
        {...rest}
      />
    </TableHeaderContext.Provider>
  );
});
