import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Tooltip } from '..';

export default {
  title: 'Data/Tooltip',
  component: Tooltip,
} as Meta;

export const Basics = () => (
  <Tooltip content="Tooltip content here">
    <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Box>
  </Tooltip>
);
