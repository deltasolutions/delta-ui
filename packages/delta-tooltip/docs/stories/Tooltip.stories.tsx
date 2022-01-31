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
        <Box>Tooltip 1</Box>
      </Tooltip>
      <Tooltip content="Other content">
        <Box>Tooltip 2</Box>
      </Tooltip>
    </Box>
  );
};
