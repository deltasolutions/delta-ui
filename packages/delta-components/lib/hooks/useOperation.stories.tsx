/** @jsx jsx */
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Button } from '../components';
import { useOperation } from './useOperation';

export default {
  title: 'hooks/useOperation',
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
    <Box
      sx={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {alerts}
      <Box sx={{ display: 'flex', gap: 2 }}>
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
    </Box>
  );
};
