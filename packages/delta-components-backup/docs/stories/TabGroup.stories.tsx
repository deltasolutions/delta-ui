import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { TabGroup, TabOption } from '../../lib';

export default {
  title: 'Navigation/TabGroup',
  component: TabGroup
} as ComponentMeta<typeof TabGroup>;
const options = ['first', 'second', 'third'];
const WithAnchorsTemplate: ComponentStory<typeof TabGroup> = args => {
  return (
    <TabGroup activeId={options[0]} {...args}>
      {options.map(option => (
        <TabOption key={option} href="#" id={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </TabOption>
      ))}
    </TabGroup>
  );
};
export const WithAnchors = WithAnchorsTemplate.bind({});

WithAnchors.args = {
  activeId: 'first'
};

const WithButtonsTemplate: ComponentStory<typeof TabGroup> = args => {
  const [activeId, setActiveId] = useState(options[0]);
  return (
    <TabGroup activeId={activeId} {...args}>
      {options.map(option => (
        <TabOption onClick={() => setActiveId(option)} key={option} id={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </TabOption>
      ))}
    </TabGroup>
  );
};
export const WithButtons = WithButtonsTemplate.bind({});
