import { jsx } from '@theme-ui/core';
import { AppContainer } from 'delta-layout';
import { Box, mergeBasicThemes } from 'restyler';
import { theme as packageTheme } from '../lib';

const theme = mergeBasicThemes({}, packageTheme, {
  colors: {
    background: 'transparent',
    accentBackground: 'transparent'
  }
});

export const systemized = (Story, context) => {
  return (
    <AppContainer theme={theme as any}>
      <Box sx={{ padding: '20px' }}>
        <Story {...context} />
      </Box>
    </AppContainer>
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
