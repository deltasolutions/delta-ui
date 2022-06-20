import { jsx } from '@theme-ui/core';
import { lighten } from 'polished';
import {
  createContext,
  forwardRef,
  HTMLAttributes,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDeltaTheme, useIsomorphicLayoutEffect } from '../../../hooks';
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
  const { colors } = useDeltaTheme();
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
    const handleSticked = () => {
      setSticked(element.offsetTop - stickyOffset <= window.scrollY);
    };
    handleSticked();
    addEventListener('scroll', handleSticked);
    return () => removeEventListener('scroll', handleSticked);
    // TODO: Consider using IntersectionObserver.
    // The following implementation is broken.
    // const observer = new IntersectionObserver(
    //   ([ev]) => {
    //     const sticked = ev.intersectionRatio < 1;
    //     setSticked(sticked);
    //   },
    //   {
    //     rootMargin: `-${stickyOffset + 1}px 0px 0px 0px`,
    //     threshold: [1],
    //   }
    // );
    // observer.observe(element);
    // return () => observer.disconnect();
  }, [element]);

  return (
    <TableHeaderContext.Provider value={contextValue}>
      <thead
        ref={mergedRef}
        role="thead"
        sx={{
          position: 'sticky',
          top: `${stickyOffset}px`,
          boxShadow: sticked ? 1 : 'none',
          backgroundColor: sticked
            ? lighten(0.05, colors.accentContext)
            : 'accentContext',
          color: 'onContext',
          transition: 'background-color 0.1s linear, box-shadow 0.1s linear',
        }}
        {...rest}
      />
    </TableHeaderContext.Provider>
  );
});
