import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { CgProfile } from 'react-icons/cg';
import { Box, Button, Drop, DropOption } from '../components';
import { useDrop } from './useDrop';

export default {
  title: 'hooks/useDrop',
} as Meta;

export const Basics = () => {
  const [openDrop, anchorRef] = useDrop<HTMLButtonElement>(
    props => {
      console.log(props);
      return (
        <Drop>
          <DropOption>
            <CgProfile size={20} />
            <span>Profile</span>
          </DropOption>
          <DropOption>
            <CgProfile size={20} />
            <span>Settings</span>
          </DropOption>
          <DropOption>
            <CgProfile size={20} />
            <span>Logout</span>
          </DropOption>
        </Drop>
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
