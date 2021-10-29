import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { IoIosHeartEmpty, IoIosPower } from 'react-icons/io';
import { SystemContainer } from '../SystemContainer';
import { Layout } from './Layout';

export default {
  title: 'General/Layout'
} as Meta;

export const Basics = () => (
  <SystemContainer>
    <Layout
      heading="Heading"
      account="root"
      logoSrc="http://www.deltasolutions.ru/images/logo-minimal.svg"
      headerExtras={
        <Fragment>
          <IoIosHeartEmpty sx={{ color: 'success' }} />
          <IoIosPower sx={{ color: 'danger' }} />
        </Fragment>
      }
    >
      Content
    </Layout>
  </SystemContainer>
);
