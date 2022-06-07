import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Alert } from './Alert';

export default {
  title: 'Containers/Alert',
  decorators: [compact('300px')],
} as Meta;

export const Basics = () => {
  return <Alert color="error">Failed</Alert>;
};
