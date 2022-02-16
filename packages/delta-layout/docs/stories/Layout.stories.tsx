import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, Suspense, useState } from 'react';
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
  IoSparkles,
  IoInvertMode
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
  MenuItem,
  TabGroup,
  TabOption,
  useModal
} from 'restyler';
import {
  Table as TableStory,
  PairList as PairListStory
} from '../../../restyler-theme-delta/docs/stories/data.stories';
import { darkTheme, theme } from '../../../restyler-theme-delta/lib/index';
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
  FeedItemBody,
  LocaleModal,
  LoadScreen
} from '../../lib';

export default {
  title: 'General/Layout'
} as Meta;

const brand = (
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
);

const menu = (
  <Menu sx={{ flex: '1 1 auto' }} activeIds={['dashboard']}>
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
  </Menu>
);

const LocaleButton = () => {
  const { openModal } = useModal();
  return (
    <Button
      onClick={() =>
        openModal({
          kind: 'small',
          render: props => (
            <LocaleModal
              locales={[{ title: 'English' }, { title: 'Русский' }]}
              {...props}
            />
          )
        })
      }
    >
      <IoLanguage />
    </Button>
  );
};

const settingsItem = (
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
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button kind="primary">Save</Button>
          <Button kind="secondary">Reset</Button>
        </Box>
      </Form>
    </FeedItemBody>
  </FeedItem>
);

const dataItem = (
  <FeedItem>
    <FeedItemHeader kind="tabs">
      <TabGroup>
        <TabOption isActive id="a">
          Tab A
        </TabOption>
        <TabOption id="b">Tab B</TabOption>
        <TabOption id="c">Tab C</TabOption>
      </TabGroup>
    </FeedItemHeader>
    <FeedItemBody>Lorem ipsum dolor sit amet</FeedItemBody>
    <FeedItemBody kind="table">
      <TableStory />
    </FeedItemBody>
  </FeedItem>
);

const pairListItem = (
  <FeedItem>
    <FeedItemHeader>
      <Heading kind="feedItem">Pair List</Heading>
    </FeedItemHeader>
    <FeedItemBody kind="pairList">
      <PairListStory />
    </FeedItemBody>
  </FeedItem>
);

const loadingItem = (
  <FeedItem isLoading>
    <FeedItemHeader>
      <Heading kind="feedItem">Not loaded for now</Heading>
    </FeedItemHeader>
    <FeedItemBody>Lorem ipsum dolor sit amet</FeedItemBody>
  </FeedItem>
);

export const Basics = () => {
  const [isDark, setIsDark] = useState(true);
  return (
    <AppContainer theme={isDark ? darkTheme : theme}>
      <Suspense fallback={<LoadScreen />}>
        <Layout>
          <LayoutSidebar>
            {brand}
            {menu}
            <LayoutSidebarExtras>
              <Button>
                <IoPersonCircle />
              </Button>
              <LocaleButton />
              <Button onClick={() => setIsDark(v => !v)}>
                <IoInvertMode />
              </Button>
            </LayoutSidebarExtras>
          </LayoutSidebar>
          <LayoutMain>
            <LayoutNavbar>
              <Heading kind="layoutNavbar">Dashboard</Heading>
              <LayoutNavbarExtras>
                <Button>
                  <IoSearchOutline />
                </Button>
                <IoHeartOutline sx={{ color: 'success' }} />
                <IoPowerOutline sx={{ color: 'danger' }} />
              </LayoutNavbarExtras>
            </LayoutNavbar>
            <LayoutBody kind="rounded">
              <Feed>
                <FeedSection kind="small">
                  {settingsItem}
                  {dataItem}
                  {pairListItem}
                  {loadingItem}
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
      </Suspense>
    </AppContainer>
  );
};
