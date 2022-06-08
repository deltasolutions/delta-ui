import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Slider } from './Slider';

export default {
  title: 'Inputs/Slider',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => {
  return <Slider />;
};

export const Disabled = () => {
  return <Slider disabled />;
};
