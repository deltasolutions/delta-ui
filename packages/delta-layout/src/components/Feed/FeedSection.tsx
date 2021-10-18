import { jsx } from '@theme-ui/core';
import { BoxProps, Masonry, MasonryProps, useThemed } from 'restyler';

export interface FeedSectionProps
  extends BoxProps,
    Pick<MasonryProps, 'columns'> {}

export const FeedSection = ({
  columns,
  children,
  ...rest
}: FeedSectionProps) => {
  const ThemedFeedSection = useThemed('div', 'feed.section');
  return (
    <ThemedFeedSection {...rest}>
      <Masonry columns={columns}>{children}</Masonry>
    </ThemedFeedSection>
  );
};
