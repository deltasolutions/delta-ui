import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { TextField } from './TextField';

export default {
  title: 'Inputs/TextField',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => <TextField placeholder="Placeholder" />;
