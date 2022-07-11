import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button, Modal, ModalBody } from '../components';
import { useModal } from './useModal';

export default {
  title: 'hooks/useModal',
} as Meta;

export const Basics = () => {
  const openModal = useModal(
    props => {
      return (
        <Modal {...props} sx={{ height: '100vh', position: 'relative' }}>
          <ModalBody sx={{ overflowY: 'auto', height: '100%' }}>
            Content <input placeholder="test escape" />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            totam alias aspernatur repellendus beatae error, vel exercitatione
          </ModalBody>
        </Modal>
      );
    },
    {
      size: 'auto',

      deps: [],
    }
  );
  return (
    <Button variant="contained" onClick={() => openModal()}>
      Open
    </Button>
  );
};
