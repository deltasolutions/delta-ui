import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box } from './containers';
import { Tooltip } from './Tooltip';

export default {
  title: 'Interactive/Tooltip',
} as Meta;

export const Basics = () => (
  <Tooltip delay={2000} content="Tooltip content here">
    <Box>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Box>
  </Tooltip>
);
