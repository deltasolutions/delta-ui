import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Skeleton } from './Skeleton';

export default {
  title: 'Displays/Skeleton',
  decorators: [compact('700px')],
} as Meta;

export const Basics = () => <Skeleton sx={{ height: '150px' }} />;
