import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { PasswordInput } from './PasswordInput';

export default {
  title: 'Inputs/PasswordInput',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => {
  return <PasswordInput />;
};
