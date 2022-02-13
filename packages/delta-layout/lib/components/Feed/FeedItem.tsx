import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { BoxProps, useThemed, useThemedFactory, useTransition } from 'restyler';

export interface FeedItemProps extends BoxProps {
  isLoading?: boolean;
}

export const FeedItem = forwardRef<HTMLDivElement, FeedItemProps>(
  ({ isLoading, children, ...rest }, ref) => {
    const useThemed = useThemedFactory<Pick<FeedItemProps, 'isLoading'>>();
    const ThemedFeedItem = useThemed('div', 'feed.item');
    const ThemedFeedItemLoader = useThemed('div', 'feed.item.loader');
    const extraProps = { isLoading };
    const loader = useTransition<HTMLDivElement>(
      (transitionProps, ref) => (
        <ThemedFeedItemLoader {...transitionProps} ref={ref} />
      ),
      {
        deps: [],
        isMounted: !!isLoading
      }
    );
    return (
      <ThemedFeedItem ref={ref} {...extraProps} {...rest}>
        {children}
        {loader}
      </ThemedFeedItem>
    );
  }
);

const createFeedItemSection = (path: string) =>
  forwardRef<HTMLDivElement, BoxProps>(({ children, ...rest }, ref) => {
    const ThemedFeedItemSection = useThemed('div', path);
    return (
      <ThemedFeedItemSection ref={ref} {...rest}>
        {children}
      </ThemedFeedItemSection>
    );
  });

export const FeedItemHeader = createFeedItemSection('feed.item.header');
export const FeedItemBody = createFeedItemSection('feed.item.body');
export const FeedItemFooter = createFeedItemSection('feed.item.footer');
export const FeedItemTable = createFeedItemSection('feed.item.table');
export const FeedItemTabs = createFeedItemSection('feed.item.tabs');
