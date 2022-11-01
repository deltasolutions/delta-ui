import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  Fragment,
  InputHTMLAttributes,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useDeltaTheme,
  useIsomorphicLayoutEffect,
  useUpdateEffect,
} from '../../hooks';
import { FormWidgetProps } from '../../types';
import { mergeRefs } from '../../utils';

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof FormWidgetProps>,
    FormWidgetProps<number> {
  min?: number;
  max?: number;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      disabled,
      invalid, // TODO
      onChange,
      onFocus,
      onBlur,
      onInput,
      value,
      min = 0,
      max = 100,
      ...rest
    }: SliderProps,
    propsRef
  ) => {
    const {
      colors: { accentPrimary, accentContext },
    } = useDeltaTheme();
    // const [openDrop, anchorRef] = useDrop(
    //   () => {
    //     return <Box sx={{ mt: 3 }}>32</Box>;
    //   },
    //   { deps: [] }
    // );
    const ref = useRef<HTMLInputElement>(null);
    const [innerValue, setInnerValue] = useState<number>(
      value ?? (max - min) / 2
    );
    const handleChange = (nextValue: number) => {
      onChange ? onChange(nextValue) : setInnerValue(nextValue);
    };
    useUpdateEffect(() => {
      setInnerValue(value ?? (max - min) / 2);
    }, [value]);
    const mergedRef = useMemo(
      () => mergeRefs([ref, propsRef]),
      [ref, propsRef]
    );
    const setBackground = useCallback(
      (ref, value) => {
        const raw = (value - min) * (100 / (max - min));
        const percent = Math.floor(raw > 100 ? 100 : raw < 0 ? 0 : raw);
        if (ref.current) {
          ref.current.style.background =
            `linear-gradient(` +
            `to right,` +
            `${accentPrimary} 0%,` +
            `${accentPrimary} ${percent}%,` +
            `${accentContext} ${percent}%,` +
            `${accentContext} 100%` +
            `)`;
        }
      },
      [accentPrimary, accentContext, min, max]
    );
    const onInputHandler = useCallback(
      ev => {
        setBackground(ref, ev.target.value);
        onInput?.(ev);
      },
      [onInput]
    );
    useIsomorphicLayoutEffect(() => {
      setBackground(ref, innerValue);
    }, []);
    return (
      <Fragment>
        <input
          ref={mergedRef}
          disabled={disabled}
          max={max}
          min={min}
          type="range"
          value={innerValue}
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
              backgroundColor: 'accentSecondary',
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
          onChange={e => {
            handleChange(+e.target.value);
          }}
          onFocus={() => {
            onFocus?.();
          }}
          onInput={onInputHandler}
          {...rest}
        />
      </Fragment>
    );
  }
);
