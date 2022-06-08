import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button } from './Button';
import { Tooltip } from './Tooltip';

export default {
  title: 'Interactive/Tooltip',
} as Meta;

export const Basics = () => (
  <Tooltip content="Tooltip content here" delay={1000}>
    <Button color="secondary" variant="outlined">
      Hover me 1 seconds
    </Button>
  </Tooltip>
);
