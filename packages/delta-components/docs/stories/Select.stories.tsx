import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Select, Tooltip } from '../../lib';

export default {
  title: 'Inputs/Select',
  component: Select
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => <Select {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: [
    <option key={0}>First item</option>,
    <option key={1}>Second item</option>,
    <option key={2}>Third item</option>,
    <option key={2}>Thirdd item</option>
  ]
};
