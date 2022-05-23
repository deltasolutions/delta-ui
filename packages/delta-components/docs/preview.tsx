import { Global } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { Box, Container, theme } from '../lib';

export const parameters = {
  layout: 'fullscreen',
};

export const decorators = [
  Story => {
    return (
      <Container>
        <Global
          styles={{
            'html, body': {
              margin: 0,
              padding: 0,
              colorScheme: theme.colorScheme,
              overscrollBehaviorY: 'none',
            },
          }}
        />
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Story />
        </Box>
      </Container>
    );
  },
];
