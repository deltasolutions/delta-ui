import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import FocusTrap from 'focus-trap-react';
import { CgProfile } from 'react-icons/cg';
import {
  Box,
  Button,
  Drop,
  DropOption,
  DropMenu,
  DropMenuItem,
} from '../components';
import { useDrop } from './useDrop';

export default {
  title: 'hooks/useDrop',
} as Meta;

export const Basics = () => {
  const [openDrop, anchorRef] = useDrop<HTMLButtonElement>(
    props => {
      return (
        <DropMenu handleClose={() => {}}>
          <DropMenuItem size="large" value={1}>
            <span>Logout</span>
          </DropMenuItem>
          <DropMenuItem size="large" value={2}>
            <span>Logout</span>
          </DropMenuItem>
        </DropMenu>
      );
    },
    {
      deps: [],
      tailored: false,
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
