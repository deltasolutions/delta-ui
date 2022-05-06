import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box } from '../../lib';

export default {
  title: 'Layout/Box',
  component: Box
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = args => <Box {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  style: { width: '400px', height: '400px', background: 'red' }
};
