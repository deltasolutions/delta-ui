import { jsx } from '@theme-ui/core';
import FocusTrap from 'focus-trap-react';
import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { DropRendererProps, useDrop, useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { mergeRefs } from '../../utils';
import { Button, ButtonProps } from '../Button';
import { Box, BoxProps } from '../containers';
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
    };
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value);
    }, [value]);
    const [openDrop, anchorRef] = useDrop<HTMLDivElement>(
      props => (
        <SelectDrop handleChange={handleChange} {...props}>
          {childrenArray}
        </SelectDrop>
      ),
      {
        deps: [childrenArray, handleChange],
        tailored: true,
        placement: 'bottom-start',
      }
    );
    const mergedRef = useMemo(() => mergeRefs([ref, anchorRef]), []);
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
          readOnly
          value={title ?? ''}
          disabled={disabled}
          placeholder={placeholder}
          sx={{
            cursor: disabled ? 'not-allowed' : 'default',
            paddingRight: '2em',
          }}
          onClick={() => openDrop()}
          onKeyDown={ev => ev.key === 'Enter' && openDrop()}
          onFocus={onFocus}
          onBlur={onBlur}
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

export interface SelectDropProps extends DropRendererProps {
  children: ReactElement<SelectOptionProps>[];
  handleChange: (v: unknown) => void;
}

export const SelectDrop = ({
  children,
  handleChange,
  handleClose,
}: SelectDropProps) => {
  return (
    <FocusTrap focusTrapOptions={{ escapeDeactivates: false }}>
      <Box
        sx={{
          padding: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 3,
        }}
      >
        {children.map(v =>
          cloneElement(v, {
            onClick: () => {
              handleChange(v.props.value);
              handleClose();
            },
            onMouseEnter: e => {
              e.target.focus();
            },
          })
        )}
      </Box>
    </FocusTrap>
  );
};

export interface SelectOptionProps
  extends Omit<ButtonProps, 'value' | 'children'> {
  value: unknown;
  children: string;
}

export const SelectOption = forwardRef<HTMLButtonElement, SelectOptionProps>(
  ({ value, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        sx={{
          paddingX: 2,
          paddingY: 1,
          textAlign: 'left',
          fontSize: 1,
          outline: 'none',
          borderRadius: 2,
          '&:focus': {
            backgroundColor: 'primary',
            color: 'onPrimary',
          },
        }}
        {...rest}
      />
    );
  }
);
