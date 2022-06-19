import { jsx } from '@theme-ui/core';
import {
  createContext,
  forwardRef,
  HTMLAttributes,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIsomorphicLayoutEffect } from '../../../hooks';
import { mergeRefs } from '../../../utils';

export const TableHeaderContext = createContext({
  sticked: false,
});

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>((props, ref) => {
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
    const observer = new IntersectionObserver(
      ([ev]) => {
        const sticked = ev.intersectionRatio < 1;
        setSticked(sticked);
      },
      { threshold: [1] }
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
          // The top value needs to be -1px or the element
          // will never intersect with the top of the window.
          top: '-1px',
          boxShadow: sticked ? 2 : 'none',
        }}
        {...props}
      />
    </TableHeaderContext.Provider>
  );
});
