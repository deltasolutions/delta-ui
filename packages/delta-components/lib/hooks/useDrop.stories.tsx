import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Button, Select } from '../../lib';
import { useDrop } from './useDrop';

export default {
  title: 'hooks/useDrop',
  component: Select,
} as Meta;

export const Basics = () => {
  const [openDrop, anchorRef] = useDrop<HTMLButtonElement>(
    () => <Box sx={{ p: 3 }}>Content</Box>,
    { deps: [], tailored: true }
  );
  return (
    <Button ref={anchorRef} variant="contained" onClick={() => openDrop()}>
      Open Drop
    </Button>
  );
};
