import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor } from '../../lib';

export default {
  title: 'Navigation/Anchor',
  component: Anchor
} as ComponentMeta<typeof Anchor>;

const Template: ComponentStory<typeof Anchor> = args => <Anchor {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  href: '#',
  children: 'Aboba'
};
