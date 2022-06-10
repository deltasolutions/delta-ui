import { keyframes, useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { forwardRef, HtmlHTMLAttributes, useMemo } from 'react';
import { Theme } from '../../defaults';
import { Box } from '../containers';

export interface LoaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
  speed?: 'slow' | 'normal' | 'fast';
  variant?: 'contained' | 'outlined';
}

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ variant = 'contained', ...rest }: LoaderProps, ref) => {
    return variant === 'contained' ? (
      <Contained ref={ref} variant={variant} {...rest} />
    ) : (
      <Outlined ref={ref} variant={variant} {...rest} />
    );
  }
);

const Contained = forwardRef<HTMLDivElement, LoaderProps>(
  ({ size: propSize = 'medium', ...rest }, ref) => {
    const {
      colors: { secondary },
    } = useTheme() as Theme;
    return (
      <Box
        ref={ref}
        {...rest}
        sx={{
          display: 'inline-block',
          position: 'relative',
          width: '80px',
          height: '80px',
          div: {
            boxSizing: 'border-box',
            display: 'block',
            position: 'absolute',
            width: '64px',
            height: '64px',
            margin: '8px',
            border: '8px solid',
            borderRadius: '50%',
            animation: `${ldsRing} 1.6s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
            borderColor: `${secondary} transparent transparent transparent`,
          },
          'div:nth-child(1)': { animationDelay: '-0.6s' },
          'div:nth-child(2)': { animationDelay: '-0.4s' },
          'div:nth-child(3)': { animationDelay: '-0.2s' },
        }}
      >
        <Box />
        <Box />
        <Box />
        <Box />
      </Box>
    );
  }
);
const ldsRing = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});
const Outlined = forwardRef<HTMLDivElement, LoaderProps>(
  (
    { size: propSize = 'medium', speed: propSpeed = 'normal', ...rest },
    ref
  ) => {
    const { sizes, ticks } = useTheme() as Theme;
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
            animation: `${fade} ${speed}ms linear infinite`,
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
            backgroundColor: 'currentColor',
          },
        }}
        {...rest}
      >
        {Array.from(Array(12).keys()).map(i => (
          <Box
            key={i}
            style={{
              animationDelay: `-${speed * 0.083 * i}ms`,
              transform: `rotate(${330 - i * 30}deg)`,
            }}
          />
        ))}
      </Box>
    );
  }
);

const fade = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});
// ".lds-ring": {
//   display: "inline-block",
//   position: "relative",
//   width: "80px",
//   height: "80px"
// },
// ".lds-ring div": {
//   boxSizing: "border-box",
//   display: "block",
//   position: "absolute",
//   width: "64px",
//   height: "64px",
//   margin: "8px",
//   border: "8px solid #fff",
//   borderRadius: "50%",
//   animation: "lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
//   borderColor: "#fff transparent transparent transparent"
// },
// ".lds-ring div:nth-child(1)": { animationDelay: "-0.45s" },
// ".lds-ring div:nth-child(2)": { animationDelay: "-0.3s" },
// ".lds-ring div:nth-child(3)": { animationDelay: "-0.15s" },
// "@keyframes lds-ring": {
//   "0%": { transform: "rotate(0deg)" },
//   "100%": { transform: "rotate(360deg)" }
// }
