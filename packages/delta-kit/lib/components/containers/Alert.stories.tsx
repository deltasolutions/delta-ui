import { ComponentStory, Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Alert } from '..';
import { compact } from '../../../docs/decorators';

export default {
  title: 'Containers/Alert',
  component: Alert,
  decorators: [compact('300px')],
} as Meta;

const Template: ComponentStory<typeof Alert> = args => <Alert {...args} />;

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
  children: 'Alert text',
};
