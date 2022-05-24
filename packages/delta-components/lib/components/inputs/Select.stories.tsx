import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Select, SelectOption } from './Select';

export default {
  title: 'Inputs/Select',
  decorators: [compact('250px')],
} as Meta;

const options = [
  <SelectOption key={1} value={1}>
    A
  </SelectOption>,
  <SelectOption key={2} value={2}>
    B
  </SelectOption>,
  <SelectOption key={3} value={3}>
    C
  </SelectOption>,
];

export const Basics = () => {
  return <Select placeholder="Placeholder">{options}</Select>;
};

export const Disabled = () => {
  return (
    <Select disabled placeholder="Disabled">
      {options}
    </Select>
  );
};
