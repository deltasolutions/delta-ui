import { jsx } from '@theme-ui/core';
import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { useDrop, useUpdateEffect } from '../../hooks';
import { mergeRefs } from '../../utils';
import { Button, ButtonProps } from '../Button';
import { Box, BoxProps } from '../containers';
import { TextField } from './TextField';

export interface SelectOption {
  title: string;
  value: unknown;
}

export interface SelectProps extends Omit<BoxProps, 'children'> {
  children: ReactElement<SelectOptionProps>[];
  value?: unknown;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (v: unknown) => void;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ children, value, disabled, placeholder, onChange, ...rest }, ref) => {
    const [innerValue, setInnerValue] = useState<unknown>(value);
    const title = useMemo(() => {
      const childrenArray = Children.toArray(
        children
      ) as ReactElement<SelectOptionProps>[];
      return childrenArray.find(v => v.props.value === innerValue)?.props
        .children;
    }, [children, innerValue]);
    useUpdateEffect(() => {
      innerValue !== value && onChange?.(innerValue);
    }, [innerValue]);
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value);
    }, [value]);
    const [openDrop, anchorRef] = useDrop<HTMLDivElement>(
      ({ handleClose }) => {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: 3,
            }}
          >
            {Children.map(children, v =>
              cloneElement(v, {
                onClick: () => {
                  setInnerValue(v.props.value);
                  handleClose();
                },
              })
            )}
          </Box>
        );
      },
      {
        deps: [],
        tailored: true,
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
        <TextField
          readOnly
          value={title ?? ''}
          disabled={disabled}
          placeholder={placeholder}
          sx={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            paddingRight: '2em',
          }}
          onFocus={() => openDrop()}
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

export interface SelectOptionProps
  extends Omit<ButtonProps, 'value' | 'children'> {
  value: unknown;
  children: string;
}

export const SelectOption = ({ value, ...rest }: SelectOptionProps) => {
  return (
    <Button
      sx={{
        cursor: 'pointer',
        paddingX: 2,
        paddingY: 3,
        textAlign: 'left',
        '&:hover': {
          backgroundColor: 'accentSurface',
        },
      }}
      {...rest}
    />
  );
};
