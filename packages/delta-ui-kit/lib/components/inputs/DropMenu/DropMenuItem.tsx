import { jsx } from '@theme-ui/core';
import { forwardRef, useContext, useMemo, useRef } from 'react';
import { ImCheckmark } from 'react-icons/im';
import { useDeltaTheme } from '../../../hooks';
import { mergeRefs } from '../../../utils';
import { ButtonProps } from '../../Button';
import { Option } from '../../containers';
import { DropMenuContext } from './DropMenu';

export interface DropMenuItemProps
  extends Omit<ButtonProps, 'value' | 'title' | 'index' | 'active'> {
  value: unknown;
  index?: number;
  active?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const DropMenuItem = forwardRef<HTMLButtonElement, DropMenuItemProps>(
  ({ children, value, index, active, selected, onClick, ...rest }, ref) => {
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
      <Option
        ref={mergedRef}
        style={{
          ...(active && {
            backgroundColor: accentContext,
            color: accentOnContext,
          }),
        }}
        tabIndex={-1}
        onClick={onClick}
        onMouseEnter={() => setActiveIndex(index as number)}
        onMouseLeave={() => setActiveIndex(null)}
        {...rest}
      >
        {children}
        {selected && <ImCheckmark size={13} sx={{ color: 'primary' }} />}
      </Option>
    );
  }
);
