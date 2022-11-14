import { jsx } from '@theme-ui/core';
import {
  cloneElement,
  createContext,
  Dispatch,
  forwardRef,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DropRendererProps, useIsomorphicLayoutEffect } from '../../../hooks';
import { getChildrenKey, mergeRefs } from '../../../utils';
import { Box, BoxProps } from '../../containers';
import { DropMenuItemProps } from './DropMenuItem';

export const DropMenuContext = createContext(
  {} as {
    activeIndex: number | null;
    setActiveIndex: Dispatch<React.SetStateAction<number | null>>;
  }
);

export interface DropMenuProps extends DropRendererProps, BoxProps {
  children: ReactElement<DropMenuItemProps>[];
  selectedValues?: unknown[];
  onItemClick?: (value: unknown) => void;
  closeOnEscape?: boolean;
}

export const DropMenu = forwardRef<HTMLDivElement, DropMenuProps>(
  (
    {
      children,
      selectedValues = [],
      closeOnEscape = true,
      onItemClick,
      handleClose,
      context: _context,
      ...rest
    },
    ref
  ) => {
    const childrenArray = Array.from(children);
    const [activeIndex, setActiveIndex] = useState(0);
    const listItemRef = useRef<HTMLDivElement>(null);
    const stableRef = useMemo(
      () => mergeRefs([listItemRef, ref]),
      [listItemRef, ref]
    );
    const contextValue = useMemo(
      () => ({ activeIndex, setActiveIndex }),
      [activeIndex]
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
            // selectedValues.includes(value)
            //   ? handleRemoval(value)
            //   : handleAddition(child.props?.value, getTitleByChild(child));
            break;
          case 'Escape':
            closeOnEscape && handleClose();
            break;
          case 'ArrowUp':
            ev.preventDefault();
            setActiveIndex(v => (v === 0 ? v : v - 1));
            break;
          case 'ArrowDown':
            ev.preventDefault();
            setActiveIndex(v => (v === childrenArray.length - 1 ? v : v + 1));
            break;
        }
      };
      addEventListener('keydown', handleKeyDown);
      return () => removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, childrenArray, onItemClick]);
    useIsomorphicLayoutEffect(() => {
      if (ref) {
        requestAnimationFrame(() => {
          const item = document.getElementById(`list-item-${activeIndex}`);
          item?.scrollIntoView({
            block: 'nearest',
          });
        });
      }
    }, [activeIndex]);
    if (childrenArray.length === 0) {
      return null;
    }
    return (
      <DropMenuContext.Provider value={contextValue}>
        <Box
          ref={stableRef}
          sx={{
            p: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 4,
          }}
          {...rest}
        >
          {childrenArray.map((v, i) => {
            const value = v.props?.value;
            const selected = selectedValues?.includes(value);
            return cloneElement(v, {
              index: i,
              selected,
              id: `list-item-${i}`,
              active: i === activeIndex,
              onClick: () => onItemClick?.(v.props.value),
            });
          })}
        </Box>
      </DropMenuContext.Provider>
    );
  }
);
