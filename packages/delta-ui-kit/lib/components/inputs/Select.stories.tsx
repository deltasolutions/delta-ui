import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { compact } from '../../../docs/decorators';
import { Select, SelectOption } from './Select';

export default {
  title: 'Inputs/Select',
  decorators: [compact('250px')],
} as Meta;

const films = [
  {
    name: 'Toy Story',
    decade: '1990s',
  },
  {
    name: 'A Bugs Life',
    decade: '1990s',
  },
  {
    name: 'Toy Story 2',
    decade: '1990s',
  },
  {
    name: 'Monsters, Inc.',
    decade: '2000s',
  },
  {
    name: 'Finding Nemo',
    decade: '2000s',
  },
  {
    name: 'Toy Story',
    decade: '1990s',
  },
  {
    name: 'A Bugs Life',
    decade: '1990s',
  },
  {
    name: 'Toy Story 2',
    decade: '1990s',
  },
  {
    name: 'Monsters, Inc.',
    decade: '2000s',
  },
  {
    name: 'Finding Nemo',
    decade: '2000s',
  },
  {
    name: 'Toy Story 2',
    decade: '1990s',
  },
  {
    name: 'Monsters, Inc.',
    decade: '2000s',
  },
  {
    name: 'Finding Nemo',
    decade: '2000s',
  },
  {
    name: 'Toy Story',
    decade: '1990s',
  },
  {
    name: 'A Bugs Life',
    decade: '1990s',
  },
  {
    name: 'Toy Story 2',
    decade: '1990s',
  },
  {
    name: 'Monsters, Inc.',
    decade: '2000s',
  },
  {
    name: 'Finding Nemo',
    decade: '2000s',
  },
].map((i, index) => ({ ...i, id: (index * index).toString() }));
export const Basics = () => {
  const [value, setValue] = useState<string>('2');
  return (
    <Select
      value={value}
      onChange={v => {
        console.log('v', v);
        setValue(v);
      }}
    >
      {films.map(film => (
        <SelectOption key={film.id} value={film.id}>
          {film.name}
        </SelectOption>
      ))}
    </Select>
  );
};

export const Empty = () => {
  const [value, setValue] = useState<string>('2');
  return (
    <Select
      placeholder="Select something"
      value={value}
      onChange={v => {
        console.log('v', v);
        setValue(v);
      }}
    >
      {[]}
    </Select>
  );
};
