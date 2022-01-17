import isPropValid from '@emotion/is-prop-valid';
import { jsx, ThemeProvider } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, mergeBasicThemes, SystemContainer } from 'restyler';
import { theme as packageTheme } from '../lib';

export const styled = (Tag: any, fn: Function) =>
  forwardRef((props: any, ref: any) => {
    const { theme, kind, ...rest } = props as any;
    const validProps = Object.keys(rest).reduce(
      (p, k) => (isPropValid(k) ? { ...p, [k]: rest[k] } : p),
      { sx: fn(props) }
    );
    return <Tag ref={ref} {...validProps} />;
  }) as any;

const theme = mergeBasicThemes({}, packageTheme, {
  colors: {
    background: 'transparent',
    accentBackground: 'transparent'
  }
});

export const systemized = (Story, context) => {
  return (
    <ThemeProvider theme={theme as any}>
      <SystemContainer styled={styled} theme={theme as any}>
        <Box sx={{ padding: '20px' }}>
          <Story {...context} />
        </Box>
      </SystemContainer>
    </ThemeProvider>
  );
};

export const centered = Story => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 40px)'
    }}
  >
    <Story />
  </Box>
);

export const compact =
  (maxWidth = '500px') =>
  Story =>
    (
      <Box sx={{ width: '100%', maxWidth }}>
        <Story />
      </Box>
    );
