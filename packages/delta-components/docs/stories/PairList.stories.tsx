import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { PairList } from '../../lib';

export default {
  title: 'Data display/PairList',
  component: PairList
} as ComponentMeta<typeof PairList>;

const Template: ComponentStory<typeof PairList> = args => (
  <PairList {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  pairs: [
    ['Name', 'DeltaBMCscan'],
    ['Cron', '*/5 * * * *'],
    ['Active', 'True'],
    ['Running', 'False'],
    ['Next execution', '15.04.2022'],
    ['Last status', 'SUCCESS']
  ]
};
