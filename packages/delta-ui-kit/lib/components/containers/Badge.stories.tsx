import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Badge } from './Badge';
import { Box } from './Box';

export default {
  title: 'Containers/Badge',
} as Meta;

export const Basics = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    {(
      ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const
    ).map(v => (
      <Badge key={v} color={v}>
        Lorem ipsum
      </Badge>
    ))}
  </Box>
);
