import { jsx } from '@theme-ui/core';
import { AppContainer } from 'delta-layout';
import { Box } from 'restyler';

export const parameters = {
  controls: { hideNoControlsWarning: true },
  layout: 'fullscreen'
};

export const decorators = [
  Story => {
    return (
      <AppContainer>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Story />
        </Box>
      </AppContainer>
    );
  }
];
