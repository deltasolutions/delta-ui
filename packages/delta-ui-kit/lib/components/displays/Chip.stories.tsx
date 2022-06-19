import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useRef, useState } from 'react';
import { Button } from '../Button';
import { Box } from '../containers';
import { Chip } from './Chip';

export default {
  title: 'Displays/Chip',
} as Meta;

export const Basics = () => {
  const [items, setItems] = useState([
    'Alexander Emelyanov',
    'Emelyanov Alexander',
    'Name Surname',
  ]);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button ref={ref} color="secondary" variant="contained">
        Listener
      </Button>
      {items.map(item => (
        <Chip
          key={item}
          variant={item === 'Alexander Emelyanov' ? 'contained' : 'outlined'}
          onDelete={
            item === 'Name Surname'
              ? undefined
              : () => setItems(prev => prev.filter(i => i !== item))
          }
        >
          {item}
        </Chip>
      ))}
    </Box>
  );
};
