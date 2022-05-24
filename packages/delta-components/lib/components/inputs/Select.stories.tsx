import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Select } from '../..';

export default {
  title: 'Inputs/Select',
  component: Select,
} as Meta;

export const Basics = () => {
  return (
    <Select>
      <option key={0}>First item</option>
      <option key={1}>Second item</option>
      <option key={2}>Third item</option>
      <option key={3}>Third item</option>
    </Select>
  );
};
