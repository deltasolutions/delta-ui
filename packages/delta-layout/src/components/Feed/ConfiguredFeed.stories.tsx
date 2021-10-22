import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useCallback, useContext, useState } from 'react';
import { LayoutUpdateTarget, FeedSectionOptions } from '../../models';
import { LayoutUpdateContext } from '../LayoutUpdateContext';
import { SystemContainer } from '../SystemContainer';
import { ConfiguredFeed } from './ConfiguredFeed';
import { FeedItem } from './FeedItem';

export default {
  title: 'General/ConfiguredFeed'
} as Meta;

const registry = {
  a: () => (
    <FeedItem sx={{ p: 3 }}>
      <div>1</div>
    </FeedItem>
  ),
  b: () => (
    <FeedItem sx={{ p: 3 }}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </FeedItem>
  ),
  c: () => (
    <FeedItem sx={{ p: 3 }}>
      <div>1</div>
      <div>2</div>
    </FeedItem>
  ),
  d: () => (
    <FeedItem sx={{ p: 3 }}>
      <div>1</div>
      <div>2</div>
    </FeedItem>
  )
};

export const Basics = () => {
  const [sections, setSections] = useState<FeedSectionOptions[]>([
    {
      columns: { count: 2 },
      items: ['a', 'b', 'c', 'd']
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
      <ConfiguredFeed registry={registry} sections={sections} />
    </SystemContainer>
  );
};
