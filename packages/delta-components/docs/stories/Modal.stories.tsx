import { ComponentMeta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor, Modal, ModalBody, ModalFooter, ModalHeader } from '../../lib';

export default {
  title: 'Containers/Modal',
} as ComponentMeta<typeof Anchor>;

export const Basics = () => {
  return (
    <Modal>
      <ModalHeader>Header</ModalHeader>
      <ModalBody>Body</ModalBody>
      <ModalFooter>Footer</ModalFooter>
    </Modal>
  );
};
