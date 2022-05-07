import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  Card,
  CardBody,
  CardHeading,
  Heading,
  Loader,
  PairList
} from '../../lib';

export default {
  title: 'Data display/PairList',
  component: PairList
} as ComponentMeta<typeof PairList>;

const Template: ComponentStory<typeof PairList> = args => (
  <Card>
    <CardHeading>
      <Heading level={2}>Delta DCM main</Heading>
    </CardHeading>
    <CardBody>
      <PairList {...args} />
    </CardBody>
  </Card>
);

export const Basic = Template.bind({});

Basic.args = {
  direction: 'row',
  pairs: [
    ['Name', 'DeltaBMCscan'],
    ['Cron', '*/5 * * * *'],
    ['Active', <Loader />],
    ['Running', 'False'],
    ['Next execution', '15.04.2022'],
    ['Last status', 'SUCCESS']
  ]
};
