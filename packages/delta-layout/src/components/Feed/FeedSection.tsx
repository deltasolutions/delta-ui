import { jsx } from '@theme-ui/core';
import { Children, useContext, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  BoxProps,
  Masonry,
  MasonryProps,
  useSharedRef,
  useThemed
} from 'restyler';
import { FeedContext } from './FeedContext';
import { FeedSectionExtras } from './FeedSectionExtras';

export interface FeedSectionProps
  extends BoxProps,
    Pick<MasonryProps, 'columns'> {
  id?: string;
}

export const FeedSection = ({
  id,
  columns,
  children,
  ...rest
}: FeedSectionProps) => {
  const ThemedFeedSection = useThemed('div', 'feed.section');
  const {
    manager: {
      isUpdating,
      getSectionChildIds,
      moveItemToSection,
      moveSectionToSection
    }
  } = useContext(FeedContext);
  const childIdSet = useMemo(
    () => new Set(id ? getSectionChildIds(id) : undefined),
    [getSectionChildIds, id]
  );
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'feedSection',
      item: { feedSectionId: id },
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
        v.feedSectionId !== id &&
        !childIdSet.has(v.feedItemId ?? ''),
      collect: monitor =>
        monitor.isOver() &&
        monitor.canDrop() &&
        monitor.isOver({ shallow: true }),
      drop: v => {
        if (!id) {
          return;
        }
        if (v.feedItemId) {
          moveItemToSection(v.feedItemId, id);
        } else if (v.feedSectionId) {
          moveSectionToSection(v.feedSectionId, id);
        }
      }
    }),
    [id, isUpdating, childIdSet, moveItemToSection, moveSectionToSection]
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
      {Children.count(children) > 0 && (
        <Masonry kind={masonryKind} columns={columns}>
          {children}
        </Masonry>
      )}
      {id && isUpdating && <FeedSectionExtras id={id} />}
    </ThemedFeedSection>
  );
};
