import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button } from '../../Button';
import { Select, SelectOption, TextInput } from '../../inputs';
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
      <ModalBody sx={{ gap: 3, flexDirection: 'column', display: 'flex' }}>
        <TextInput placeholder="Placeholder" />
        <Select>
          <SelectOption value="Option">Option</SelectOption>
          <SelectOption value="Option pepega">Option pepega</SelectOption>
        </Select>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" variant="contained">
          Button
        </Button>
      </ModalFooter>
    </Modal>
  );
};
