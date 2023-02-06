import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import { compact } from '../../../docs/decorators';
import { Select, SelectOption, SelectOptionProps } from './Select';

export default {
  title: 'Inputs/Select',
  decorators: [compact('250px')],
} as Meta;

const options = [
  <SelectOption key={1} value={1}>
    A
  </SelectOption>,
  <SelectOption key={2} value={2}>
    B
  </SelectOption>,
  <SelectOption key={3} value={3}>
    C
  </SelectOption>,
];

export const Basics = () => {
  return <Select placeholder="Placeholder">{options}</Select>;
};

export const Empty = () => {
  return <Select placeholder="Empty">{[]}</Select>;
};

export const Disabled = () => {
  return (
    <Select disabled placeholder="Disabled">
      {options}
    </Select>
  );
};

export const Async = () => {
  const [items, setItems] = useState<{ id: string; title: string }[]>([
    { id: '1', title: 'Text1' },
    { id: '2', title: 'Text2' },
    { id: '3', title: 'Text3' },
  ]);
  useEffect(() => {
    setTimeout(() => {
      setItems([
        { id: '1', title: 'UpdatedText1' },
        { id: '2', title: 'UpdatedText2' },
        { id: '3', title: 'UpdatedText3' },
      ]);
    }, 1000);
  }, []);
  return (
    <Select placeholder="Disabled">
      {items.map(i => (
        <SelectOption key={i.id + i.title} value={i.id}>
          {i.title}
        </SelectOption>
      ))}
    </Select>
  );
};
