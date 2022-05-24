import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button, ModalBody, useModal } from '../../lib';

export default {
  title: 'hooks/useModal',
} as Meta;

export const Basics = () => {
  const openModal = useModal(() => <ModalBody>Content</ModalBody>, {
    deps: [],
  });
  return (
    <Button variant="contained" onClick={() => openModal()}>
      Open
    </Button>
  );
};
