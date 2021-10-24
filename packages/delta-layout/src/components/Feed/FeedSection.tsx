import { jsx } from '@theme-ui/core';
import { Children, ReactNode, useContext, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  BoxProps,
  Masonry,
  MasonryProps,
  useSharedRef,
  useThemed
} from 'restyler';
import { LayoutUpdateTarget } from '../../models';
import { LayoutUpdateContext } from '../LayoutUpdateContext';
import { ManageableFeedContext } from './ManageableFeedContext';

export interface FeedSectionProps
  extends BoxProps,
    Pick<MasonryProps, 'columns'> {
  actions: ReactNode;
  id?: string;
}

export const FeedSection = ({
  actions,
  id: feedSectionId = '',
  columns,
  children,
  ...rest
}: FeedSectionProps) => {
  const ThemedFeedSection = useThemed('div', 'feed.section');
  const ThemedFeedSectionActions = useThemed('div', 'feed.section.actions');
  const {
    isUpdating,
    getSectionChildIds,
    moveItemToSection,
    moveSectionToSection
  } = useContext(ManageableFeedContext);
  const childIdSet = useMemo(
    () => new Set(getSectionChildIds(feedSectionId)),
    [feedSectionId]
  );
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'feedSection',
      item: { feedSectionId },
      canDrag: isUpdating,
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [isUpdating]
  );
  const [isDropReady, dropRef] = useDrop(
    () => ({
      accept: ['feedItem', 'feedSection'],
      canDrop: (v: { feedItemId?: string; feedSectionId?: string }) =>
        isUpdating &&
        v.feedSectionId !== feedSectionId &&
        !childIdSet.has(v.feedItemId ?? ''),
      collect: monitor =>
        monitor.isOver() &&
        monitor.canDrop() &&
        monitor.isOver({ shallow: true }),
      drop: v =>
        v.feedItemId
          ? moveItemToSection(v.feedItemId, feedSectionId)
          : v.feedSectionId
          ? moveSectionToSection(v.feedSectionId, feedSectionId)
          : undefined
    }),
    [
      isUpdating,
      feedSectionId,
      childIdSet,
      moveItemToSection,
      moveSectionToSection
    ]
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
  const masonryKind = isUpdating
    ? 'updatingFeedSectionContent'
    : 'feedSectionContent';
  return (
    <ThemedFeedSection ref={sharedRef} kind={kind} {...rest}>
      {actions && (
        <ThemedFeedSectionActions>{actions}</ThemedFeedSectionActions>
      )}
      {Children.count(children) > 0 && (
        <Masonry kind={masonryKind} columns={columns}>
          {children}
        </Masonry>
      )}
    </ThemedFeedSection>
  );
};
