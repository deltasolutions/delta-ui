import { jsx } from '@theme-ui/core';
import { forwardRef, useRef, useMemo, useContext } from 'react';
import { useDeltaTheme } from '../../../hooks';
import { mergeRefs } from '../../../utils';
import { Button, ButtonProps } from '../../Button';
import { DropMenuContext } from '../DropMenu';

export interface TableSearchDropMenuItemProps
  extends Omit<ButtonProps, 'value' | 'title' | 'index' | 'active'> {
  value: unknown;
  index?: number;
  active?: boolean;
  selected?: boolean;
  onClick?: () => void;
  size?: 'medium' | 'large';
}
export const TableSearchDropMenuItem = forwardRef<
  HTMLButtonElement,
  TableSearchDropMenuItemProps
>(
  (
    {
      children,
      value,
      index,
      active,
      variant,
      onClick,
      size = 'medium',
      ...rest
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const mergedRef = useMemo(
      () => mergeRefs([ref, buttonRef]),
      [ref, buttonRef]
    );
    const {
      colors: { accentContext, accentOnContext },
    } = useDeltaTheme();
    const { setActiveIndex } = useContext(DropMenuContext);
    return (
      <Button
        ref={mergedRef}
        style={{
          ...(active && {
            backgroundColor: accentContext,
            color: accentOnContext,
          }),
        }}
        sx={{
          ...{
            medium: {
              paddingX: 1,
              paddingY: 1,
            },
            large: {
              paddingX: 2,
              paddingY: 2,
            },
          }[size],
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: '2px',
          gap: 2,
          fontSize: 2,
          fontFamily: 'inherit',
          '&:focus, &:active, &:focus-visible': {
            backgroundColor: 'accentContext',
            color: 'onPrimary',
          },
        }}
        tabIndex={-1}
        onClick={onClick}
        onMouseEnter={() => {
          setActiveIndex(index as number);
        }}
        onMouseLeave={() => setActiveIndex(null)}
        {...rest}
      >
        {children}
      </Button>
    );
  }
);
