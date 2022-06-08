import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Modal } from './Modal';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';

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
