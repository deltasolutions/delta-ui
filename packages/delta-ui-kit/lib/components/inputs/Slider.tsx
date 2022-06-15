import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { Theme } from '../../defaults';
import { useIsomorphicLayoutEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';
import { mergeRefs } from '../../utils';

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<number> {}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      disabled,
      invalid, // TODO
      onChange,
      onFocus,
      onBlur,
      onInput,
      ...rest
    }: SliderProps,
    propsRef
  ) => {
    const {
      colors: { accentPrimary, accentSurface },
    } = useTheme() as Theme;
    const ref = useRef<HTMLInputElement>(null);
    const mergedRef = useMemo(
      () => mergeRefs([ref, propsRef]),
      [ref, propsRef]
    );
    const setBackground = useCallback(
      (ref, value) => {
        if (ref.current) {
          ref.current.style.background =
            `linear-gradient(` +
            `to right,` +
            `${accentPrimary} 0%,` +
            `${accentPrimary} ${value}%,` +
            `${accentSurface} ${value}%,` +
            `${accentSurface} 100%` +
            `)`;
        }
      },
      [accentPrimary, accentSurface]
    );
    const onInputHandler = useCallback(
      ev => {
        setBackground(ref, ev.target.value);
        onInput?.(ev);
      },
      [onInput]
    );
    useIsomorphicLayoutEffect(() => {
      setBackground(ref, ref.current?.value);
    }, []);
    return (
      <input
        ref={mergedRef}
        disabled={disabled}
        type="range"
        {...{
          ...(onChange && { onChange: ev => onChange(+ev.target.value) }),
        }}
        style={{ cursor: disabled ? 'auto' : 'pointer' }}
        sx={{
          accentColor: 'red',
          appearance: 'none',
          width: '100%',
          minWidth: '100px',
          height: '6px',
          borderRadius: 5,
          backgroundColor: 'accentPrimary',
          outline: 'none',
          opacity: disabled ? 0.5 : 1,
          transition: 'opacity 0.2s',
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary',
            outlineOffset: 8,
          },
          '&::-webkit-slider-thumb': {
            appearance: 'none',
            width: '1rem',
            borderRadius: '100%',
            height: '1rem',
            backgroundColor: 'onPrimary',
            cursor: disabled ? 'auto' : 'pointer',
          },
          '&::-moz-range-thumb': {
            width: '1rem',
            borderRadius: '100%',
            height: '1rem',
            backgroundColor: 'primary',
            cursor: 'pointer',
          },
        }}
        onBlur={() => onBlur?.()}
        onFocus={() => onFocus?.()}
        onInput={onInputHandler}
        {...rest}
      />
    );
  }
);
