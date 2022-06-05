import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button } from './Button';
import { Box } from './containers';
import { Tooltip } from './Tooltip';

export default {
  title: 'Interactive/Tooltip',
} as Meta;

export const Basics = () => (
  <Tooltip delay={1000} content="Tooltip content here">
    <Button variant="outlined" color="secondary">
      Hover me 1 seconds
    </Button>
  </Tooltip>
);
