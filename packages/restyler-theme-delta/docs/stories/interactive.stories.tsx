/** @jsxRuntime classic */
/** @jsx jsx */
import { Meta } from '@storybook/react';
import { Fragment, useCallback } from 'react';
import * as R from 'restyler';
import { jsx } from 'theme-ui';

export default {
  title: 'General/Interactive'
} as Meta;

export const Anchor = () => {
  return <R.Anchor href="#">Anchor text</R.Anchor>;
};

export const Buttons = () => {
  return (
    <R.Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <R.Button kind="default">Default</R.Button>
      <R.Button kind="primary">Primary</R.Button>
      <R.Button kind="secondary">Secondary</R.Button>
      <R.Button kind="success">Success</R.Button>
      <R.Button kind="warning">Warning</R.Button>
      <R.Button kind="danger">Danger</R.Button>
    </R.Box>
  );
};

export const Modals = () => {
  const { openModal, openQuestion } = R.useModal();
  const handleModal = useCallback(
    () =>
      openModal({
        render: () => (
          <Fragment>
            <R.ModalHeader>Modal Header</R.ModalHeader>
            <R.ModalBody>Modal Body</R.ModalBody>
            <R.ModalFooter>Modal Footer</R.ModalFooter>
          </Fragment>
        )
      }),
    [openModal]
  );
  const handleQuestion = useCallback(
    () =>
      openQuestion({
        heading: 'Question Heading',
        content: 'Question content here.'
      }),
    [openQuestion]
  );
  return (
    <R.Box sx={{ display: 'flex', gap: 2 }}>
      <R.Button kind="primary" onClick={handleModal}>
        Open Modal
      </R.Button>
      <R.Button kind="primary" onClick={handleQuestion}>
        Open Question
      </R.Button>
    </R.Box>
  );
};

export const Notifications = () => {
  const { openNotification } = R.useNotification();
  return (
    <R.Button
      kind="primary"
      onClick={() =>
        openNotification({
          kind: 'success',
          duration: 500,
          render: () => 'Lorem ipsum dolor sit amet'
        })
      }
    >
      Open Notification
    </R.Button>
  );
};
