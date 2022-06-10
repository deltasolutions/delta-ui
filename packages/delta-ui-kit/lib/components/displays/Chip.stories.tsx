import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
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
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {items.map(item => (
        <Chip
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
