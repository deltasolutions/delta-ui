import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Radio, RadioOption } from './Radio';

export default {
  title: 'Inputs/Radio',
} as Meta;

const options = [
  <RadioOption key={1} value={1}>
    A
  </RadioOption>,
  <RadioOption key={2} value={2}>
    B
  </RadioOption>,
  <RadioOption key={3} value={3}>
    C
  </RadioOption>,
];

export const Basics = () => {
  return <Radio placeholder="Placeholder">{options}</Radio>;
};

export const Disabled = () => {
  return (
    <Radio disabled placeholder="Disabled" value={1}>
      <RadioOption key={1} value={1}>
        A
      </RadioOption>
      <RadioOption key={2} value={2}>
        B
      </RadioOption>
      <RadioOption key={3} value={3}>
        C
      </RadioOption>
    </Radio>
  );
};
