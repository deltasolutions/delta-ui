import { ComponentStory, Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Alert } from './Alert';

export default {
  title: 'Containers/Alert',
  decorators: [compact('250px')],
} as Meta;

const Template: ComponentStory<typeof Alert> = args => <Alert {...args} />;

export const Basics = Template.bind({});
Basics.args = {
  color: 'success',
  children: 'Lorem ipsum',
};
