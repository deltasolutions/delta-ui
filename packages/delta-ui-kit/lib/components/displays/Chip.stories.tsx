import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box } from '../containers';
import { Chip } from './Chip';

export default {
  title: 'Displays/Chip',
} as Meta;

export const Basics = () => (
  <Box sx={{ display: 'flex', gap: 4 }}>
    <Chip variant="contained" onDelete={alert}>
      Alexander Emelyanov
    </Chip>
    <Chip variant="outlined">Emelyanov Alexander</Chip>
    <Chip variant="outlined" onDelete={alert}>
      Emelyanov Alexander
    </Chip>
  </Box>
);
