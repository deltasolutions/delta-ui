import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { FilePicker } from './FilePicker';

export default {
  title: 'Inputs/FilePicker',
  decorators: [compact('300px')],
} as Meta;

export const Basics = () => {
  return <FilePicker multiple>Pick Files</FilePicker>;
};
