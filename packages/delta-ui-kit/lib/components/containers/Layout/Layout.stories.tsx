import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { MdOutlineSettings, MdOutlineSpaceDashboard } from 'react-icons/md';
import { SiDeno } from 'react-icons/si';
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

export const Basics = () => {
  return (
    <Layout>
      <LayoutSidebar>
        <LayoutSidebarHeader>
          <SiDeno
            sx={{
              width: '3.45rem',
              height: '3.45rem',
              verticalAlign: 'middle',
              mx: 'auto',
              mt: 2,
            }}
          />
        </LayoutSidebarHeader>
        <LayoutSidebarBody>
          <LayoutNavigation activeId="0-1">
            <LayoutNavigationItem icon={MdOutlineSpaceDashboard} id="0-1">
              Dashboard
            </LayoutNavigationItem>
            <LayoutNavigationItem icon={MdOutlineSettings} id="0-2">
              Settings
            </LayoutNavigationItem>
            <LayoutNavigationGroup title="Group 1">
              <LayoutNavigationItem id="1-0">Devices</LayoutNavigationItem>
              <LayoutNavigationItem id="1-1">Rooms</LayoutNavigationItem>
            </LayoutNavigationGroup>
            <LayoutNavigationGroup title="Group 2">
              <LayoutNavigationItem id="2-0">Racks</LayoutNavigationItem>
              <LayoutNavigationItem id="2-1">Display</LayoutNavigationItem>
              <LayoutNavigationItem id="2-2">Interface</LayoutNavigationItem>
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
};
