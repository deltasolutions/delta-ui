import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { AppContainer, Feed, FeedItem } from '../../lib';

export default {
  title: 'General/ConfiguredFeed'
} as Meta;

export const Basics = () => {
  return (
    <AppContainer sx={{ padding: 4, minHeight: '100vh' }}>
      <Feed>
        <FeedItem sx={{ padding: 3 }}>Lorem ipsum dolor sit amet.</FeedItem>
      </Feed>
    </AppContainer>
  );
};
