import { Global } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { Box, deltaTheme, SystemContainer } from '../lib';

import 'leaflet/dist/leaflet.css';

export const parameters = {
  layout: 'fullscreen',
};

export const decorators = [
  Story => {
    return (
      <SystemContainer>
        <Global
          styles={{
            'html, body': {
              margin: 0,
              padding: 0,
              width: '100%',
              minHeight: '100vh',
              colorScheme: deltaTheme.colorScheme,
            },
          }}
        />
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
