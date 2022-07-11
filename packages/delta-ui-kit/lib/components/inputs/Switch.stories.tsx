import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
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

export const Controlled = () => {
  const [value, setValue] = useState(false);
  return <Switch value={value} onChange={setValue} />;
};
