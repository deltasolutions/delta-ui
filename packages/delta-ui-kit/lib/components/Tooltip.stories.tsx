import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useDrop } from '../hooks';
import { Button } from './Button';
import { Box } from './containers';
import { Tooltip } from './Tooltip';

export default {
  title: 'Interactive/Tooltip',
} as Meta;

export const Basics = () => {
  const [openDrop, anchorRef] = useDrop(() => <Box>SUKAA</Box>, { deps: [] });
  return (
    <Tooltip content="Bebra" delay={1000}>
      <Button
        ref={anchorRef}
        color="secondary"
        variant="outlined"
        onClick={() => openDrop()}
      >
        Abobus
      </Button>
    </Tooltip>
  );
};
