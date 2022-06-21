import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box } from '../containers';
import { Loader } from './Loader';

export default {
  title: 'Displays/Loader',
} as Meta;

export const Basics = () => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Loader color="red" size="small" sx={{ color: 'red' }} />
    <Loader size="medium" />
    <Loader size="large" />
  </Box>
);
