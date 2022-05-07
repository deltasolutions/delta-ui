import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor, BreadCrumb, BreadCrumbs, Heading } from '../../lib';

export default {
  title: 'Navigation/BreadCrumbs',
  component: BreadCrumbs
} as ComponentMeta<typeof BreadCrumbs>;

const Template: ComponentStory<typeof BreadCrumbs> = args => (
  <BreadCrumbs {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  children: [
    <BreadCrumb id="/settings">
      <Anchor underline="none" href="#">
        <Heading sx={{ color: 'inherit' }} level={2}>
          Settings
        </Heading>
      </Anchor>
    </BreadCrumb>,
    <BreadCrumb id="/settings/display">
      <Anchor underline="none" href="#">
        <Heading sx={{ color: 'inherit' }} level={2}>
          Display
        </Heading>
      </Anchor>
    </BreadCrumb>,
    <BreadCrumb id="/settings/display/advanced">
      <Anchor underline="none" href="#">
        <Heading sx={{ color: 'inherit' }} level={2}>
          Advanced
        </Heading>
      </Anchor>
    </BreadCrumb>
  ]
};
