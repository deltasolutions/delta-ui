import { jsx } from '@theme-ui/core';
import { Box } from '../lib';

export const compact =
  (maxWidth = '500px') =>
  Story =>
    (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ width: '100%', maxWidth }}>
          <Story />
        </Box>
      </Box>
    );
