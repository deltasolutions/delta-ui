import { ComponentStory, Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button } from '../../lib';

export default {
  title: 'Interactive/Button',
  component: Button,
} as Meta;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Basics = Template.bind({});
Basics.args = {
  variant: 'contained',
  color: 'primary',
  zoomable: true,
  disabled: false,
  children: 'Click Me',
};

export const Defaults = Template.bind({});
Defaults.args = {
  style: { width: '300px', height: '300px', background: 'grey' },
  children: '',
};
