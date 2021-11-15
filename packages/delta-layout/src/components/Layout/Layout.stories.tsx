import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { IoIosHeartEmpty, IoIosPower } from 'react-icons/io';
import { Box } from 'restyler';
import { useLocalLayoutMenu } from '../../hooks';
import { LayoutMenuEntryDef } from '../../models';
import { AppContainer } from '../AppContainer';
import { Layout } from './Layout';

export default {
  title: 'General/Layout'
} as Meta;

export const Basics = () => {
  const menu = useLocalLayoutMenu({ entries, activeIds: [] });
  return (
    <AppContainer>
      <Layout
        header={{
          title: 'Heading',
          extras: (
            <Fragment>
              <IoIosHeartEmpty sx={{ color: 'success' }} />
              <IoIosPower sx={{ color: 'danger' }} />
            </Fragment>
          )
        }}
        sidebar={{
          account: { title: 'root' },
          menu
        }}
        logoSrc="http://www.deltasolutions.ru/images/logo-minimal.svg"
      >
        Content
      </Layout>
    </AppContainer>
  );
};

const entries: LayoutMenuEntryDef[] = [
  {
    id: 'dashboard',
    title: 'Dashboard'
  },
  {
    id: 'settings',
    title: 'Settings',
    subs: [
      { id: 'ui', title: 'UI' },
      { id: 'users', title: 'Users' }
    ]
  }
];

export const CustomFooter = () => {
  const menu = useLocalLayoutMenu({ entries, activeIds: [] });
  return (
    <AppContainer>
      <Layout
        header={{ title: 'Heading' }}
        footer={{
          left: <Box>Left</Box>,
          right: <Box>Right</Box>
        }}
        sidebar={{
          account: { title: 'root' },
          menu
        }}
        logoSrc="http://www.deltasolutions.ru/images/logo-minimal.svg"
      >
        Content
      </Layout>
    </AppContainer>
  );
};
