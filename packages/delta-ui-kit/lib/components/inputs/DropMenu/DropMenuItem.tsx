import { jsx } from '@theme-ui/core';
import { forwardRef, useContext, useMemo, useRef } from 'react';
import { ImCheckmark } from 'react-icons/im';
import { useDeltaTheme } from '../../../hooks';
import { mergeRefs } from '../../../utils';
import { Button, ButtonProps } from '../../Button';
import { DropMenuContext } from './DropMenu';

export interface DropMenuItemProps
  extends Omit<ButtonProps, 'value' | 'title' | 'index' | 'active'> {
  value: unknown;
  index?: number;
  active?: boolean;
  selected?: boolean;
  onClick?: () => void;
  size?: 'medium' | 'large';
}

export const DropMenuItem = forwardRef<HTMLButtonElement, DropMenuItemProps>(
  (
    {
      children,
      value,
      index,
      active,
      selected,
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
      colors: { accentContext, accentOnContext, onContext },
    } = useDeltaTheme();
    const { setActiveIndex } = useContext(DropMenuContext);
    return (
      <Button
        ref={mergedRef}
        style={{
          ...(active && {
            backgroundColor: accentContext,
            color: onContext,
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
        onMouseEnter={() => setActiveIndex(index as number)}
        onMouseLeave={() => setActiveIndex(null)}
        {...rest}
      >
        {children}
        {selected && <ImCheckmark size={13} sx={{ color: 'primary' }} />}
      </Button>
    );
  }
);
