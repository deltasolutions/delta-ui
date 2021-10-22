import { jsx } from '@theme-ui/core';
import { useContext, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  BoxProps,
  hash,
  Masonry,
  MasonryProps,
  useSharedRef,
  useThemed
} from 'restyler';
import { LayoutUpdateTarget } from '../../models';
import { LayoutUpdateContext } from '../LayoutUpdateContext';
import { ConfiguredFeedContext } from './ConfiguredFeedContext';

export interface FeedSectionProps
  extends BoxProps,
    Pick<MasonryProps, 'columns'> {
  id?: string;
}

export const FeedSection = ({
  id: feedSectionId = '',
  columns,
  children,
  ...rest
}: FeedSectionProps) => {
  const ThemedFeedSection = useThemed('div', 'feed.section');
  const { checkIfUpdating } = useContext(LayoutUpdateContext);
  const isUpdating = checkIfUpdating(LayoutUpdateTarget.Feed);
  const { sections, moveItemToSection, moveSectionToSection } = useContext(
    ConfiguredFeedContext
  );
  const section = useMemo(
    () => sections.find(v => hash(v) === feedSectionId),
    [feedSectionId]
  );
  const childHashSet = useMemo(
    () => new Set(section?.items.map(v => hash(v))),
    [section, feedSectionId]
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
        !childHashSet.has(v.feedItemId ?? ''),
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
      childHashSet,
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
  return (
    <ThemedFeedSection ref={sharedRef} kind={kind} {...rest}>
      <Masonry columns={columns}>{children}</Masonry>
    </ThemedFeedSection>
  );
};
