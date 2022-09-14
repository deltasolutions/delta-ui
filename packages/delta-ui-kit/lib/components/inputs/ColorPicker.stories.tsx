import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Box } from '../containers';
import { ColorPicker } from './ColorPicker';

export default {
  title: 'Inputs/ColorPicker',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => {
  return (
    <Box sx={{ gap: 2, flexDirection: 'column', display: 'flex' }}>
      <ColorPicker />
    </Box>
  );
};
