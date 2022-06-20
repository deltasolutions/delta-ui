import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { MdOutlineSettings, MdOutlineSpaceDashboard } from 'react-icons/md';
import { SiDeno } from 'react-icons/si';
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

export const Basics = () => {
  return (
    <Layout>
      <LayoutSidebar>
        <LayoutSidebarHeader
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <SiDeno
            sx={{
              width: '2rem',
              height: '2rem',
              verticalAlign: 'middle',
            }}
          />
          <Heading level={3}>Brand</Heading>
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
        <LayoutMainBody>
          <div sx={{ height: '3000px' }}></div>
        </LayoutMainBody>
      </LayoutMain>
    </Layout>
  );
};
