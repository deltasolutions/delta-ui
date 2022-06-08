import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Switch } from './Switch';

export default {
  title: 'Inputs/Switch',
} as Meta;

export const Basics = () => {
  return <Switch />;
};

export const Disabled = () => {
  return <Switch disabled />;
};
