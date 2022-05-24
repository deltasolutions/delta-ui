import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Select } from './Select';

export default {
  title: 'Inputs/Select',
  decorators: [compact('250px')],
} as Meta;

const options = [
  { title: 'A', value: 1 },
  { title: 'B', value: 2 },
  { title: 'C', value: 3 },
];

export const Basics = () => {
  return <Select placeholder="Placeholder" options={options} />;
};

export const Disabled = () => {
  return <Select disabled placeholder="Disabled" options={options} />;
};
