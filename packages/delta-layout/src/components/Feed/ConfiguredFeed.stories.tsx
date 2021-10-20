import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useLayoutUpdateManager } from '../../hooks';
import { LayoutUpdateTarget } from '../../models';
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
  const manager = useLayoutUpdateManager({
    onSave: (...args) => console.warn(...args)
  });
  return (
    <LayoutUpdateContext.Provider value={manager}>
      <SystemContainer sx={{ padding: 4, minHeight: '100vh' }}>
        <button
          sx={{ mb: 4 }}
          onClick={() => {
            Object.keys(manager.updates).length > 0
              ? manager.cancel()
              : manager.allow([LayoutUpdateTarget.Feed]);
          }}
        >
          Toggle
        </button>
        <ConfiguredFeed
          registry={registry}
          sections={[
            {
              columns: { count: 2 },
              items: ['a', 'b', 'c', 'd']
            }
          ]}
        />
      </SystemContainer>
    </LayoutUpdateContext.Provider>
  );
};
