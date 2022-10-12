import { jsx } from '@theme-ui/core';
import {
  cloneElement,
  forwardRef,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DropRendererProps } from '../../../hooks';
import { getChildrenKey } from '../../../utils';
import { Box, BoxProps } from '../../containers';
import { DropMenuContext, DropMenuItemProps } from '../DropMenu';

export interface TableSearchDropMenuProps extends DropRendererProps, BoxProps {
  children: ReactElement<DropMenuItemProps>[];
  onItemClick?: (value: unknown) => void;
}

export const TableSearchDropMenu = forwardRef<
  HTMLDivElement,
  TableSearchDropMenuProps
>(({ children, onItemClick, handleClose, context: _context, ...rest }, ref) => {
  const childrenArray = Array.from(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const contextValue = useMemo(
    () => ({ activeIndex, setActiveIndex }),
    [activeIndex, setActiveIndex]
  );
  useEffect(() => {
    setActiveIndex(0);
  }, [getChildrenKey(childrenArray, { pivots: ['value'] })]);

  useEffect(() => {
    const handleKeyDown = ev => {
      switch (ev.key) {
        case 'Enter':
          ev.preventDefault();
          ev.stopPropagation();
          const child = childrenArray[activeIndex];
          const value = child?.props?.value;
          if (value) {
            onItemClick?.(value);
          }
          break;
        case 'ArrowUp':
          setActiveIndex(v => (v === 0 ? v : v - 1));
          break;
        case 'ArrowDown':
          setActiveIndex(v => (v === childrenArray.length - 1 ? v : v + 1));
          break;
      }
    };
    addEventListener('keydown', handleKeyDown);
    return () => removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, childrenArray, onItemClick]);
  if (childrenArray.length === 0) {
    return null;
  }
  return (
    <DropMenuContext.Provider value={contextValue}>
      <Box
        ref={ref}
        sx={{
          p: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          width: '250px',
        }}
        {...rest}
      >
        {childrenArray.map((v, i) => {
          return cloneElement(v, {
            index: i,
            active: i === activeIndex,
            onClick: () => onItemClick?.(v.props.value),
          });
        })}
      </Box>
    </DropMenuContext.Provider>
  );
});
