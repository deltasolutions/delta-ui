import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box } from './Box';
import { Heading } from './Heading';

export default {
  title: 'Containers/Heading',
} as Meta;

export const Basics = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <Heading level={1}>Heading Level 1</Heading>
    <Heading level={2}>Heading Level 2</Heading>
    <Heading level={3}>Heading Level 3</Heading>
    <Heading level={4}>Heading Level 4</Heading>
    <Heading level={5}>Heading Level 5</Heading>
    <Heading level={6}>Heading Level 6</Heading>
  </Box>
);
