import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Select, Tooltip } from '../../lib';

export default {
  title: 'Inputs/Select',
  component: Select
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => (
  <Tooltip label="Choose one">
    <Select {...args} />
  </Tooltip>
);

export const Basic = Template.bind({});

Basic.args = {
  children: [
    <option>First item</option>,
    <option>Second item</option>,
    <option>Third item</option>
  ]
};
