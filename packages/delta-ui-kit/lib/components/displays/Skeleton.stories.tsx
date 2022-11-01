import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Skeleton } from './Skeleton';

export default {
  title: 'Displays/Skeleton',
} as Meta;

export const Basics = () => (
  <Skeleton sx={{ width: '300px', height: '100px' }} />
);
