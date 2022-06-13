import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { TabGroup, TabOption } from '../../../navs';
import { Box } from '../../Box';
import { Card, CardBody, CardHeader } from '../../Card';
import { Heading } from '../../Heading';
import { Layout } from '../Layout';
import { LayoutMain } from '../LayoutMain';
import { LayoutMainBody } from '../LayoutMainBody';
import { layoutHeaderHeight } from '../LayoutMainHeader';
import { DeviceTable } from './DeviceTable';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export default {
  title: 'Containers/Layout',
} as Meta;

export const Layout1 = () => {
  return (
    <Layout>
      <Sidebar />
      <LayoutMain>
        <Header />
        <LayoutMainBody>
          <TabGroup activeId="1">
            <TabOption id="1">Item 1</TabOption>
            <TabOption id="2">Item 2</TabOption>
            <TabOption id="3">Item 3</TabOption>
          </TabGroup>
          <Card
            sx={{
              width: 'fit-content',
              height: '400px',
              overflow: 'scroll',
            }}
          >
            <CardHeader>
              <Heading level={3}>Heading</Heading>
            </CardHeader>
            <CardBody>
              <DeviceTable stickyOffset={-1} />
            </CardBody>
          </Card>
          <Box sx={{ height: '1000px' }} />
          <Box sx={{ width: 'fit-content' }}>
            <DeviceTable stickyOffset={layoutHeaderHeight} />
          </Box>
          <Box sx={{ height: '1000px' }} />
        </LayoutMainBody>
      </LayoutMain>
    </Layout>
  );
};
