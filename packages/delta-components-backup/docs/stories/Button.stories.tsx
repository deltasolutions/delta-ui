import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button } from '../../lib';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Basics = Template.bind({});
Basics.args = {
  color: 'primary',
  variant: 'contained',
  uppercase: true,
  zoomable: true,
  disabled: false,
  children: 'Primary button',
};

export const Defaults = Template.bind({});
Defaults.args = {
  children: '',
  style: { width: '300px', height: '300px', background: 'grey' },
};
