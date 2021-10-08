import { Meta } from '@storybook/react';
import { Box, Anchor, Button } from 'restyler';

export default {
  title: 'General/Interaction'
} as Meta;

export const BasicAnchor = () => {
  return <Anchor>Anchor text</Anchor>;
};

export const BasicButtons = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button kind="default">Default</Button>
      <Button kind="primary">Primary</Button>
      <Button kind="secondary">Secondary</Button>
      <Button kind="success">Success</Button>
      <Button kind="warning">Warning</Button>
      <Button kind="danger">Danger</Button>
    </Box>
  );
};
