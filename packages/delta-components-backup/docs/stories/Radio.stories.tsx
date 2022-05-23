import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { Box, Radio } from '../../lib';

export default {
  title: 'Inputs/Radio',
  component: Radio
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = args => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Radio id="1" name="radio" />
    <Radio id="2" name="radio" />
    <Radio id="3" name="radio" />
  </Box>
);
export const Basic = Template.bind({});

Basic.args = {};
