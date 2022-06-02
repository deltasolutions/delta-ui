import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor } from '../../Anchor';
import { PairList } from '../../displays';
import { Breadcrumbs } from '../../navs';
import { Box } from '../Box';
import { Card, CardBody } from '../Card';
import { Heading } from '../Heading';
import { Layout } from './Layout';
import { LayoutMain } from './LayoutMain';
import { LayoutMainBody } from './LayoutMainBody';
import { LayoutMainHeader } from './LayoutMainHeader';
import {
  LayoutSidebar,
  LayoutSidebarBody,
  LayoutSidebarHeader,
} from './LayoutSidebar';

export default {
  title: 'Containers/Layout',
} as Meta;

export const Basics = () => (
  <Layout>
    <LayoutSidebar>
      <LayoutSidebarHeader>LayoutSidebarHeader</LayoutSidebarHeader>
      <LayoutSidebarBody>LayoutSidebarBody</LayoutSidebarBody>
    </LayoutSidebar>
    <LayoutMain>
      <LayoutMainHeader>
        <Heading level={4}>
          <Breadcrumbs>
            <Anchor variant="pure">Home</Anchor>
            <Anchor variant="pure">Categories</Anchor>
            <Anchor variant="pure" sx={{ color: 'accentOnBackground' }}>
              Laptops
            </Anchor>
          </Breadcrumbs>
        </Heading>
      </LayoutMainHeader>
      <LayoutMainBody>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: '1fr 2fr',
          }}
        >
          <Card>
            <CardBody>
              <PairList
                pairs={[
                  ['Key', 'Value'],
                  ['Key fjdsifj sadijfodsfgjoidsjg ', 'Value'],
                  ['Key', 'Value'],
                  ['Key', 'Value'],
                  ['Key', 'Value'],
                ]}
              />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              quos, tenetur minima itaque quidem adipisci reprehenderit maiores
              hic, neque, numquam dolorem voluptatum quae magnam ea distinctio.
              Aut consectetur soluta rerum.
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              quos, tenetur minima itaque quidem adipisci reprehenderit maiores
              hic, neque, numquam dolorem voluptatum quae magnam ea distinctio.
              Aut consectetur soluta rerum.
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              quos, tenetur minima itaque quidem adipisci reprehenderit maiores
              hic, neque, numquam dolorem voluptatum quae magnam ea distinctio.
              Aut consectetur soluta rerum.
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              quos, tenetur minima itaque quidem adipisci reprehenderit maiores
              hic, neque, numquam dolorem voluptatum quae magnam ea distinctio.
              Aut consectetur soluta rerum.
            </CardBody>
          </Card>
        </Box>
        <Box sx={{ height: '200vh', width: '1px' }} />
        Bottom Text
      </LayoutMainBody>
    </LayoutMain>
  </Layout>
);
