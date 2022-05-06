import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor, Box, Button, TabGroup, TabOption } from '../../lib';

export default {
  title: 'Navigation/TabGroup',
  component: TabGroup
} as ComponentMeta<typeof TabGroup>;

const Template: ComponentStory<typeof TabGroup> = args => {
  return (
    <TabGroup {...args}>
      <TabOption href="#" id="first">
        First
      </TabOption>
      <TabOption href="#" id="second">
        Second
      </TabOption>
      <TabOption href="#" id="third">
        Third
      </TabOption>
    </TabGroup>
  );
};
export const Basic = Template.bind({});

Basic.args = {
  activeId: 'first'
};
