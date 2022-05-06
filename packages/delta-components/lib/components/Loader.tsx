import { jsx } from '@theme-ui/core';
import { forwardRef, HtmlHTMLAttributes } from 'react';
import { Box } from './Box';
export interface LoaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  speed?: 'slow' | 'normal' | 'fast';
}
export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  (
    {
      size: propSize = 'medium',
      speed: propSpeed = 'normal',
      ...rest
    }: LoaderProps,
    ref
  ) => {
    const size = propSize === 'medium' ? 30 : propSize === 'small' ? 20 : 40;
    const speed =
      propSpeed === 'normal' ? 1200 : propSpeed === 'slow' ? 1800 : 500;
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
            backgroundColor: 'text_base'
          },
          '@keyframes lds-spinner': {
            '0%': { opacity: 1 },
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
