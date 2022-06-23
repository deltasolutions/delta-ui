import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, ReactNode } from 'react';
import { MdOutlineSettings, MdOutlineSpaceDashboard } from 'react-icons/md';
import { SiDeno } from 'react-icons/si';
import { useModal } from '../../../hooks';
import { Account } from '../../Account';
import { Anchor } from '../../Anchor';
import { Button } from '../../Button';
import { InCard as TableStory } from '../../displays/Table/Table.stories';
import { Basics as FormStory } from '../../inputs/Form.stories';
import {
  Breadcrumbs,
  BreadcrumbsHome,
  BreadcrumbsItem,
  TabGroup,
  TabOption,
} from '../../navs';
import { Box } from '../Box';
import { Card, CardBody } from '../Card';
import { Heading } from '../Heading';
import { ModalBody, ModalHeader } from '../Modal';
import { Layout } from './Layout';
import { LayoutMain } from './LayoutMain';
import { LayoutMainBody } from './LayoutMainBody';
import { LayoutMainFooter } from './LayoutMainFooter';
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

const sidebar = (
  <LayoutSidebar>
    <LayoutSidebarHeader>
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
);

const navbar = (breadcrumbsItems = null as ReactNode) => (
  <LayoutMainNavbar>
    {sticked => {
      return (
        <Fragment>
          <Breadcrumbs
            sx={{
              backgroundColor: sticked ? 'transparent' : undefined,
              transition: 'background-color 0.15s linear',
            }}
          >
            {breadcrumbsItems}
          </Breadcrumbs>
          <Account
            sx={{
              backgroundColor: sticked ? 'transparent' : undefined,
              transition: 'background-color 0.15s linear',
            }}
          >
            root
          </Account>
        </Fragment>
      );
    }}
  </LayoutMainNavbar>
);

const footer = (
  <LayoutMainFooter>
    <Anchor href="https://deltasolutions.ru" variant="pure">
      DELTA Solutions
    </Anchor>
    <Anchor variant="pure">© 2022</Anchor>
  </LayoutMainFooter>
);

export const Resource = () => {
  return (
    <Layout>
      {sidebar}
      <LayoutMain>
        {navbar([
          <BreadcrumbsHome />,
          <BreadcrumbsItem>Datacenters</BreadcrumbsItem>,
          <BreadcrumbsItem>Datacenter 1</BreadcrumbsItem>,
        ])}
        <LayoutMainHeader>
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
            <TabOption id="1" variant="bookmark">
              Overview
            </TabOption>
            <TabOption id="2" variant="bookmark">
              Rooms
            </TabOption>
            <TabOption id="3" variant="bookmark">
              Devices
            </TabOption>
          </TabGroup>
        </LayoutMainBody>
        <LayoutMainBody
          size="medium"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <TableStory stickyOffset={layoutMainNavbarHeight} />
        </LayoutMainBody>
        {footer}
      </LayoutMain>
    </Layout>
  );
};

export const Collection = () => {
  const openModal = useModal(
    () => (
      <Fragment>
        <ModalHeader>
          <Heading level={3}>Create Device</Heading>
        </ModalHeader>
        <ModalBody>Sample</ModalBody>
      </Fragment>
    ),
    { deps: [] }
  );
  return (
    <Layout>
      {sidebar}
      <LayoutMain>
        {navbar([
          <BreadcrumbsHome />,
          <BreadcrumbsItem>Devices</BreadcrumbsItem>,
        ])}
        <LayoutMainHeader>
          <Heading level={1}>Devices</Heading>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              zoomable
              color="secondary"
              variant="outlined"
              onClick={() => openModal()}
            >
              Create
            </Button>
          </Box>
        </LayoutMainHeader>
        <LayoutMainBody
          size="medium"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <TableStory
            heading={
              <TabGroup activeId="1">
                <TabOption id="1" variant="chip">
                  All
                </TabOption>
                <TabOption id="2" variant="chip">
                  Found
                </TabOption>
              </TabGroup>
            }
            stickyOffset={layoutMainNavbarHeight}
          />
        </LayoutMainBody>
        {footer}
      </LayoutMain>
    </Layout>
  );
};

export const Form = () => {
  return (
    <Layout>
      {sidebar}
      <LayoutMain>
        {navbar([
          <BreadcrumbsHome />,
          <BreadcrumbsItem>Devices</BreadcrumbsItem>,
          <BreadcrumbsItem>Device 1</BreadcrumbsItem>,
          <BreadcrumbsItem>Edit</BreadcrumbsItem>,
        ])}
        <LayoutMainHeader>
          <Heading level={1}>Edit Device 1</Heading>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button zoomable color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button zoomable color="success" variant="outlined">
              Save
            </Button>
          </Box>
        </LayoutMainHeader>
        <LayoutMainBody
          size="small"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card>
            <CardBody>
              <FormStory submitter={null} />
            </CardBody>
          </Card>
        </LayoutMainBody>
        {footer}
      </LayoutMain>
    </Layout>
  );
};
