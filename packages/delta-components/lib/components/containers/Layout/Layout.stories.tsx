import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor } from '../../Anchor';
import { Breadcrumbs } from '../../navs';
import { Heading } from '../Heading';
import { Layout } from './Layout';
import { LayoutBody } from './LayoutBody';
import { LayoutBodyHeader } from './LayoutBodyHeader';
import { LayoutBodyMain } from './LayoutBodyMain';
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
    <LayoutBody>
      <LayoutBodyHeader>
        <Heading level={4}>
          <Breadcrumbs>
            <Anchor variant="pure">Home</Anchor>
            <Anchor variant="pure">Categories</Anchor>
            <Anchor variant="pure" sx={{ color: 'accentOnBackground' }}>
              Laptops
            </Anchor>
          </Breadcrumbs>
        </Heading>
      </LayoutBodyHeader>
      <LayoutBodyMain>Layout body main</LayoutBodyMain>
    </LayoutBody>
  </Layout>
);
