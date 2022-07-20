import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { compact } from '../../../docs/decorators';
import { Slider } from './Slider';

export default {
  title: 'Inputs/Slider',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => {
  return <Slider />;
};

export const Controlled = () => {
  const [value, setValue] = useState(30);
  return <Slider max={33} min={24} value={value} onChange={setValue} />;
};
export const Disabled = () => {
  return <Slider disabled />;
};
