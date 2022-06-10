import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, useState } from 'react';
import { BiPhone, BiPhotoAlbum, BiPlanet } from 'react-icons/bi';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { CgSearch } from 'react-icons/cg';
import { FaSortDown, FaSortUp, FaSearch } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md';
import { RiSettings5Line } from 'react-icons/ri';
import { TbHome2 } from 'react-icons/tb';
import { useModal, useOperation } from '../../../hooks';
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
import {
  Form,
  FormGrid,
  FormField,
  Switch,
  Select,
  SelectOption,
  Radio,
  RadioOption,
  Slider,
  FilePicker,
  TextArea,
  TextInput,
} from '../../inputs';
import { Checkbox } from '../../inputs';
import { Breadcrumbs } from '../../navs';
import { Tooltip } from '../../Tooltip';
import { AlertHolder } from '../AlertHolder';
import { Box } from '../Box';
import { Card, CardBody, CardHeader } from '../Card';
import { Heading } from '../Heading';
import { Masonry } from '../Masonry';
import { ModalBody } from '../Modal';
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
              maxWidth: '1200px',
            }}
          >
            <Card>
              <CardHeader>
                <Heading level={2}>Users</Heading>
              </CardHeader>
              <CardBody>
                <ExampleDataGrid />
              </CardBody>
            </Card>
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
                  <ExampleForm />
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
        {items.map(node => {
          return (
            <LayoutNavigationGroup title={node.group}>
              {node.items.map(item => {
                return (
                  <LayoutNavigationItem
                    key={item.title}
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
  return (
    <DataGrid>
      <DataGridHeader>
        <DataGridHeaderCell sx={{ width: '250px' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Heading level={5}>ID</Heading>
            <Tooltip content="Sort Ascending">
              <Button sx={{ display: 'flex', mt: '4px' }}>
                <FaSortUp />
              </Button>
            </Tooltip>
          </Box>
        </DataGridHeaderCell>
        <DataGridHeaderCell sx={{ width: '250px' }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Heading level={5}>Name</Heading>
            <Tooltip content="Descending sort">
              <Button
                sx={{
                  display: 'flex',
                  mt: '-3px',
                  alignItems: 'center',
                }}
              >
                <FaSortDown />
              </Button>
            </Tooltip>
          </Box>
        </DataGridHeaderCell>
        <DataGridHeaderCell sx={{ width: '250px' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Heading level={5}>Surname</Heading>
            <Tooltip content="Lorem Ipsum is Ipsum.">
              <Button sx={{ display: 'flex', alignItems: 'center' }}>
                <BsFillInfoCircleFill sx={{ opacity: 0.5 }} />
              </Button>
            </Tooltip>
          </Box>
        </DataGridHeaderCell>
        <DataGridHeaderCell sx={{ width: '250px' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Heading level={5}>Birth Date</Heading>
            <Tooltip content="Lorem Ipsum is simply dummy text 's Ipsum.">
              <Button sx={{ display: 'flex', alignItems: 'center' }}>
                <BsFillInfoCircleFill sx={{ opacity: 0.5 }} />
              </Button>
            </Tooltip>
          </Box>
        </DataGridHeaderCell>
      </DataGridHeader>
      <DataGridBody>
        <DataGridRow>
          <DataGridBodyCell sx={{ width: '250px' }}>1</DataGridBodyCell>
          <DataGridBodyCell sx={{ width: '250px' }}>Alexander</DataGridBodyCell>
          <DataGridBodyCell sx={{ width: '250px' }}>Zosimus</DataGridBodyCell>
          <DataGridBodyCell sx={{ width: '250px' }}>4.05.2002</DataGridBodyCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridBodyCell sx={{ width: '250px' }}>2</DataGridBodyCell>
          <DataGridBodyCell sx={{ width: '250px' }}>Alexey</DataGridBodyCell>
          <DataGridBodyCell sx={{ width: '250px' }}>Corinna</DataGridBodyCell>
          <DataGridBodyCell sx={{ width: '250px' }}>
            31.04.1931
          </DataGridBodyCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridBodyCell sx={{ width: '250px' }}>3</DataGridBodyCell>
          <DataGridBodyCell sx={{ width: '250px' }}>Jack</DataGridBodyCell>
          <DataGridBodyCell sx={{ width: '250px' }}>Menelaos</DataGridBodyCell>
          <DataGridBodyCell sx={{ width: '250px' }}>
            18.01.2000
          </DataGridBodyCell>
        </DataGridRow>
      </DataGridBody>
    </DataGrid>
  );
};

const ExampleForm = () => {
  const openModal = useModal<unknown>(
    ({ context }) => {
      return (
        <ModalBody>
          <pre>{JSON.stringify(context, null, 2)}</pre>
        </ModalBody>
      );
    },
    { deps: [] }
  );
  const [handleSubmit, alerts] = useOperation(
    async v => {
      if (Math.random() > 0.5) {
        throw new Error();
      }
    },
    {
      deps: [],
      getAlert: isOk =>
        isOk
          ? 'Success lorem ipsum dolor sit amet consectetur adipisicing elit.'
          : 'false',
      getNotification: isOk =>
        isOk
          ? 'Success lorem ipsum dolor sit amet consectetur adipisicing elit.'
          : 'Unable to resolve service for type ¨Microsoft.entityFrameworkCore.DbContextOptions¨1[LibraryData.LibraryContext] while attempting to activate.',
    }
  );
  return (
    <Form
      sx={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit}
    >
      <FormGrid columns={{ count: 1 }}>
        <AlertHolder>{alerts}</AlertHolder>
        <FormField label="Default Widget" name="defaultWidget" />
        <FormField name="switch">
          <Switch>Switch</Switch>
        </FormField>
        <FormField name="checkbox">
          <Checkbox>Checkbox</Checkbox>
        </FormField>
        <FormField label="Select" name="select">
          <Select>
            <SelectOption value={1}>A</SelectOption>
            <SelectOption value={2}>B</SelectOption>
            <SelectOption value={3}>C</SelectOption>
          </Select>
        </FormField>
        <FormField label="Radio" name="radio">
          <Radio>
            <RadioOption value={1}>A</RadioOption>
            <RadioOption value={2}>B</RadioOption>
            <RadioOption value={3}>C</RadioOption>
          </Radio>
        </FormField>
        <FormField label="Slider" name="slider">
          <Slider />
        </FormField>
        <FormField label="MultipleFilePicker" name="MultipleFilePicker">
          <FilePicker multiple={true} />
        </FormField>
        <FormField label="FilePicker" name="filePicker">
          <FilePicker multiple={false} />
        </FormField>
        <FormField label="TextArea" name="textArea">
          <TextArea />
        </FormField>
      </FormGrid>
      <Button sx={{ mt: 4, ml: 'auto' }} type="submit" variant="contained">
        Submit
      </Button>
    </Form>
  );
};
