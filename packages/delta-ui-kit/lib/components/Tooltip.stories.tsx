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
  const [openDrop, anchorRef] = useDrop(
    () => <Box sx={{ p: 2 }}>Ref passed</Box>,
    { deps: [] }
  );
  return (
    <Tooltip content="Tooltip content" delay={1000}>
      <Button
        ref={anchorRef}
        color="secondary"
        variant="outlined"
        onClick={() => openDrop()}
      >
        Hover or click
      </Button>
    </Tooltip>
  );
};
