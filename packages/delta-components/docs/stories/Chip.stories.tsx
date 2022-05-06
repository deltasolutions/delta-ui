import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Chip } from '../../lib';

export default {
  title: 'Data display/Chip',
  component: Chip
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = args => <Chip {...args} />;

export const Add = Template.bind({});
Add.args = {
  children: 'Chip content',
  size: 'medium',
  color: 'default',
  variant: 'filled',
  onAdd: () => {
    console.log('something');
  }
};
export const Remove = Template.bind({});
Remove.args = {
  children: 'Chip content',
  size: 'medium',
  color: 'default',
  variant: 'filled',
  onDelete: () => {
    console.log('something');
  }
};
