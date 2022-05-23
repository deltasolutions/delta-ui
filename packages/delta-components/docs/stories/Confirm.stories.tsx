import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  Button,
  Confirm,
  ConfirmBody,
  ConfirmFooter,
  ConfirmHeader,
} from '../../lib';

export default {
  title: 'Containers/Confirm',
} as Meta;

export const Basics = () => {
  return (
    <Confirm>
      <ConfirmHeader>Header</ConfirmHeader>
      <ConfirmBody>Body</ConfirmBody>
      <ConfirmFooter>
        <Button variant="text">Cancel</Button>
        <Button variant="contained">Confirm</Button>
      </ConfirmFooter>
    </Confirm>
  );
};
