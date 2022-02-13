import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import {
  IoBagHandle,
  IoGrid,
  IoCalendarClear,
  IoHeartOutline,
  IoLanguage,
  IoPersonCircle,
  IoPowerOutline,
  IoSearchOutline,
  IoPeople,
  IoSchool,
  IoShieldHalf,
  IoSparkles
} from 'react-icons/io5';
import {
  Box,
  Button,
  Form,
  FormField,
  FormGrid,
  Heading,
  Menu,
  MenuGroup,
  MenuItem
} from 'restyler';
import { theme } from '../../../restyler-theme-delta/lib/index';
import {
  Layout,
  LayoutFooter,
  AppContainer,
  LayoutBody,
  LayoutSidebar,
  LayoutMain,
  LayoutFooterCompanyInfo,
  LayoutSidebarExtras,
  LayoutNavbar,
  LayoutNavbarExtras,
  Feed,
  FeedSection,
  FeedItem,
  FeedItemHeader,
  FeedItemBody
} from '../../lib';

export default {
  title: 'General/Layout'
} as Meta;

const menuContent = (
  <Fragment>
    <MenuItem id="dashboard">
      <IoGrid />
      Dashboard
    </MenuItem>
    <MenuItem id="orders">
      <IoBagHandle />
      Orders
    </MenuItem>
    <MenuItem id="tasks">
      <IoCalendarClear />
      Tasks
    </MenuItem>
    <MenuItem id="services">
      <IoSparkles />
      Services
    </MenuItem>
    <MenuGroup
      id="administration"
      title={
        <Fragment>
          <IoShieldHalf />
          Administration
        </Fragment>
      }
    >
      <MenuItem id="users">
        <IoPeople />
        Users
      </MenuItem>
      <MenuItem id="roles">
        <IoSchool />
        Roles
      </MenuItem>
    </MenuGroup>
  </Fragment>
);

export const Basics = () => {
  return (
    <AppContainer theme={theme}>
      <Layout>
        <LayoutSidebar>
          <Box
            sx={{
              mt: 4,
              pb: 4,
              mb: 3,
              borderBottom: '1px solid',
              borderBottomColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img
              src="https://www.deltasolutions.ru/images/logo-minimal.svg"
              sx={{
                width: '50px',
                height: '50px',
                filter: 'contrast(0) brightness(1.8)'
              }}
            />
          </Box>
          <Menu sx={{ flex: '1 1 auto' }} activeIds={['dashboard']}>
            {menuContent}
          </Menu>
          <LayoutSidebarExtras>
            <Button kind="icon">
              <IoPersonCircle />
            </Button>
            <Button kind="icon">
              <IoLanguage />
            </Button>
          </LayoutSidebarExtras>
        </LayoutSidebar>
        <LayoutMain>
          <LayoutNavbar>
            <Heading kind="navbar">Dashboard</Heading>
            <LayoutNavbarExtras>
              <Button>
                <IoSearchOutline />
              </Button>
              <IoHeartOutline sx={{ color: 'success' }} />
              <IoPowerOutline sx={{ color: 'danger' }} />
            </LayoutNavbarExtras>
          </LayoutNavbar>
          {/* <LayoutHeader kind="rounded">Title</LayoutHeader> */}
          <LayoutBody kind="rounded">
            <Feed>
              <FeedSection kind="small">
                <FeedItem>
                  <FeedItemHeader>
                    <Heading kind="feedItem">Settings</Heading>
                  </FeedItemHeader>
                  <FeedItemBody>
                    <Form>
                      <FormGrid>
                        <FormField name="username" label="Username" />
                        <FormField name="password" label="Password" />
                      </FormGrid>
                      <Button kind="primary" sx={{ mt: 3 }}>
                        Save
                      </Button>
                      <Button kind="secondary" sx={{ mt: 3, ml: 2 }}>
                        Reset
                      </Button>
                    </Form>
                  </FeedItemBody>
                </FeedItem>
              </FeedSection>
            </Feed>
          </LayoutBody>
          <LayoutFooter>
            <LayoutFooterCompanyInfo
              companyName="Delta Solutions"
              companyUrl="https://www.deltasolutions.ru/"
              year={2022}
            />
          </LayoutFooter>
        </LayoutMain>
      </Layout>
    </AppContainer>
  );
};
