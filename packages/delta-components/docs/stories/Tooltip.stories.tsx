import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Tooltip } from '../../lib';

export default {
  title: 'Data display/Tooltip',
  component: Tooltip
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = args => (
  <Tooltip {...args}>
    <p sx={{ width: 'fit-content' }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ducimus,
    </p>
  </Tooltip>
);

export const Basic = Template.bind({});

Basic.args = {
  label: 'Tooltip content here',
  placement: 'bottom-end'
};
