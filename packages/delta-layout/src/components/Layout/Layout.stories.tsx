import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { IoIosHeartEmpty, IoIosPower } from 'react-icons/io';
import { useLocalLayoutMenu } from '../../hooks';
import { PageDef } from '../../models';
import { SystemContainer } from '../SystemContainer';
import { Layout } from './Layout';

export default {
  title: 'General/Layout'
} as Meta;

export const Basics = () => {
  const menu = useLocalLayoutMenu({ pages });
  return (
    <SystemContainer>
      <Layout
        pages={pages}
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
    </SystemContainer>
  );
};

const pages: PageDef[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    id: 'settings',
    title: 'Settings',
    subs: [
      {
        id: 'ui',
        title: 'UI',
        path: '/settings/ui'
      },
      {
        id: 'users',
        title: 'Users',
        path: '/settings/users'
      }
    ]
  }
];
