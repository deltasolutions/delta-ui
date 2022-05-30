import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor } from '../../Anchor';
import { Breadcrumbs } from '../../navs';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { Layout } from './Layout';
import { LayoutMain } from './LayoutMain';
import { LayoutMainBody } from './LayoutMainBody';
import { LayoutMainHeader } from './LayoutMainHeader';
import {
  LayoutSidebar,
  LayoutSidebarBody,
  LayoutSidebarHeader,
} from './LayoutSidebar';

export default {
  title: 'Containers/Layout',
} as Meta;

export const Basics = () => (
  <Layout>
    <LayoutSidebar>
      <LayoutSidebarHeader>LayoutSidebarHeader</LayoutSidebarHeader>
      <LayoutSidebarBody>LayoutSidebarBody</LayoutSidebarBody>
    </LayoutSidebar>
    <LayoutMain>
      <LayoutMainHeader>
        <Heading level={4}>
          <Breadcrumbs>
            <Anchor variant="pure">Home</Anchor>
            <Anchor variant="pure">Categories</Anchor>
            <Anchor variant="pure" sx={{ color: 'accentOnBackground' }}>
              Laptops
            </Anchor>
          </Breadcrumbs>
        </Heading>
      </LayoutMainHeader>
      <LayoutMainBody>
        Top Text
        <Box sx={{ height: '200vh', width: '1px' }} />
        Bottom Text
      </LayoutMainBody>
    </LayoutMain>
  </Layout>
);
