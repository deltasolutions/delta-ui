import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button, ModalBody } from '../components';
import { useModal } from './useModal';

export default {
  title: 'hooks/useModal',
} as Meta;

export const Basics = () => {
  const openModal = useModal(
    () => {
      return (
        <ModalBody sx={{ overflowY: 'auto', height: '100%' }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae totam
          alias aspernatur repellendus beatae error, vel exercitatione
        </ModalBody>
      );
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
