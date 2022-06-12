import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  HTMLAttributes,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { mergeRefs } from '../../../utils';

export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  stickyOffset: number;
}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ stickyOffset, ...rest }, propsRef) => {
  const ref = useRef<HTMLTableSectionElement>(null);
  const mergedRef = useMemo(() => mergeRefs([ref, propsRef]), [ref, propsRef]);
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(
      ([e]) => {
        return e.target.classList.toggle(
          'active-sticky-header',
          e.intersectionRatio < 1
        );
      },
      {
        rootMargin: `-${stickyOffset + 1}px 1000px 1000px 1000px`,
        threshold: [1],
      }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref.current]);
  return (
    <thead
      ref={mergedRef}
      role="thead"
      sx={{ position: 'sticky', top: `${stickyOffset}px` }}
      {...rest}
    />
  );
});
