import { jsx } from '@theme-ui/core';
import {
  Children,
  createContext,
  forwardRef,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { useDrop, useImperativePortal, useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { mergeRefs } from '../../utils';
import { Box, BoxProps, SystemContext } from '../containers';
import { DropMenu, DropMenuItem, DropMenuItemProps } from './DropMenu';
import { EmptyOptions } from './EmptyOptions';
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
    const { floatingPortal } = useContext(SystemContext);
    const portal = useImperativePortal(floatingPortal);
    const [innerValue, setInnerValue] = useState<unknown>(value);
    const childrenArray = useMemo(
      () =>
        Children.toArray(children).filter(
          Boolean
        ) as ReactElement<SelectOptionProps>[],
      [
        Children.map(
          children,
          v => v && String(v.props.value) + ' ' + String(v.props.children)
        )?.join(),
      ]
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
      props => <SelectDrop {...props} />,
      {
        deps: [],
        tailored: true,
        portal,
        blurResistant: true,
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
    const selectContext = {
      handleChange,
      childrenArray,
      dropRef,
    };
    return (
      <SelectContext.Provider value={selectContext}>
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
        {portal}
      </SelectContext.Provider>
    );
  }
);

export interface SelectOptionProps extends Omit<DropMenuItemProps, 'children'> {
  children: string;
}

export const SelectOption = (props: SelectOptionProps) => (
  <DropMenuItem {...props} />
);

const SelectDrop = forwardRef<HTMLDivElement, any>((props, ref) => {
  const { childrenArray, handleChange, dropRef } = useContext(SelectContext);
  if (childrenArray.length > 0) {
    return (
      <DropMenu ref={dropRef} onItemClick={handleChange} {...props}>
        {childrenArray}
      </DropMenu>
    );
  }
  return <EmptyOptions ref={dropRef} />;
});

interface SelectContextOptions {
  childrenArray: unknown[];
  handleChange: (v: unknown) => void;
  dropRef: RefObject<HTMLDivElement>;
}
const SelectContext = createContext<SelectContextOptions>(
  {} as SelectContextOptions
);
