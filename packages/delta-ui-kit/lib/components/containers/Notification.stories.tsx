import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box } from './Box';
import { Notification } from './Notification';

export default {
  title: 'Containers/Notification',
} as Meta;

export const Basics = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    {(['info', 'success', 'warning', 'error'] as const).map(v => (
      <Notification key={v} isVisible color={v}>
        Lorem ipsum
      </Notification>
    ))}
  </Box>
);
