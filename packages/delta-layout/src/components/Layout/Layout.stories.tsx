import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
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
    >
      Content
    </Layout>
  </SystemContainer>
);
