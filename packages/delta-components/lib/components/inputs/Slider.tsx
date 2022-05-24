import { jsx } from '@theme-ui/core';
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
} from 'react';

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: ChangeEvent<HTMLInputElement>['target']['value']) => void;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ disabled, onChange, ...rest }: SliderProps, ref) => {
    const handleOnChange = useCallback(e => onChange?.(e.target.value), []);
    return (
      <input
        disabled={disabled}
        onChange={handleOnChange}
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
        type="range"
        ref={ref}
        {...rest}
      />
    );
  }
);
