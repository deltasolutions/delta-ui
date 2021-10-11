/** @jsx jsx */
import isPropValid from '@emotion/is-prop-valid';
import { Global } from '@emotion/react';
import { forwardRef } from 'react';
import { Box, mergeBasicThemes, SystemContainer } from 'restyler';
import { jsx, ThemeProvider } from 'theme-ui';
import { theme as packageTheme } from '../src';

const styled = (Tag: any, fn: Function) =>
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
      <SystemContainer styled={styled} theme={theme}>
        <Global
          styles={{
            'html, body, #root': {
              margin: '0 !important',
              padding: '0 !important',
              minHeight: '100vh'
            }
          }}
        />
        <Story {...context} />
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
      minHeight: '100vh',
      paddingX: 3
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
