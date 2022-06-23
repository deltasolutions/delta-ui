import { jsx } from '@theme-ui/core';
import { createContext, forwardRef, HTMLAttributes, useMemo } from 'react';
import { useSticked } from '../../../hooks';
import { mergeRefs } from '../../../utils';
import { useTableAccentContextColor } from './useTableAccentContextColor';

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
  const [sticked, setElement] = useSticked(stickyOffset);
  const mergedRef = useMemo(
    () => mergeRefs([ref, setElement]),
    [ref, setElement]
  );
  const contextValue = useMemo(() => ({ sticked }), [sticked]);
  const backgroundColor = useTableAccentContextColor();
  return (
    <TableHeaderContext.Provider value={contextValue}>
      <thead
        ref={mergedRef}
        role="thead"
        sx={{
          position: 'sticky',
          top: `${stickyOffset}px`,
          backgroundColor,
          backdropFilter: sticked ? 'blur(5px)' : undefined,
          color: 'onContext',
          transition: 'background-color 0.1s linear, box-shadow 0.1s linear',
        }}
        {...rest}
      />
    </TableHeaderContext.Provider>
  );
});
