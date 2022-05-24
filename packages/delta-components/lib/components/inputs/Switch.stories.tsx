import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Switch } from './Switch';

export default {
  title: 'Inputs/Switch',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => {
  return <Switch />;
};

export const Disabled = () => {
  return <Switch disabled />;
};
