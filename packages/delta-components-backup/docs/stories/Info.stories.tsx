import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Info } from '../../lib';
export default {
  title: 'Feedback/Info',
  component: Info
} as ComponentMeta<typeof Info>;

const Template: ComponentStory<typeof Info> = args => <Info {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Hekdasp kpoaskd'
};
