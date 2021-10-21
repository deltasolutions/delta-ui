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
  const id = useContext(FeedItemIdContext);
  const { moveItem } = useContext(ConfiguredFeedContext);
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'feedItem',
      item: { id },
      canDrag: isUpdating,
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [isUpdating]
  );
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: 'feedItem',
      canDrop: (v: { id: string }) => isUpdating && v.id !== id,
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      }),
      drop: v => moveItem(v.id, id)
    }),
    [isUpdating, id]
  );
  const sharedRef = useSharedRef<HTMLDivElement>(
    null,
    isUpdating ? [dropRef, dragRef] : []
  );
  const kind = isUpdating
    ? isOver && canDrop
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
