import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  TextareaHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { useUpdateEffect } from '../../hooks';
import { FormWidgetProps } from '../../types';

export interface TextAreaProps
  extends Omit<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      keyof FormWidgetProps
    >,
    FormWidgetProps<string> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      disabled,
      invalid, // TODO
      onChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [innerValue, setInnerValue] = useState<string>(value ?? '');
    const handleChange = (nextValue: string) => {
      nextValue !== innerValue && setInnerValue(nextValue);
      nextValue !== value && onChange?.(nextValue);
    };
    useUpdateEffect(() => {
      innerValue !== value && setInnerValue(value ?? '');
    }, [value]);
    return (
      <textarea
        ref={ref}
        value={innerValue}
        disabled={disabled}
        onChange={e => handleChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        sx={{
          boxSizing: 'border-box',
          width: '100%',
          minWidth: '100px',
          opacity: disabled ? 0.5 : 1,
          border: 0,
          borderRadius: 4,
          fontSize: 3,
          fontFamily: 'inherit',
          letterSpacing: 'normal',
          paddingX: '0.55em',
          paddingY: '0.60em',
          backgroundColor: 'accentSurface',
          color: 'onSurface',
          resize: 'vertical',
          '&:focus': {
            outline: '2px solid',
            outlineColor: 'primary',
          },
          '&::placeholder': { color: 'onSurface', opacity: 0.5 },
        }}
        {...rest}
      />
    );
  }
);
