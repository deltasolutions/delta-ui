import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback, useContext, useState } from 'react';
import { useLayoutUpdateManager } from '../../hooks';
import { FeedSectionDef, LayoutUpdateTarget } from '../../models';
import { LayoutUpdateContext } from '../Layout/LayoutUpdateContext';
import { SystemContainer } from '../SystemContainer';
import { Feed } from './Feed';
import { FeedItem } from './FeedItem';

export default {
  title: 'General/ConfiguredFeed'
} as Meta;

export const Basics = () => {
  return (
    <SystemContainer sx={{ padding: 4, minHeight: '100vh' }}>
      <Feed>
        <FeedItem sx={{ padding: 3 }}>Lorem ipsum dolor sit amet.</FeedItem>
      </Feed>
    </SystemContainer>
  );
};

const registry = [
  {
    id: 'a',
    title: 'A',
    description: 'Lorem ipsum dolor sit amet.',
    component: () => (
      <FeedItem sx={{ p: 3 }}>
        <div>1</div>
      </FeedItem>
    )
  },
  {
    id: 'b',
    title: 'B',
    description: 'Lorem ipsum dolor sit amet.',
    component: () => (
      <FeedItem sx={{ p: 3 }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </FeedItem>
    )
  },
  {
    id: 'c',
    title: 'C',
    description: 'Lorem ipsum dolor sit amet.',
    component: () => (
      <FeedItem sx={{ p: 3 }}>
        <div>1</div>
        <div>2</div>
      </FeedItem>
    )
  },
  {
    id: 'd',
    title: 'D',
    description: 'Lorem ipsum dolor sit amet.',
    component: () => (
      <FeedItem sx={{ p: 3 }}>
        <div>1</div>
        <div>2</div>
      </FeedItem>
    )
  },
  {
    id: 'e',
    title: 'E',
    description: 'Lorem ipsum dolor sit amet.',
    component: () => (
      <FeedItem sx={{ p: 3 }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </FeedItem>
    )
  }
];

const defaultSections = [
  {
    id: '1',
    columns: { count: 2 },
    items: [
      { id: 'a', componentId: 'a' },
      { id: 'b', componentId: 'b' },
      { id: 'c', componentId: 'c' }
    ]
  },
  {
    id: '2',
    columns: { count: 1 },
    items: [
      { id: 'd', componentId: 'd' },
      { id: 'e', componentId: 'e' }
    ]
  }
];

export const Manageable = () => {
  const [sections, setSections] = useState<FeedSectionDef[]>(defaultSections);
  const handleSave = useCallback(async updates => {
    const sections = updates[LayoutUpdateTarget.Feed];
    sections && setSections(sections);
  }, []);
  const updateManager = useLayoutUpdateManager({ onSave: handleSave });
  const Toggler = useCallback(() => {
    const { checkIfUpdating, save, allow } = useContext(LayoutUpdateContext);
    return (
      <button
        sx={{ mb: 4 }}
        onClick={() => {
          checkIfUpdating(LayoutUpdateTarget.Feed)
            ? save()
            : allow([LayoutUpdateTarget.Feed]);
        }}
      >
        Toggle
      </button>
    );
  }, []);
  return (
    <SystemContainer sx={{ padding: 4, minHeight: '100vh' }}>
      <LayoutUpdateContext.Provider value={updateManager}>
        <Toggler />
        <Feed managerOptions={{ registry, sections }} />
      </LayoutUpdateContext.Provider>
    </SystemContainer>
  );
};
