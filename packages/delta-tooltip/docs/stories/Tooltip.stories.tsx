import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box } from 'restyler';
import { Tooltip } from '../../lib';

export default {
  title: 'Tooltip'
} as Meta;

export const Basics = () => {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Tooltip content="Sample content">
        <Box>Hover me!</Box>
      </Tooltip>
    </Box>
  );
};
