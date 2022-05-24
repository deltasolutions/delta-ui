import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Checkbox } from './Checkbox';

export default {
  title: 'Inputs/Checkbox',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => {
  return <Checkbox />;
};

export const Disabled = () => {
  return <Checkbox disabled />;
};
