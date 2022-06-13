import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, useCallback, useLayoutEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useDrop, useModal } from '../../../../hooks';
import { Button } from '../../../Button';
import { TextInput } from '../../../inputs';
import { TabGroup, TabOption } from '../../../navs';
import { Box } from '../../Box';
import { Card, CardBody, CardHeader } from '../../Card';
import { Heading } from '../../Heading';
import { ModalBody } from '../../Modal';
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
      <CommandPalette />
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
              overflowY: 'auto',
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

const CommandPalette = () => {
  const openModal = useModal(() => <PaletteModal />, {
    deps: [],
  });
  const commandPaletteListener = useCallback(event => {
    if (event.ctrlKey || event.metaKey) {
      if (event.keyCode == 75) {
        console.log('open');

        openModal();
      }
    }
  }, []);
  useLayoutEffect(() => {
    window.addEventListener('keydown', commandPaletteListener);
    return () => {
      window.removeEventListener('keydown', commandPaletteListener);
    };
  }, []);
  return null;
};

const PaletteModal = () => {
  const [value, setValue] = useState('');
  const helpArray = [
    { fits: '', label: '' },
    { fits: 'devices', label: 'Dashboard > Rooms > Devices' },
    { fits: 'rooms', label: 'Dashboard > Rooms' },
    { fits: 'theme', label: 'Settings > Advanced > Theme' },
  ];
  const helpText = helpArray.find(i =>
    i.fits.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  ) ?? { label: '', fits: '' };
  return (
    <ModalBody
      sx={{
        p: 0,
        minHeight: '800px',
        border: '1px solid',
        borderRadius: 5,
        borderColor: 'border',
      }}
    >
      <Box
        sx={{
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderBottomColor: 'border',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              mx: 2,

              width: '100%',
              display: 'flex',
              color: 'onSurface',
              alignItems: 'center',
            }}
          >
            <TextInput
              startAdornment={
                <Button sx={{ visibility: 'hidden' }} tabIndex={-1}>
                  <IoMdSearch size={21} />
                </Button>
              }
              sx={{
                fontSize: 3,
                fontFamily: 'Arial',
                color: 'onSurface',
                width: '100%',
              }}
              value={value}
              variant="pure"
              onChange={setValue}
              onKeyDown={e => {
                if (e.code === 'Tab') {
                  setValue(helpText.label);
                }
              }}
            />
            <TextInput
              startAdornment={
                <Button tabIndex={-1}>
                  <IoMdSearch size={21} />
                </Button>
              }
              sx={{
                fontSize: 3,
                width: '100%',
                fontFamily: 'Arial',
                color: 'rgba(255,255,255,0.15)',
                position: 'absolute',
                left: 0,
                top: 0,
              }}
              tabIndex={-1}
              value={helpText.label}
              variant="pure"
            />
          </Box>
        </Box>
      </Box>
    </ModalBody>
  );
};
