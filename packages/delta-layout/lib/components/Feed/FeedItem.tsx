import { jsx } from '@theme-ui/core';
import { createContext, forwardRef, useContext, useMemo } from 'react';
import { BoxProps, useThemed, useThemedFactory, useTransition } from 'restyler';

export interface FeedItemContextValue {
  isLoading: boolean;
}
export const FeedItemContext = createContext({ isLoading: false });

export interface FeedItemProps extends BoxProps {
  isLoading?: boolean;
}

export const FeedItem = forwardRef<HTMLDivElement, FeedItemProps>(
  ({ isLoading, children, ...rest }, ref) => {
    const useThemed = useThemedFactory<FeedItemContextValue>();
    const ThemedFeedItem = useThemed('div', 'feed.item');
    const ThemedFeedItemLoader = useThemed('div', 'feed.item.loader');
    const contextValue = useMemo(
      () => ({ isLoading: !!isLoading }),
      [isLoading]
    );
    const loader = useTransition<HTMLDivElement>(
      (transitionProps, ref) => (
        <ThemedFeedItemLoader
          ref={ref}
          isLoading={!!isLoading}
          {...transitionProps}
        />
      ),
      {
        deps: [],
        isMounted: !!isLoading
      }
    );
    return (
      <ThemedFeedItem ref={ref} {...contextValue} {...rest}>
        <FeedItemContext.Provider value={contextValue}>
          {children}
          {loader}
        </FeedItemContext.Provider>
      </ThemedFeedItem>
    );
  }
);

const createFeedItemSection = (path: string) =>
  forwardRef<HTMLDivElement, BoxProps>(({ children, ...rest }, ref) => {
    const useThemed = useThemedFactory<FeedItemContextValue>();
    const ThemedFeedItemSection = useThemed('div', path);
    const contextValue = useContext(FeedItemContext);
    return (
      <ThemedFeedItemSection ref={ref} {...contextValue} {...rest}>
        {children}
      </ThemedFeedItemSection>
    );
  });

export const FeedItemHeader = createFeedItemSection('feed.item.header');
export const FeedItemBody = createFeedItemSection('feed.item.body');
export const FeedItemFooter = createFeedItemSection('feed.item.footer');
