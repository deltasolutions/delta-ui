import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../lib';

export default {
  title: 'Containers/Modal',
} as Meta;

export const Basics = () => {
  return (
    <Modal>
      <ModalHeader>Header</ModalHeader>
      <ModalBody>Body</ModalBody>
      <ModalFooter>Footer</ModalFooter>
    </Modal>
  );
};
