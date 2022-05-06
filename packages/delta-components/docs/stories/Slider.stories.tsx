import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Slider } from '../../lib';

export default {
  title: 'Inputs/Slider',
  component: Slider
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = args => <Slider {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
