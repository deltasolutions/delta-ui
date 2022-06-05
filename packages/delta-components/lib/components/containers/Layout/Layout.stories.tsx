import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { BiPhone, BiPhotoAlbum, BiPlanet } from 'react-icons/bi';
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

export const Basics = () => {
  const [activeId, setActiveId] = useState('1');
  return (
    <Layout>
      <LayoutSidebar>
        <LayoutSidebarHeader>
          <Heading sx={{ color: 'onPrimary' }} level={3}>
            Heading
          </Heading>
        </LayoutSidebarHeader>
        <LayoutSidebarBody>
          <LayoutNavigation activeId={activeId}>
            <LayoutNavigationGroup title="Group title">
              <LayoutNavigationItem
                onClick={() => setActiveId('1')}
                id="1"
                icon={BiPhone}
              >
                First
              </LayoutNavigationItem>
              <LayoutNavigationItem
                onClick={() => setActiveId('2')}
                id="2"
                icon={BiPhotoAlbum}
              >
                Second
              </LayoutNavigationItem>
              <LayoutNavigationItem
                onClick={() => setActiveId('3')}
                id="3"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>
            </LayoutNavigationGroup>
            <LayoutNavigationGroup title="Configuration">
              <LayoutNavigationItem
                onClick={() => setActiveId('4')}
                id="4"
                icon={BiPhone}
              >
                Display
              </LayoutNavigationItem>
              <LayoutNavigationItem
                onClick={() => setActiveId('10')}
                id="10"
                icon={BiPhone}
              >
                My bookmarks
              </LayoutNavigationItem>
              <LayoutNavigationItem
                onClick={() => setActiveId('5')}
                id="5"
                icon={BiPhotoAlbum}
              >
                Second
              </LayoutNavigationItem>
              <LayoutNavigationItem
                onClick={() => setActiveId('6')}
                id="6"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>
            </LayoutNavigationGroup>
            <LayoutNavigationGroup title="Subscriptions">
              <LayoutNavigationItem
                onClick={() => setActiveId('7')}
                id="7"
                icon={BiPhone}
              >
                First
              </LayoutNavigationItem>
              <LayoutNavigationItem
                onClick={() => setActiveId('8')}
                id="8"
                icon={BiPhotoAlbum}
              >
                Second
              </LayoutNavigationItem>
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                onClick={() => setActiveId('9')}
                id="9"
                icon={BiPlanet}
              >
                Third
              </LayoutNavigationItem>
            </LayoutNavigationGroup>
          </LayoutNavigation>
        </LayoutSidebarBody>
      </LayoutSidebar>
      <LayoutMain>
        <LayoutMainHeader>
          <Heading level={3}>
            <Breadcrumbs>
              <Anchor href="#" variant="pure">
                Home
              </Anchor>
              <Anchor href="#" variant="pure">
                Categories
              </Anchor>
              <Anchor
                href="#"
                variant="pure"
                sx={{ color: 'accentOnBackground' }}
              >
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
                quos, tenetur minima itaque quidem adipisci reprehenderit
                maiores hic, neque, numquam dolorem voluptatum quae magnam ea
                distinctio. Aut consectetur soluta rerum.
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
                quos, tenetur minima itaque quidem adipisci reprehenderit
                maiores hic, neque, numquam dolorem voluptatum quae magnam ea
                distinctio. Aut consectetur soluta rerum.
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
                quos, tenetur minima itaque quidem adipisci reprehenderit
                maiores hic, neque, numquam dolorem voluptatum quae magnam ea
                distinctio. Aut consectetur soluta rerum.
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
                quos, tenetur minima itaque quidem adipisci reprehenderit
                maiores hic, neque, numquam dolorem voluptatum quae magnam ea
                distinctio. Aut consectetur soluta rerum.
              </CardBody>
            </Card>
          </Box>
          <Box sx={{ height: '200vh', width: '1px' }} />
          Bottom Text
        </LayoutMainBody>
      </LayoutMain>
    </Layout>
  );
};
