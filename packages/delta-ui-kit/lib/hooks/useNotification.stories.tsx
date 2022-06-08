import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button } from '../components';
import { NotificationPlacement, useNotification } from './useNotification';

export default {
  title: 'hooks/useNotification',
} as Meta;

export const Basics = () => {
  const openNotification = useNotification();
  return (
    <Button
      variant="contained"
      onClick={() =>
        openNotification({
          placement: NotificationPlacement.TopRight,
          color: 'success',
          duration: 1000 * 6,
          render: () =>
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        })
      }
    >
      Open
    </Button>
  );
};
