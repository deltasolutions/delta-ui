import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { TabGroup } from './TabGroup';
import { TabOption } from './TabOption';

export default {
  title: 'Navs/TabGroup',
} as Meta;

const options = ['First item', 'Second item', 'Third item'];

export const Basics = () => {
  const [activeId, setActiveId] = useState(options[0]);
  return (
    <TabGroup activeId={activeId}>
      {options.map(v => (
        <TabOption key={v} id={v} onClick={() => setActiveId(v)}>
          {v}
        </TabOption>
      ))}
    </TabGroup>
  );
};

export const Hrefs = () => {
  return (
    <TabGroup activeId={options[0]}>
      {options.map(v => (
        <TabOption key={v} href="#" id={v}>
          {v}
        </TabOption>
      ))}
    </TabGroup>
  );
};
