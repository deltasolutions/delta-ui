import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { TextInput } from './TextInput';

export default {
  title: 'Inputs/TextInput',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => <TextInput placeholder="Placeholder" />;
