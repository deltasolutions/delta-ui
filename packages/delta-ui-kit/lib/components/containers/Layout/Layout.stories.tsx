import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, useState } from 'react';
import { BiPhone, BiPhotoAlbum, BiPlanet } from 'react-icons/bi';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { useModal, useOperation } from '../../../hooks';
import { Anchor } from '../../Anchor';
import { Button } from '../../Button';
import {
  PairList,
  DataGrid,
  DataGridBody,
  DataGridHead,
  DataGridHeadCell,
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
              gap: 4,
              maxWidth: '1200px',
            }}
          >
            <Heading level={1} sx={{ color: 'accentOnSurface' }}>
              Users
            </Heading>
            <Box>
              <DataGrid>
                <DataGridHead>
                  <DataGridHeadCell sx={{ width: '250px' }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Heading level={6}>Id</Heading>
                      <Tooltip content="Sort Ascending">
                        <Button sx={{ display: 'flex', mt: '4px' }}>
                          <FaSortUp />
                        </Button>
                      </Tooltip>
                    </Box>
                  </DataGridHeadCell>
                  <DataGridHeadCell sx={{ width: '250px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Heading level={6}>Name</Heading>
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
                  </DataGridHeadCell>
                  <DataGridHeadCell sx={{ width: '250px' }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Heading level={6}>Surname</Heading>
                      <Tooltip content="Lorem Ipsum is Ipsum.">
                        <Button sx={{ display: 'flex', alignItems: 'center' }}>
                          <BsFillInfoCircleFill sx={{ color: 'outline' }} />
                        </Button>
                      </Tooltip>
                    </Box>
                  </DataGridHeadCell>
                  <DataGridHeadCell sx={{ width: '250px' }}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Heading level={6}>Birth Date</Heading>
                      <Tooltip content="Lorem Ipsum is simply dummy text 's Ipsum.">
                        <Button sx={{ display: 'flex', alignItems: 'center' }}>
                          <BsFillInfoCircleFill sx={{ color: 'outline' }} />
                        </Button>
                      </Tooltip>
                    </Box>
                  </DataGridHeadCell>
                </DataGridHead>
                <DataGridBody>
                  <DataGridRow>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      1
                    </DataGridBodyCell>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      Alexander
                    </DataGridBodyCell>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      Zosimus
                    </DataGridBodyCell>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      4.05.2002
                    </DataGridBodyCell>
                  </DataGridRow>
                  <DataGridRow>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      2
                    </DataGridBodyCell>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      Alexey
                    </DataGridBodyCell>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      Corinna
                    </DataGridBodyCell>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      31.04.1931
                    </DataGridBodyCell>
                  </DataGridRow>
                  <DataGridRow>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      3
                    </DataGridBodyCell>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      Jack
                    </DataGridBodyCell>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      Menelaos
                    </DataGridBodyCell>
                    <DataGridBodyCell sx={{ width: '250px' }}>
                      18.01.2000
                    </DataGridBodyCell>
                  </DataGridRow>
                </DataGridBody>
              </DataGrid>
            </Box>
            <Masonry columns={{ count: 2 }} sx={{ '&, & > *': { gap: 1 } }}>
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
const ExampleMenu = () => {
  const [activeId, setActiveId] = useState('1');
  return (
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
      console.log(v);
    },
    {
      deps: [],
      getAlert: () =>
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quos, tenetur minima itaque quidem adipisci reprehenderit maiores hic, neque, numquam dolorem voluptatum quae magnam ea distinctio. Aut consectetur soluta rerum.  ',
      getNotification: isOk => ({
        render: () => (isOk ? 'lorem' : 'lorem'),
        placement: 'topRight',
        duration: 4000,
      }),
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
        <FormField label="FilePicker" name="filePicker">
          <FilePicker>Pick Files</FilePicker>
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
