import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Button, Switch } from '../../lib';

export default {
  title: 'Inputs/Switch',
  component: Switch
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = args => <Switch {...args} />;
export const Basic = Template.bind({});

Basic.args = {};
