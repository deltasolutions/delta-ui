import { Global } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { Box, SystemContainer, theme } from '../lib';

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
              width: '100vw',
              minHeight: '100vh',
              colorScheme: theme.colorScheme,
              overscrollBehaviorY: 'none',
            },
          }}
        />
        <Box
          sx={{
            width: '100vw',
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
