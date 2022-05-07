import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button } from '../../lib';

export default {
  title: 'Button',
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  color: 'primary',
  variant: 'contained',
  uppercase: true,
  zoomable: true,
  children: 'Primary button'
};

export const Clear = Template.bind({});
Clear.args = {
  children: '',
  style: { width: '300px', height: '300px', background: 'grey' }
};
