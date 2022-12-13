import { Global, css } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import {
  Box,
  deltaLightTheme,
  deltaTheme,
  Switch,
  SystemContainer,
} from '../lib';
import 'leaflet/dist/leaflet.css';

export const parameters = {
  layout: 'fullscreen',
};

export const decorators = [
  Story => {
    const [mode, setMode] = useState('dark');
    return (
      <SystemContainer theme={mode === 'dark' ? deltaTheme : deltaLightTheme}>
        <Global
          styles={css`
            html,
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              min-height: 100vh;
              color-scheme: ${deltaTheme.mode};
              @font-face {
                font-family: Stolzl;
                font-weight: 200;
                src: url('./fonts/stolzl_thin.otf') format('opentype');
              }
              @font-face {
                font-family: Stolzl;
                font-weight: 300;
                src: url('./fonts/stolzl_light.otf') format('opentype');
              }
              @font-face {
                font-family: Stolzl;
                font-weight: 400;
                src: url('./fonts/stolzl_book.otf') format('opentype');
              }
              @font-face {
                font-family: Stolzl;
                font-weight: 500;
                src: url('./fonts/stolzl_medium.otf') format('opentype');
              }
              @font-face {
                font-family: Stolzl;
                font-weight: 600;
                src: url('./fonts/stolzl_medium.otf') format('opentype');
              }
            }
            * {
              font-family: Stolzl, sans-serif;
            }
          `}
        />
        <Box sx={{ p: 2 }}>
          <span>Light theme</span>{' '}
          <Switch
            value={mode === 'light'}
            onChange={() => setMode(v => (v === 'dark' ? 'light' : 'dark'))}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Story />
        </Box>
      </SystemContainer>
    );
  },
];
