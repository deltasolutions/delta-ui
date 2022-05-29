import { jsx } from '@theme-ui/core';
import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { Button } from '../Button';
import { Box, BoxProps } from '../containers';

export interface RadioProps
  extends Omit<BoxProps, 'children' | keyof FormWidgetProps>,
    FormWidgetProps {
  children: ReactElement<RadioOptionProps>[];
  placeholder?: string;
  onChange?: (v: unknown) => void;
}

export const Radio = forwardRef<HTMLDivElement, RadioProps>(
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
    useUpdateEffect(() => {
      innerValue !== value && onChange?.(innerValue);
    }, [innerValue]);
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value);
    }, [value]);
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      >
        {Children.map(children, v =>
          cloneElement(v, {
            active: v.props?.value === innerValue,
            disabled: Boolean(disabled),
            onClick: () => {
              setInnerValue(v.props.value);
            },
          })
        )}
      </Box>
    );
  }
);

export interface RadioOptionProps extends Omit<BoxProps, 'value' | 'children'> {
  value: unknown;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export const RadioOption = ({
  value,
  children,
  active,
  disabled,
  ...rest
}: RadioOptionProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : 'default',
      }}
      {...rest}
    >
      <Button
        disabled={disabled}
        sx={{
          p: 0,
          minWidth: 0,
          width: '1.5rem',
          height: '1.5rem',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: active ? 'primary' : 'accentSurface',
          opacity: disabled ? 0.5 : 1,
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary',
            outlineOffset: 2,
          },
        }}
      >
        {active && (
          <Box
            sx={{
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'onPrimary',
            }}
          />
        )}
      </Button>
      <Box>{children}</Box>
    </Box>
  );
};
