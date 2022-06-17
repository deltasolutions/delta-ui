import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { parseToRgb } from 'polished';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Theme } from '../../../defaults';
import { Box, BoxProps } from '../Box';

export const layoutHeaderHeight = 52;

export interface LayoutMainHeaderProps extends BoxProps {}

export const LayoutMainHeader = forwardRef<
  HTMLDivElement,
  LayoutMainHeaderProps
>((props: LayoutMainHeaderProps, propsRef) => {
  const theme = useTheme() as Theme;
  const [offset, setOffset] = useState(
    typeof window === 'undefined' ? 0 : window.scrollY
  );
  const style = useMemo(() => {
    const color = parseToRgb(theme.colors.exterior);
    const ratio = Math.min(offset / layoutHeaderHeight, 1);
    const backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${ratio})`;
    return { backgroundColor };
  }, [offset]);
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    handleScroll();
    addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <Box
      ref={propsRef}
      style={style}
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
