import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { forwardRef, useContext, useMemo, useRef } from 'react';
import { ImCheckmark } from 'react-icons/im';
import { Theme } from '../../../defaults';
import { mergeRefs } from '../../../utils';
import { Button, ButtonProps } from '../../Button';
import { Option } from '../../containers';
import { AutocompleteDropContext } from './AutocompleteDrop';

export interface AutocompleteOptionProps
  extends Omit<ButtonProps, 'value' | 'title' | 'index' | 'active'> {
  value: unknown;
  title?: string;
  index?: number;
  active?: boolean;
  selected?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
}

export const AutocompleteOption = forwardRef<
  HTMLButtonElement,
  AutocompleteOptionProps
>(
  (
    {
      children,
      value,
      onAdd,
      onRemove,
      title,
      selected,
      index,
      active,
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
      colors: { onPrimary, monkaS },
    } = useTheme() as Theme;
    const { setActiveIndex } = useContext(AutocompleteDropContext);

    return (
      <Option
        ref={mergedRef}
        style={{
          ...(active && { backgroundColor: monkaS, color: onPrimary }),
        }}

        tabIndex={-1}
        onClick={selected ? onRemove : onAdd}
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
