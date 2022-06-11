import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, useContext, useLayoutEffect, useRef, useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { GrSettingsOption } from 'react-icons/gr';
import { IoMdSearch } from 'react-icons/io';
import { IoIosSettings } from 'react-icons/io';
import { MdOutlineSearch } from 'react-icons/md';
import { RiSettings5Line } from 'react-icons/ri';
import { TbHome2 } from 'react-icons/tb';
import { useModal } from '../../../hooks';
import { hash } from '../../../utils';
import { Anchor } from '../../Anchor';
import { Button } from '../../Button';
import {
  PairList,
  DataGrid,
  DataGridBody,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  DataGridBodyCell,
} from '../../displays';
import { TextInput } from '../../inputs';
import { Basics as FormStory } from '../../inputs/Form.stories';
import { Breadcrumbs, Pagination, TabGroup, TabOption } from '../../navs';
import { Box } from '../Box';
import { Card, CardBody, CardHeader } from '../Card';
import { Heading } from '../Heading';
import { Masonry } from '../Masonry';
import { ModalBody, ModalFooter, ModalHeader } from '../Modal';
import { Layout } from './Layout';
import { LayoutMain } from './LayoutMain';
import { LayoutMainBody } from './LayoutMainBody';
import { layoutHeaderHeight, LayoutMainHeader } from './LayoutMainHeader';
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
          <ExampleMenu />
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
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              maxWidth: '1600px',
            }}
          >
            <Masonry columns={{ count: 2 }} sx={{ '&, & > *': { gap: 3 } }}>
              <Card>
                <CardHeader>
                  <Heading level={2}>Information</Heading>
                </CardHeader>
                <CardBody>
                  <PairList
                    pairs={[
                      ['Name', 'Carly'],
                      ['Surname', 'Townsend'],
                      ['IP address', '192.168.l.254'],
                      ['Birth Date', '19.10.1996'],
                    ]}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae quos, tenetur minima itaque quidem adipisci
                  reprehenderit maiores hic, neque, numquam dolorem voluptatum
                  quae magnam ea distinctio. Aut consectetur soluta rerum.
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae quos, tenetur minima itaque quidem adipisci
                  reprehenderit maiores hic, neque, numquam dolorem voluptatum
                  quae magnam ea distinctio. Aut consectetur soluta rerum.
                </CardBody>
              </Card>
            </Masonry>
            <TabGroup activeId={activeId} sx={{ my: 3 }}>
              <TabOption id="1" onClick={() => setActiveId('1')}>
                First item
              </TabOption>
              <TabOption id="2" onClick={() => setActiveId('2')}>
                Second item
              </TabOption>
              <TabOption id="3" onClick={() => setActiveId('3')}>
                Third item
              </TabOption>
            </TabGroup>
            {
              {
                1: (
                  <Card>
                    <CardBody>
                      <ExampleDataGrid />
                    </CardBody>
                  </Card>
                ),
                2: (
                  <Masonry
                    columns={{ count: 2 }}
                    sx={{ '&, & > *': { gap: 3 } }}
                  >
                    <Card>
                      <CardHeader>
                        <Heading level={2}>Information</Heading>
                      </CardHeader>
                      <CardBody>
                        <PairList
                          pairs={[
                            ['Name', 'Carly'],
                            ['Surname', 'Townsend'],
                            ['IP address', '192.168.l.254'],
                            ['Birth Date', '19.10.1996'],
                          ]}
                        />
                      </CardBody>
                    </Card>
                    {/* <Card>
                      <CardBody>
                        <ExampleForm />
                      </CardBody>
                    </Card> */}
                    <Card>
                      <CardBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Beatae quos, tenetur minima itaque quidem adipisci
                        reprehenderit maiores hic, neque, numquam dolorem
                        voluptatum quae magnam ea distinctio. Aut consectetur
                        soluta rerum.
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Beatae quos, tenetur minima itaque quidem adipisci
                        reprehenderit maiores hic, neque, numquam dolorem
                        voluptatum quae magnam ea distinctio. Aut consectetur
                        soluta rerum.
                      </CardBody>
                    </Card>
                  </Masonry>
                ),
                3: <ExampleDataGrid />,
              }[activeId]
            }
            <Box sx={{ height: '200vh', width: '1px' }} />
            Bottom Text
          </Box>
        </LayoutMainBody>
      </LayoutMain>
    </Layout>
  );
};
const items = [
  {
    items: [{ title: 'Power' }, { title: 'Media' }, { title: 'Indication' }],
    group: 'Control',
  },
  {
    items: [
      { title: 'Server Authorizatuin' },
      { title: 'Location' },
      { title: 'Network' },
      { title: 'Firmware' },
      { title: 'SNMP' },
      { title: 'Ssl' },
      { title: 'Ntp' },
      { title: 'Fans' },
      { title: 'Notifications' },
      { title: 'User Interface' },
    ],
    group: 'Control',
  },
  {
    items: [
      { title: 'Server Authorizatuin' },
      { title: 'Location' },
      { title: 'Network' },
      { title: 'Firmware' },
      { title: 'SNMP' },
      { title: 'Ssl' },
      { title: 'Ntp' },
      { title: 'Fans' },
      { title: 'Notifications' },
      { title: 'User Interface' },
    ],
    group: 'Configuration',
  },
];
const ExampleMenu = () => {
  const [activeId, setActiveId] = useState('0');
  return (
    <LayoutNavigation activeId={activeId}>
      <LayoutNavigationItem
        icon={TbHome2}
        id="1"
        onClick={() => setActiveId('1')}
      >
        Dashboard
      </LayoutNavigationItem>
      <LayoutNavigationItem
        icon={MdOutlineSearch}
        id="2"
        onClick={() => setActiveId('2')}
      >
        Search
      </LayoutNavigationItem>
      <LayoutNavigationItem
        icon={RiSettings5Line}
        id="3"
        onClick={() => setActiveId('3')}
      >
        Settings
      </LayoutNavigationItem>
      <Box
        sx={{
          px: 3,
          mt: 3,
          color: 'onBackground',
          position: 'relative',
        }}
      >
        <TextInput
          placeholder="Search"
          sx={{
            color: 'onBackground',
            backgroundColor: 'transparent',

            borderBottomWidth: '0.3px',
            borderBottomStyle: 'solid',
            pr: 3,
            pl: 2,
            py: 1,
            borderBottomColor: 'border',
          }}
          variant="pure"
        />
        <CgSearch sx={{ position: 'absolute', top: 1, right: 3 }} />
      </Box>
      <Box
        sx={{
          overflowY: 'auto',
          background:
            'linear-gradient(#0a0a0a 33%, rgba(0,0,0, 0)), linear-gradient(rgba(0,0,0, 0), #0a0a0a 66%) 0 100%, linear-gradient(rgba(255,255,255, 0.04), rgba(0,0,0,0)), linear-gradient(rgba(0,0,0, 0), #0a0a0a 66%) 0 100%',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll',
          backgroundSize: '100% 51px, 100% 51px, 100% 17px, 100% 17px',
        }}
      >
        {items.map((node, index) => {
          return (
            <LayoutNavigationGroup key={index} title={node.group}>
              {node.items.map((item, index) => {
                return (
                  <LayoutNavigationItem
                    key={index}
                    id={item.title}
                    onClick={() => setActiveId(item.title)}
                  >
                    {item.title}
                  </LayoutNavigationItem>
                );
              })}
            </LayoutNavigationGroup>
          );
        })}
      </Box>
    </LayoutNavigation>
  );
};
const ExampleDataGrid = () => {
  const [active, setActive] = useState(1);
  const pages = 1000;
  const itemsPerPage = 20;
  const pagesLength = Math.ceil(pages / itemsPerPage);
  const onChage = v => {
    setActive(v);
  };
  const data = [
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
    {
      id: 1,
      name: 'Lorefidiandop',
      surname: 'Tetraideodss',
      birthDate: '19.10.2002',
    },
  ].map(d => ({ ...d, _setting: null }));
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(
      ([e]) => {
        console.log('event');
        return e.target.classList.toggle('chumba', e.intersectionRatio < 1);
      },
      {
        rootMargin: `-${layoutHeaderHeight + 1}px 0px 0px 0px`,
        threshold: [1],
      }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref.current]);

  const openModal = useModal(
    () => (
      <Fragment>
        <ModalHeader>
          <Heading level={3}>Настройки таблицы</Heading>
        </ModalHeader>
        <ModalBody>
          <FormStory />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Fragment>
    ),
    {
      deps: [],
    }
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <DataGrid
        sx={{
          '.chumba': {
            borderBottom: '1px solid',
            borderBottomColor: 'border',
            boxShadow: 1,
            backgroundColor: '#181818',
            mx: '-56px',
            px: '72px',
          },
        }}
      >
        <DataGridHeader
          ref={ref}
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 0,
            position: 'sticky',
            top: `${layoutHeaderHeight}px`,
            borderBottom: '1px solid',
            borderBottomColor: 'border',
            zIndex: 1,
          }}
        >
          <DataGridHeaderCell label="ID" sx={{ minWidth: '250px' }} />
          <DataGridHeaderCell label="Name" sx={{ minWidth: '250px' }} />
          <DataGridHeaderCell label="Surname" sx={{ minWidth: '250px' }} />
          <DataGridHeaderCell label="Birth Date" sx={{ minWidth: '250px' }} />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <TextInput
              placeholder="Search"
              startAdornment={
                <Button sx={{ ml: '2px' }} tabIndex={-1}>
                  <IoMdSearch size={18} />
                </Button>
              }
              sx={{ width: '210px' }}
            />
            <Button
              sx={{
                width: '32px',
                justifyContent: 'center',
                borderRadius: 4,
                backgroundColor: 'accentSurface',
                color: 'onSurface',
              }}
              onClick={() => openModal()}
            >
              <IoIosSettings size={22} sx={{}} />
            </Button>
          </Box>
        </DataGridHeader>
        <DataGridBody>
          {data.map((datum, index) => (
            <DataGridRow key={hash(datum) + index}>
              {Object.values(datum).map((d, index) => (
                <DataGridBodyCell
                  key={index}
                  sx={{ minWidth: d === null ? '100%' : '250px' }}
                >
                  {d}
                </DataGridBodyCell>
              ))}
            </DataGridRow>
          ))}
        </DataGridBody>
      </DataGrid>
      <Box sx={{ ml: 'auto' }}>
        <Pagination
          currentPage={active}
          pages={pagesLength}
          onChange={onChage}
        />
      </Box>
    </Box>
  );
};
