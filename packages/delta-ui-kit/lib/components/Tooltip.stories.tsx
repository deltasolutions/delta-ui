import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useDrop } from '../hooks';
import { Button } from './Button';
import { Box, Card, CardBody } from './containers';
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
    <Card>
      <CardBody sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>Lorem ipsum dolor sit amet.</Box>
        <Tooltip content="Tooltip content" delay={0}>
          <Button
            ref={anchorRef}
            color="secondary"
            variant="outlined"
            onClick={() => openDrop()}
          >
            Hover or click
          </Button>
        </Tooltip>
      </CardBody>
    </Card>
  );
};
