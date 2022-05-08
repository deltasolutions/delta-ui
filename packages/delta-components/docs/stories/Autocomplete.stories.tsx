import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Autocomplete } from '../../lib';
export default {
  title: 'Inputs/Autocomplete',
  component: Autocomplete
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = args => (
  <Autocomplete {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  placeholder: '1',
  data: ['1', '2', '3', '11', '22', '33', '44', '55', '55', '44', '33', '11']
};
