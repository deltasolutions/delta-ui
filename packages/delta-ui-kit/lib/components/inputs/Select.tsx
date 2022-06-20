import { jsx } from '@theme-ui/core';
import {
  Children,
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { useDrop, useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { mergeRefs } from '../../utils';
import { Box, BoxProps } from '../containers';
import { DropMenu, DropMenuItem, DropMenuItemProps } from './DropMenu';
import { TextInput } from './TextInput';

export interface SelectProps
  extends Omit<BoxProps, 'children' | keyof FormWidgetProps>,
    FormWidgetProps {
  children: (ReactElement<SelectOptionProps> | null | undefined | false)[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      children,
      placeholder,
      value,
      invalid,
      disabled,
      onChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [innerValue, setInnerValue] = useState<unknown>(value);
    const childrenArray = useMemo(
      () =>
        Children.toArray(children).filter(
          Boolean
        ) as ReactElement<SelectOptionProps>[],
      [Children.map(children, v => v && String(v.props.value))?.join()]
    );
    const title = useMemo(() => {
      return childrenArray.find(v => v.props.value === innerValue)?.props
        .children;
    }, [children, innerValue]);
    const handleChange = (nextValue: unknown) => {
      nextValue !== innerValue && setInnerValue(nextValue);
      nextValue !== value && onChange?.(nextValue);
      handleClose();
    };
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value);
    }, [value]);
    const dropRef = useRef<HTMLDivElement>(null);
    const closeDropRef = useRef<undefined | (() => void)>();
    const [openDrop, anchorRef] = useDrop<HTMLDivElement>(
      props => (
        <DropMenu ref={dropRef} onItemClick={handleChange} {...props}>
          {childrenArray}
        </DropMenu>
      ),
      {
        deps: [childrenArray, handleChange],
        tailored: true,
        placement: 'bottom-start',
      }
    );
    const handleOpen = useCallback(() => {
      closeDropRef.current = openDrop();
    }, [openDrop]);
    const handleClose = useCallback(() => {
      closeDropRef.current?.();
    }, []);
    useEffect(() => {
      const handleNativeBlur = ev => {
        if (
          !ev.relatedTarget ||
          !dropRef.current ||
          !dropRef.current.contains(ev.relatedTarget)
        ) {
          handleClose();
        }
      };
      const handleKeydown = ev => {
        if (ev.key === 'ArrowDown') {
          handleOpen();
          return;
        }
      };
      inputRef.current?.addEventListener('blur', handleNativeBlur);
      inputRef.current?.addEventListener('keydown', handleKeydown);
      return () => {
        inputRef.current?.removeEventListener('blur', handleNativeBlur);
        inputRef.current?.removeEventListener('keydown', handleKeydown);
      };
    }, [handleOpen]);
    const mergedRef = useMemo(
      () => mergeRefs([ref, anchorRef]),
      [ref, anchorRef]
    );
    return (
      <Box
        ref={mergedRef}
        sx={{
          position: 'relative',
          width: '100%',
          minWidth: '100px',
        }}
        {...rest}
      >
        <TextInput
          ref={inputRef}
          readOnly
          disabled={disabled}
          placeholder={placeholder}
          sx={{
            cursor: disabled ? 'not-allowed' : 'default',
            paddingRight: '2em',
          }}
          value={title ?? ''}
          onBlur={onBlur}
          onClick={handleOpen}
          onFocus={onFocus}
        />
        <IoChevronDown
          sx={{
            position: 'absolute',
            top: '50%',
            right: 2,
            width: '1.25em',
            height: '1.25em',
            transform: 'translateY(-50%)',
          }}
        />
      </Box>
    );
  }
);

export interface SelectOptionProps extends Omit<DropMenuItemProps, 'children'> {
  children: string;
}

export const SelectOption = (props: SelectOptionProps) => (
  <DropMenuItem {...props} />
);
