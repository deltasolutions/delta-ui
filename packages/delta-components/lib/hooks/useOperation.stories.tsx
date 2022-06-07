/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { compact } from '../../docs/decorators';
import { AlertHolder, Box, Button } from '../components';
import { useOperation } from './useOperation';

export default {
  title: 'hooks/useOperation',
  decorators: [compact('350px')],
} as Meta;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const Basics = () => {
  const [handleClick, alerts] = useOperation(
    async (shouldFail?: boolean) => {
      await delay(1000);
      if (shouldFail) {
        throw new Error();
      }
    },
    {
      deps: [],
      getQuestion: () => ({
        heading: 'Important Heading',
        content: 'Are you sure you want to continue?',
      }),
      getNotification: isOk => (isOk ? 'Success' : 'Failure'),
      getAlert: isOk => (isOk ? undefined : 'Failure'),
    }
  );
  return (
    <Fragment>
      <AlertHolder>{alerts}</AlertHolder>
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => handleClick()}>
          Success
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleClick(true)}
        >
          Failure
        </Button>
      </Box>
    </Fragment>
  );
};
