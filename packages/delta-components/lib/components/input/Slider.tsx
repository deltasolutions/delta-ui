import { jsx } from '@theme-ui/core';
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback
} from 'react';
import { DISABLED_OPACITY } from '../../variables';
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
          WebkitAppearance: 'none',
          height: '6px',
          borderRadius: 5,
          opacity: disabled ? DISABLED_OPACITY : 1,
          background: '#1cb454',
          outline: 'none',
          '&:focus-visible': {
            outlineColor: 'essential_outline',
            outlineOffset: 6,
            outlineWidth: 3,
            outlineStyle: 'solid'
          },
          WebkitTransition: '.2s',
          transition: 'opacity .2s',
          '&::-webkit-slider-thumb': {
            WebkitAppearance: 'none',
            appearance: 'none',
            width: '18px',
            borderRadius: '100%',
            height: '18px',
            background: 'white',
            cursor: disabled ? 'auto' : 'pointer'
          },
          '&::-moz-range-thumb': {
            width: '12px',
            borderRadius: '100%',
            height: '12px',
            background: '#1cb454',
            cursor: 'pointer'
          }
        }}
        style={{ cursor: disabled ? 'auto' : 'pointer' }}
        type="range"
        ref={ref}
        {...rest}
      />
    );
  }
);
