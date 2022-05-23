import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Loader } from '../../lib';

export default {
  title: 'Feedback/Loader',
  component: Loader
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = args => <Loader {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  size: 'small',
  speed: 'fast'
};
