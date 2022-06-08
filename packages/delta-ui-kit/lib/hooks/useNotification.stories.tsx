import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Button } from '../components';
import { useNotification } from './useNotification';

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
          color: 'success',
          duration: 500,
          render: () => 'Lorem ipsum dolor sit amet',
        })
      }
    >
      Open
    </Button>
  );
};
