import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { TabGroup, TabOption } from '../../lib';

export default {
  title: 'Navigation/TabGroup',
} as Meta;

const options = ['First', 'Second', 'Third'];

export const Basics = () => {
  const [activeId, setActiveId] = useState(options[0]);
  return (
    <TabGroup activeId={activeId}>
      {options.map(v => (
        <TabOption onClick={() => setActiveId(v)} key={v} id={v}>
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