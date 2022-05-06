import { jsx } from '@theme-ui/core';
import { HTMLAttributes, useEffect, useRef } from 'react';
import { useDebounce } from '../../../lib';
import { hexToRgb } from '../../utils';

export interface GradientTransitionProps
  extends HTMLAttributes<HTMLDivElement> {
  start: number;
  end: number;
  hexColor: string;
}
export const GradientTransition = ({
  start,
  end,
  hexColor,
  ...rest
}: GradientTransitionProps) => {
  let opacity = 0;
  const layoutHeaderRef = useRef<HTMLDivElement>(null);
  const scrollListener = useDebounce((e = undefined) => {
    const scrollTop = window.scrollY;
    const candidate = +(
      (scrollTop - start) *
      (100 / (end - start) / 100)
    ).toFixed(2);
    opacity = candidate > 1 ? 1 : candidate < 0 ? 0 : candidate;
    const color = hexToRgb(hexColor);
    layoutHeaderRef?.current?.setAttribute(
      'style',
      `background-color: rgba(${
        color ? `${color.r}, ${color.g}, ${color.b}` : '122, 122, 122'
      }, ${opacity})`
    );
  }, 0);
  useEffect(() => {
    scrollListener();
    document.addEventListener('scroll', scrollListener);
    return () => {
      document.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return <div ref={layoutHeaderRef} sx={{ height: '100%' }} {...rest} />;
};
