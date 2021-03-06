import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  Box,
  Button,
  DropMenu,
  DropMenuItem,
  ModalBody,
  Select,
  SelectOption,
  Tooltip,
} from '../components';
import { useDrop } from './useDrop';
import { useModal } from './useModal';

export default {
  title: 'hooks/useModal',
} as Meta;

export const Basics = () => {
  const openModal = useModal(
    () => {
      return <Modal />;
    },
    {
      size: 'medium',
      deps: [],
    }
  );
  return (
    <Button variant="contained" onClick={() => openModal()}>
      Open
    </Button>
  );
};

const Modal = () => {
  const [openDrop, anchorRef] = useDrop(
    props => {
      return (
        <DropMenu {...props}>
          <DropMenuItem size="large" value={1}>
            <span>Logout</span>
          </DropMenuItem>
          <DropMenuItem size="large" value={2}>
            <span>Logout</span>
          </DropMenuItem>
        </DropMenu>
      );
    },
    {
      deps: [],
      tailored: false,
      blurResistant: false,
      placement: 'bottom-start',
    }
  );
  return (
    <ModalBody sx={{ overflowY: 'auto', height: '100%' }}>
      <Button ref={anchorRef} variant="contained" onClick={() => openDrop()}>
        Open Drop
      </Button>
      <Select>
        <SelectOption value={1}>1</SelectOption>
        <SelectOption value={2}>2</SelectOption>
      </Select>
      <Box sx={{ width: '100%', height: '100px' }} onClick={() => {}}></Box>
      <Tooltip content="Content rendered">
        <Button>Tooltip test</Button>
      </Tooltip>
    </ModalBody>
  );
};
