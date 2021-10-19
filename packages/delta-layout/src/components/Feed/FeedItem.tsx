import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { useDrag } from 'react-dnd';
import { BoxProps, useThemed, useThemedFactory, useTransition } from 'restyler';
import { LayoutEditTarget } from '../../models';
import { LayoutEditContext } from '../LayoutEditContext';

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
  const { updates } = useContext(LayoutEditContext);
  const isEditing = !!updates[LayoutEditTarget.Feed];
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'column',
      item: {},
      canDrag: isEditing,
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    []
  );
  return (
    <ThemedFeedItem
      ref={dragRef}
      kind={isEditing ? (isDragging ? 'dragging' : 'dragReady') : undefined}
      {...extraProps}
      {...rest}
    >
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
