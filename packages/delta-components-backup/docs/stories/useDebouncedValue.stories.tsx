import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useDebugValue, useState } from 'react';
import { Box, Select, useDebouncedValue } from '../../lib';

export default {
  title: 'Hooks/useDebouncedValue',
  component: Box
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = args => {
  const [value, setValue] = useState('blue');
  const debouncedValue = useDebouncedValue(value, 500);
  return (
    <Box>
      <Select onChange={e => setValue(e.target.value)}>
        <option value="blue">blue</option>
        <option value="red">red</option>
        <option value="green">green</option>
      </Select>
      {debouncedValue}
    </Box>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
