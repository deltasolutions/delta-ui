import { jsx } from '@theme-ui/core';
import { BoxProps, useThemed } from 'restyler';

export interface FeedProps extends BoxProps {}

export const Feed = (props: FeedProps) => {
  const ThemedFeed = useThemed('div', 'feed');
  return <ThemedFeed {...props} />;
};
