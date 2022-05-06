import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Textarea } from '../../lib';

export default {
  title: 'Inputs/Textarea',
  component: Textarea
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = args => (
  <Textarea {...args} />
);

export const Basic = Template.bind({});

Basic.args = {};
