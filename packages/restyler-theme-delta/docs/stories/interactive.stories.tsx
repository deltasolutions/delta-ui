import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, useCallback, useState } from 'react';
import * as R from 'restyler';

export default {
  title: 'General/Interactive'
} as Meta;

export const Anchor = () => {
  return <R.Anchor href="#">Anchor text</R.Anchor>;
};

export const Buttons = () => {
  const [disabled, setDisabled] = useState(false);
  return (
    <R.Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <R.Checkbox value={disabled} onChange={setDisabled}>
        Disabled
      </R.Checkbox>
      <R.Button disabled={disabled} kind="default">
        Default
      </R.Button>
      <R.Button disabled={disabled} kind="primary">
        Primary
      </R.Button>
      <R.Button disabled={disabled} kind="secondary">
        Secondary
      </R.Button>
      <R.Button disabled={disabled} kind="success">
        Success
      </R.Button>
      <R.Button disabled={disabled} kind="warning">
        Warning
      </R.Button>
      <R.Button disabled={disabled} kind="danger">
        Danger
      </R.Button>
    </R.Box>
  );
};

export const Modals = () => {
  const openModal = R.useModal(
    () => (
      <Fragment>
        <R.ModalHeader>Modal Header</R.ModalHeader>
        <R.ModalBody>Modal Body</R.ModalBody>
        <R.ModalFooter>Modal Footer</R.ModalFooter>
      </Fragment>
    ),
    { deps: [] }
  );
  const openQuestion = R.useQuestion(
    {
      heading: 'Question Heading',
      content: 'Question content here.'
    },
    { deps: [] }
  );
  return (
    <R.Box sx={{ display: 'flex', gap: 2 }}>
      <R.Button kind="primary" onClick={() => openModal()}>
        Open Modal
      </R.Button>
      <R.Button kind="primary" onClick={() => openQuestion()}>
        Open Question
      </R.Button>
    </R.Box>
  );
};

export const Notifications = () => {
  const openNotification = R.useNotification();
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
