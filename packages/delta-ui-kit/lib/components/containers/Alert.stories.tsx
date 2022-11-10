import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Alert } from './Alert';

export default {
  title: 'Containers/Alert',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => <Alert>Lorem ipsum</Alert>;
export const Closer = () => <Alert onClose={() => {}}>Lorem ipsum</Alert>;
