import { jsx } from '@theme-ui/core';
import { Children, forwardRef, HTMLAttributes, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { GridAxisOptions, useGrid } from '../../hooks';
import { getChildrenKey, mergeRefs } from '../../utils';
import { Box } from './Box';

export interface MasonryProps extends HTMLAttributes<HTMLDivElement> {
  columns: GridAxisOptions & {
    getProps?: (options: {
      index: number;
    }) => Omit<HTMLAttributes<HTMLDivElement>, 'children'>;
  };
}

export const Masonry = forwardRef<HTMLDivElement, MasonryProps>(
  ({ columns, children, ...rest }, ref) => {
    const { style, columnsCount, handleElement, canUpdate } = useGrid<
      HTMLDivElement,
      { canUpdate: boolean }
    >({
      columns,
      getExtras: container => ({ canUpdate: !!container }),
    });
    const mergedRef = useMemo(
      () => mergeRefs([ref, handleElement]),
      [handleElement]
    );
    const entries = useMemo(
      () =>
        canUpdate
          ? Children.map(children, (v, i) => {
              const container = document.createElement('div');
              const portal = createPortal(v, container, i.toString());
              return { container, portal };
            }) ?? []
          : // If masonry container is not defined, then grid is not
            // initialized yet, so we should not prepare wraps
            // for masonry items. This might be helpful for SSR.
            [],
      [canUpdate, getChildrenKey(children)]
    );
    const columnChildren = useMemo(() => {
      if (!columnsCount) {
        return [];
      }
      let mountedCount = 0;
      const elements = new Array(columnsCount).fill(
        null as HTMLDivElement | null
      );
      return elements.map((_, i) => {
        const { style, ...restProps } = columns.getProps?.({ index: i }) ?? {};
        return (
          <Box
            key={i}
            ref={(element: HTMLDivElement | null) => {
              if (element) {
                elements[i] = element;
                if (++mountedCount === columnsCount) {
                  const heights = new Array(elements.length).fill(0);
                  entries.forEach(({ container }) => {
                    const targetIndex = heights.indexOf(Math.min(...heights));
                    elements[targetIndex]!.appendChild(container);
                    heights[targetIndex] = elements[targetIndex]!.offsetHeight;
                  });
                }
              } else {
                elements.forEach(v => {
                  while (v && v.firstChild) {
                    v.removeChild(v.firstChild);
                  }
                });
              }
            }}
            style={{ ...style, display: 'flex', flexDirection: 'column' }}
            {...restProps}
          />
        );
      });
    }, [columns, columnsCount, entries]);
    return (
      <Box ref={mergedRef} style={{ ...style, alignItems: 'start' }} {...rest}>
        {entries.map(v => v.portal)}
        {columnChildren}
      </Box>
    );
  }
);
