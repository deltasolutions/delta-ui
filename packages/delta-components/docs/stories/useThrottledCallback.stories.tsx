import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { Box, Select, useThrottledCallback } from '../../lib';

export default {
  title: 'Hooks/useThrottledCallback',
  component: Box
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = args => {
  const [value, setValue] = useState('blue');
  const setValueThrottled = useThrottledCallback(
    (color: string) => setValue(color),
    1000
  );
  return (
    <Box>
      <Select onChange={e => setValueThrottled(e.target.value)}>
        <option value="blue">blue</option>
        <option value="red">red</option>
        <option value="green">green</option>
      </Select>
      {value}
    </Box>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
