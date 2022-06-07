import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { opacify, parseToRgb } from 'polished';
import { useEffect, useMemo, useState } from 'react';
import { Theme } from '../../../defaults';
import { Box, BoxProps } from '../Box';

const height = 64;

export interface LayoutMainHeaderProps extends BoxProps {}

export const LayoutMainHeader = (props: LayoutMainHeaderProps) => {
  const theme = useTheme() as Theme;
  const [offset, setOffset] = useState(
    typeof window === 'undefined' ? 0 : window.scrollY
  );
  const style = useMemo(() => {
    const color = parseToRgb(theme.colors.exterior);
    const ratio = Math.min(offset / height, 1);
    const backgroundColor = `rgba(${color.red}, ${color.green}, ${color.blue}, ${ratio})`;
    return { backgroundColor };
  }, [offset]);
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        width: '100%',
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        paddingX: 5,
        color: 'onExterior',
      }}
      style={style}
      {...props}
    />
  );
};