import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useEffect, useState } from 'react';
import { Box, useThrottledValue } from '../../lib';

export default {
  title: 'Hooks/useThrottledValue',
  component: Box
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = args => {
  const [value, setValue] = useState('hello');
  const throttledValue = useThrottledValue(value, 400);
  useEffect(
    () => console.log(`throttledValue changed: ${throttledValue}`),
    [throttledValue]
  );
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  return (
    <Box>
      Input: <input value={value} onChange={onChange} />
      <p>Throttled value: {throttledValue}</p>
    </Box>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
