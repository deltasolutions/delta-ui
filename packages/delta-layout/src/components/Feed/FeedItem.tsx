import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  BoxProps,
  useSharedRef,
  useThemed,
  useThemedFactory,
  useTransition
} from 'restyler';
import { LayoutUpdateTarget } from '../../models';
import { LayoutUpdateContext } from '../LayoutUpdateContext';
import { ConfiguredFeedContext } from './ConfiguredFeedContext';
import { FeedItemIdContext } from './FeedItemIdContext';

export interface FeedItemProps extends BoxProps {
  isLoading?: boolean;
}

export const FeedItem = ({ isLoading, children, ...rest }: FeedItemProps) => {
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
  const { checkIfUpdating } = useContext(LayoutUpdateContext);
  const isUpdating = checkIfUpdating(LayoutUpdateTarget.Feed);
  const feedItemId = useContext(FeedItemIdContext);
  const { moveItemToItem } = useContext(ConfiguredFeedContext);
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'feedItem',
      item: { feedItemId },
      canDrag: isUpdating,
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [isUpdating]
  );
  const [isDropReady, dropRef] = useDrop(
    () => ({
      accept: 'feedItem',
      canDrop: (v: { feedItemId: string }) =>
        isUpdating && v.feedItemId !== feedItemId,
      collect: monitor =>
        monitor.isOver() &&
        monitor.canDrop() &&
        monitor.isOver({ shallow: true }),
      drop: v => moveItemToItem(v.feedItemId, feedItemId)
    }),
    [moveItemToItem, isUpdating, feedItemId]
  );
  const sharedRef = useSharedRef<HTMLDivElement>(
    null,
    isUpdating ? [dropRef, dragRef] : []
  );
  const kind = isUpdating
    ? isDropReady
      ? 'dropReady'
      : isDragging
      ? 'dragActive'
      : 'dragReady'
    : undefined;
  return (
    <ThemedFeedItem ref={sharedRef} kind={kind} {...extraProps} {...rest}>
      {children}
      {loader}
    </ThemedFeedItem>
  );
};

const createFeedItemSection =
  (path: string) =>
  ({ children, ...rest }: BoxProps) => {
    const ThemedFeedItemSection = useThemed('div', path);
    return <ThemedFeedItemSection {...rest}>{children}</ThemedFeedItemSection>;
  };

export const FeedItemHeader = createFeedItemSection('feed.item.header');
export const FeedItemBody = createFeedItemSection('feed.item.body');
export const FeedItemFooter = createFeedItemSection('feed.item.footer');
export const FeedItemTable = createFeedItemSection('feed.item.table');
export const FeedItemTabs = createFeedItemSection('feed.item.tabs');
