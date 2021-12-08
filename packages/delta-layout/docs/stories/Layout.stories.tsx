import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { IoIosHeartEmpty, IoIosPower } from 'react-icons/io';
import { IoArchiveOutline, IoArrowUndoOutline } from 'react-icons/io5';
import { IoBook, IoSettings } from 'react-icons/io5';
import { Button } from 'restyler';
import { AppContainer } from '../../lib/components/AppContainer';
import { Layout } from '../../lib/components/Layout/Layout';
import { LayoutFooterCompanyInfo } from '../../lib/components/Layout/LayoutFooterCompanyInfo';
import { useLocalLayoutMenu } from '../../lib/hooks';

export default {
  title: 'General/Layout'
} as Meta;

export const Basics = () => {
  const menu = useLocalLayoutMenu({
    entries: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: 'IoBook'
      },
      {
        id: 'settings',
        title: 'Settings',
        icon: 'IoSettings',
        subs: [
          { id: 'ui', title: 'UI' },
          { id: 'users', title: 'Users' }
        ]
      }
    ],
    activeIds: [],
    icons: {
      IoBook,
      IoSettings
    }
  });
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
        footer={{
          content: (
            <LayoutFooterCompanyInfo
              logoSrc="https://www.deltasolutions.ru/images/logo-minimal.svg"
              companyName="Delta Solutions"
              companyUrl="https://www.deltasolutions.ru/"
              years={[2006, 2021]}
            />
          )
        }}
        sidebar={{
          account: { title: 'root' },
          menu
        }}
      >
        Content
      </Layout>
    </AppContainer>
  );
};

export const WithoutSidebar = () => {
  return (
    <AppContainer>
      <Layout
        header={{
          title: 'Heading',
          extras: (
            <Fragment>
              <Button>
                <IoArrowUndoOutline />
              </Button>
              <Button>
                <IoArchiveOutline />
              </Button>
            </Fragment>
          )
        }}
        footer={{
          content: 'Footer'
        }}
      >
        Content
      </Layout>
    </AppContainer>
  );
};
