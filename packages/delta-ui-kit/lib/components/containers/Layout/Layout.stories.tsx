import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { ImHome } from 'react-icons/im';
import { MdOutlineSettings, MdOutlineSpaceDashboard } from 'react-icons/md';
import { SiDeno } from 'react-icons/si';
import { Account } from '../../Account';
import { Anchor } from '../../Anchor';
import { Button } from '../../Button';
import { InCard } from '../../displays/Table/Table.stories';
import {
  Breadcrumbs,
  BreadcrumbsHome,
  BreadcrumbsItem,
  TabGroup,
  TabOption,
} from '../../navs';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { Layout } from './Layout';
import { LayoutMain } from './LayoutMain';
import { LayoutMainBody } from './LayoutMainBody';
import { LayoutMainHeader } from './LayoutMainHeader';
import { LayoutMainNavbar, layoutMainNavbarHeight } from './LayoutMainNavbar';
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
        <LayoutMainNavbar>
          {sticked => {
            return (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Breadcrumbs
                  sx={{
                    backgroundColor: sticked ? 'transparent' : undefined,
                    transition: 'background-color 0.15s linear',
                  }}
                >
                  <BreadcrumbsHome />
                  <BreadcrumbsItem>Datacenters</BreadcrumbsItem>
                  <BreadcrumbsItem>Datacenter 1</BreadcrumbsItem>
                </Breadcrumbs>
                <Account
                  sx={{
                    backgroundColor: sticked ? 'transparent' : undefined,
                    transition: 'background-color 0.15s linear',
                  }}
                >
                  root
                </Account>
              </Box>
            );
          }}
        </LayoutMainNavbar>
        <LayoutMainHeader
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Heading level={1}>Datacenter 1</Heading>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button zoomable color="secondary" variant="outlined">
              Edit
            </Button>
            <Button zoomable color="error" variant="outlined">
              Delete
            </Button>
          </Box>
        </LayoutMainHeader>
        <LayoutMainBody variant="tabs">
          <TabGroup activeId="3">
            <TabOption id="1" variant="layout">
              Overview
            </TabOption>
            <TabOption id="2" variant="layout">
              Rooms
            </TabOption>
            <TabOption id="3" variant="layout">
              Devices
            </TabOption>
          </TabGroup>
        </LayoutMainBody>
        <LayoutMainBody sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: '900px' }}>
            <InCard stickyOffset={layoutMainNavbarHeight} />
          </Box>
        </LayoutMainBody>
      </LayoutMain>
    </Layout>
  );
};
