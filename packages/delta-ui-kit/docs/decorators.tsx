import { jsx } from '@theme-ui/core';
import { Box } from '../lib';

export const compact =
  (maxWidth = '500px') =>
  Story => {
    return (
      <Box sx={{ width: '100%', maxWidth }}>
        <Story />
      </Box>
    );
  };
