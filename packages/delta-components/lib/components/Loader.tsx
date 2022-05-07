import { jsx } from '@theme-ui/core';
import { forwardRef, HtmlHTMLAttributes, useMemo } from 'react';
import { useTheme } from '../hooks';
import { Box } from './Box';
export interface LoaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  speed?: 'slow' | 'normal' | 'fast';
}
export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  (
    {
      size: propSize = 'small',
      speed: propSpeed = 'normal',
      ...rest
    }: LoaderProps,
    ref
  ) => {
    const { sizes, ticks } = useTheme();
    const size = useMemo(
      () => ({ small: sizes[1], medium: sizes[2], large: sizes[3] }[propSize]),
      [propSize]
    );
    const speed = useMemo(
      () => ({ slow: ticks[7], normal: ticks[6], fast: ticks[4] }[propSpeed]),
      [propSpeed]
    );
    return (
      <Box
        ref={ref}
        sx={{
          display: 'inline-block',
          position: 'relative',
          width: `${size}px`,
          height: `${size}px`,
          '& > div': {
            transformOrigin: `${size / 2}px ${size / 2}px`,
            animation: `lds-spinner ${speed}ms linear infinite`
          },
          '& > div:after': {
            content: '" "',
            display: 'block',
            position: 'absolute',
            top: `${size / 25}px`,
            left: `${size / 2.1}px`,
            width: `${size / 13}px`,
            height: `${size / 4.2}px`,
            borderRadius: '20%',
            backgroundColor: 'onBackgroundAccent'
          },
          '@keyframes lds-spinner': {
            '0%': { opacity: 2 },
            '100%': { opacity: 0 }
          }
        }}
        {...rest}
      >
        {Array.from(Array(12).keys()).map(i => (
          <Box
            key={i}
            style={{
              animationDelay: `-${speed * 0.083 * i}ms`,
              transform: `rotate(${330 - i * 30}deg)`
            }}
          />
        ))}
      </Box>
    );
  }
);
