import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, ReactNode } from 'react';
import { BsHddRack } from 'react-icons/bs';
import { IoMapOutline, IoTrashBin } from 'react-icons/io5';
import {
  MdOutlineMeetingRoom,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import { RiEditFill } from 'react-icons/ri';
import { useDeltaTheme, useModal } from '../../../hooks';
import { Account } from '../../Account';
import { Anchor } from '../../Anchor';
import { Button } from '../../Button';
import { DeltaLogo } from '../../DeltaLogo';
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
    <LayoutSidebarHeader
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'baseline',
      }}
    >
      <DeltaLogo
        // bottomColor="brandBeta"
        bottomColor="accentPrimary"
        sx={{ maxWidth: '3rem', my: 2 }}
        topColor="brandAlpha"
      />
      {/* <Heading level={3}>Delta DCM</Heading> */}
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
              backgroundColor: sticked ? undefined : undefined,
              transition: 'background-color 0.15s linear',
            }}
          >
            Profile
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
  const { colors } = useDeltaTheme();
  return (
    <Layout>
      {sidebar}
      <LayoutMain>
        {navbar([
          <BreadcrumbsHome key="1" />,
          <BreadcrumbsItem key="2">Datacenters</BreadcrumbsItem>,
          <BreadcrumbsItem key="3">Datacenter 1</BreadcrumbsItem>,
        ])}
        <LayoutMainHeader>
          <Heading level={1}>Datacenter 1</Heading>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="secondary"
              icon={RiEditFill}
              variant="contained-dimmed"
            >
              Edit
            </Button>
            <Button color="error" icon={IoTrashBin} variant="contained-dimmed">
              Delete
            </Button>
          </Box>
        </LayoutMainHeader>
        <LayoutMainBody variant="wide">
          <TabGroup activeId="3" sx={{ position: 'relative', zIndex: 1 }}>
            <TabOption icon={IoMapOutline} id="1" variant="bookmark">
              Overview
            </TabOption>
            <TabOption icon={MdOutlineMeetingRoom} id="2" variant="bookmark">
              Rooms
            </TabOption>
            <TabOption icon={BsHddRack} id="3" variant="bookmark">
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
          <BreadcrumbsHome key="1" />,
          <BreadcrumbsItem key="2">Devices</BreadcrumbsItem>,
        ])}
        <LayoutMainHeader>
          <Heading level={1}>Devices</Heading>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="secondary"
              variant="contained-dimmed"
              onClick={() => openModal()}
            >
              Create
            </Button>
          </Box>
        </LayoutMainHeader>
        <LayoutMainBody
          size="medium"
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
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
          <BreadcrumbsHome key="1" />,
          <BreadcrumbsItem key="2">Devices</BreadcrumbsItem>,
          <BreadcrumbsItem key="3">Device 1</BreadcrumbsItem>,
          <BreadcrumbsItem key="4">Edit</BreadcrumbsItem>,
        ])}
        <LayoutMainHeader>
          <Heading level={1}>Edit Device 1</Heading>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button color="secondary" variant="contained-dimmed">
              Cancel
            </Button>
            <Button color="success" variant="contained-dimmed">
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
