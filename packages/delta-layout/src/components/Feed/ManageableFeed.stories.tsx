import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback, useContext, useState } from 'react';
import { LayoutUpdateTarget, FeedSectionDef } from '../../models';
import { LayoutUpdateContext } from '../LayoutUpdateContext';
import { SystemContainer } from '../SystemContainer';
import { FeedItem } from './FeedItem';
import { ManageableFeed } from './ManageableFeed';

export default {
  title: 'General/ConfiguredFeed'
} as Meta;

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

export const Basics = () => {
  const [sections, setSections] = useState<FeedSectionDef[]>([
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
  ]);
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
    <SystemContainer
      sx={{ padding: 4, minHeight: '100vh' }}
      onLayoutUpdateSave={async updates => {
        const feedUpdate = updates[LayoutUpdateTarget.Feed] ?? sections;
        setSections(feedUpdate);
      }}
    >
      <Toggler />
      <ManageableFeed registry={registry} sections={sections} />
    </SystemContainer>
  );
};
