import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { parseToRgb } from 'polished';
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Theme } from '../../../defaults';
import { mergeRefs } from '../../../utils';
import { Box, BoxProps } from '../Box';

export const layoutHeaderHeight = 52;

export interface LayoutMainHeaderProps extends BoxProps {}

export const LayoutMainHeader = forwardRef<
  HTMLDivElement,
  LayoutMainHeaderProps
>((props: LayoutMainHeaderProps, propsRef) => {
  const theme = useTheme() as Theme;
  const ref = useRef<HTMLDivElement>(null);
  const mergedRef = useMemo(() => mergeRefs([ref, propsRef]), []);
  const color = parseToRgb(theme.colors.exterior);
  const handleScroll = useCallback(() => {
    const ratio = Math.min(window.scrollY / layoutHeaderHeight, 1);
    ref.current?.setAttribute(
      'style',
      `background-color: rgba(${color.red}, ${color.green}, ${color.blue}, ${ratio});`
    );
  }, [color]);
  useEffect(() => {
    addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <Box
      ref={mergedRef}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        width: '100%',
        height: `${layoutHeaderHeight}px`,
        display: 'flex',
        alignItems: 'center',
        paddingX: 5,
        color: 'onExterior',
      }}
      {...props}
    />
  );
});
