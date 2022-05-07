import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { TextArea } from '../../lib';

export default {
  title: 'Inputs/TextArea',
  component: TextArea
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = args => (
  <TextArea {...args} />
);

export const Basic = Template.bind({});

Basic.args = {};
