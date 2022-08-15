import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Box, Button } from '../components';
import { useDrop } from './useDrop';

export default {
  title: 'hooks/useDrop',
} as Meta;

export const Basics = () => {
  const [openDrop, anchorRef] = useDrop<HTMLButtonElement>(
    () => {
      return <Box sx={{ width: '300px', height: '300px' }}>SAMPLE</Box>;
    },
    {
      deps: [],
      tailored: false,
      style: { borderRadius: '200px' },
      blurResistant: false,
      placement: 'bottom-start',
    }
  );
  return (
    <Box>
      <Button ref={anchorRef} variant="contained" onClick={() => openDrop()}>
        Open Drop
      </Button>
      <input placeholder="text focus" type="text" />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
      molestias id, fuga blanditiis cum impedit! Alias hic aperiam nobis aut,
      repellendus rem inventore magni iure commodi nesciunt et ipsam quae!m
    </Box>
  );
};
