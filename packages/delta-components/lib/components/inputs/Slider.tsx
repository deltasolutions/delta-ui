import { jsx } from '@theme-ui/core';
import { forwardRef, InputHTMLAttributes } from 'react';
import { FormWidgetProps } from '../../types';

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<number> {}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      disabled,
      invalid, // TODO
      onChange,
      onFocus,
      onBlur,
      ...rest
    }: SliderProps,
    ref
  ) => {
    return (
      <input
        ref={ref}
        type="range"
        value={value ?? 0}
        disabled={disabled}
        onChange={ev => onChange?.(+ev.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        sx={{
          appearance: 'none',
          width: '100%',
          minWidth: '100px',
          height: '6px',
          borderRadius: 5,
          backgroundColor: 'accentPrimary',
          outline: 'none',
          opacity: disabled ? 0.5 : 1,
          transition: 'opacity .2s',
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary',
            outlineOffset: 8,
          },
          '&::-webkit-slider-thumb': {
            appearance: 'none',
            width: '18px',
            borderRadius: '100%',
            height: '18px',
            backgroundColor: 'onPrimary',
            cursor: disabled ? 'auto' : 'pointer',
          },
          '&::-moz-range-thumb': {
            width: '12px',
            borderRadius: '100%',
            height: '12px',
            backgroundColor: 'primary',
            cursor: 'pointer',
          },
        }}
        style={{ cursor: disabled ? 'auto' : 'pointer' }}
        {...rest}
      />
    );
  }
);
