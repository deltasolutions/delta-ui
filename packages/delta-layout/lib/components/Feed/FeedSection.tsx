import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { BoxProps, Masonry, MasonryProps, useThemed } from 'restyler';

export interface FeedSectionProps extends BoxProps {
  columns?: MasonryProps['columns'];
  masonryKind?: string;
}

export const FeedSection = forwardRef<HTMLDivElement, FeedSectionProps>(
  (
    {
      masonryKind = 'feedSectionContent',
      columns = { count: 1 },
      children,
      ...rest
    },
    ref
  ) => {
    const ThemedFeedSection = useThemed('div', 'feed.section');
    return (
      <ThemedFeedSection ref={ref} {...rest}>
        <Masonry kind={masonryKind} columns={columns}>
          {children}
        </Masonry>
      </ThemedFeedSection>
    );
  }
);
