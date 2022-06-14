import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { Heading } from '../Heading';
import { Layout } from './Layout';
import { LayoutMain } from './LayoutMain';
import { LayoutMainBody } from './LayoutMainBody';
import { LayoutMainHeader } from './LayoutMainHeader';
import {
  LayoutNavigation,
  LayoutNavigationGroup,
  LayoutNavigationItem,
} from './LayoutNavigation';
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
      <LayoutSidebarHeader>
        <Heading level={3}>Heading</Heading>
      </LayoutSidebarHeader>
      <LayoutSidebarBody>
        <LayoutNavigation activeId="1">
          <LayoutNavigationGroup title="Group 1">
            <LayoutNavigationItem icon={MdOutlineSpaceDashboard} id="1">
              Dashboard
            </LayoutNavigationItem>
            <LayoutNavigationItem id="2">
              Navigation item 2
            </LayoutNavigationItem>
            <LayoutNavigationItem id="3">
              Navigation item 3
            </LayoutNavigationItem>
          </LayoutNavigationGroup>
          <LayoutNavigationGroup title="Group 2">
            <LayoutNavigationItem id="4">
              Navigation item 4
            </LayoutNavigationItem>
            <LayoutNavigationItem id="5">
              Navigation item 5
            </LayoutNavigationItem>
            <LayoutNavigationItem id="6">
              Navigation item 6
            </LayoutNavigationItem>
          </LayoutNavigationGroup>
        </LayoutNavigation>
      </LayoutSidebarBody>
    </LayoutSidebar>
    <LayoutMain>
      <LayoutMainHeader>header</LayoutMainHeader>
      <LayoutMainBody>body</LayoutMainBody>
    </LayoutMain>
  </Layout>
);
