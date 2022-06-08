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
          <Heading level={3} sx={{ color: 'onPrimary' }}>
            Heading
          </Heading>
        </LayoutSidebarHeader>
        <LayoutSidebarBody>
          <LayoutNavigation activeId={activeId}>
            <LayoutNavigationGroup title="Group title">
              <LayoutNavigationItem
                icon={BiPhone}
                id="1"
                onClick={() => setActiveId('1')}
              >
                First
              </LayoutNavigationItem>
              <LayoutNavigationItem
                icon={BiPhotoAlbum}
                id="2"
                onClick={() => setActiveId('2')}
              >
                Second
              </LayoutNavigationItem>
              <LayoutNavigationItem
                icon={BiPlanet}
                id="3"
                onClick={() => setActiveId('3')}
              >
                Third
              </LayoutNavigationItem>
            </LayoutNavigationGroup>
            <LayoutNavigationGroup title="Configuration">
              <LayoutNavigationItem
                icon={BiPhone}
                id="4"
                onClick={() => setActiveId('4')}
              >
                Display
              </LayoutNavigationItem>
              <LayoutNavigationItem
                icon={BiPhone}
                id="10"
                onClick={() => setActiveId('10')}
              >
                My bookmarks
              </LayoutNavigationItem>
              <LayoutNavigationItem
                icon={BiPhotoAlbum}
                id="5"
                onClick={() => setActiveId('5')}
              >
                Second
              </LayoutNavigationItem>
              <LayoutNavigationItem
                icon={BiPlanet}
                id="6"
                onClick={() => setActiveId('6')}
              >
                Third
              </LayoutNavigationItem>
            </LayoutNavigationGroup>
            <LayoutNavigationGroup title="Subscriptions">
              <LayoutNavigationItem
                icon={BiPhone}
                id="7"
                onClick={() => setActiveId('7')}
              >
                First
              </LayoutNavigationItem>
              <LayoutNavigationItem
                icon={BiPhotoAlbum}
                id="8"
                onClick={() => setActiveId('8')}
              >
                Second
              </LayoutNavigationItem>
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
              >
                Third
              </LayoutNavigationItem>{' '}
              <LayoutNavigationItem
                icon={BiPlanet}
                id="9"
                onClick={() => setActiveId('9')}
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
                sx={{ color: 'accentOnBackground' }}
                variant="pure"
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
