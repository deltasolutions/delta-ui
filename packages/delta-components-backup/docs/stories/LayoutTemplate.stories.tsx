import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  Layout,
  LayoutBody,
  LayoutBodyHeader,
  LayoutBodyMain,
  LayoutNavbar
} from '../../lib';
export default {
  title: 'Layout/LayoutTemplate',
  component: Layout
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = args => (
  <Layout>
    <LayoutNavbar>Layout navbar</LayoutNavbar>
    <LayoutBody>
      <LayoutBodyHeader>Layout body header</LayoutBodyHeader>
      <LayoutBodyMain>Layout body main</LayoutBodyMain>
    </LayoutBody>
  </Layout>
);

export const Basic = Template.bind({});

Basic.args = {};
