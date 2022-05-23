import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { TextField } from '../../lib';

export default {
  title: 'Inputs/TextField',
  component: TextField
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = args => (
  <TextField {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  placeholder: 'Placeholder text'
};
