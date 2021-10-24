import { jsx } from '@theme-ui/core';
import { ComponentType, Fragment, useCallback } from 'react';
import { HiViewGridAdd } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { Button, hash, useThemed } from 'restyler';
import { useFeedManager } from '../../hooks';
import { FeedOptions } from '../../models';
import { Feed } from './Feed';
import { FeedItemIdContext } from './FeedItemIdContext';
import { FeedSection } from './FeedSection';
import { ManageableFeedContext } from './ManageableFeedContext';

export interface ManageableFeedProps extends FeedOptions {
  canAddItems?: boolean;
  canAddSections?: boolean;
  canRemoveSections?: boolean;
  registry: {
    [key: string]: ComponentType;
  };
}

export const ManageableFeed = ({
  canAddItems,
  canAddSections,
  canRemoveSections,
  registry,
  sections
}: ManageableFeedProps) => {
  const ThemedFeedActions = useThemed('div', 'feed.actions');
  const manager = useFeedManager(sections);
  const { targetSections, isUpdating, addSection, removeSection } = manager;
  const getSectionActions = useCallback(
    (sectionId: string) => {
      if (!isUpdating) {
        return null;
      }
      return (
        <Fragment>
          {canAddItems && (
            <Button
              kind="icon"
              onClick={e => {
                console.log('!');
              }}
            >
              <HiViewGridAdd />
            </Button>
          )}
          {canRemoveSections && (
            <Button kind="icon" onClick={() => removeSection(sectionId)}>
              <RiDeleteBin2Fill />
            </Button>
          )}
        </Fragment>
      );
    },
    [isUpdating, removeSection, canAddItems, canRemoveSections]
  );
  return (
    <ManageableFeedContext.Provider value={manager}>
      <Feed>
        {targetSections.map(section => {
          const key = hash(section);
          const { columns, items } = section;
          return (
            <FeedSection
              key={key}
              id={key}
              actions={getSectionActions(key)}
              columns={columns ?? { count: 1 }}
            >
              {items.map(item => {
                const id = hash(item);
                const { component, ...rest } =
                  typeof item === 'object' ? item : { component: item };
                const Component = registry[component];
                if (Component) {
                  return (
                    <FeedItemIdContext.Provider key={id} value={id}>
                      <Component {...rest} />
                    </FeedItemIdContext.Provider>
                  );
                } else {
                  console.warn('Unknown feed item:', item);
                  return null;
                }
              })}
            </FeedSection>
          );
        })}
        {isUpdating && (
          <ThemedFeedActions>
            <Button kind="icon" onClick={addSection}>
              <IoMdAdd />
            </Button>
          </ThemedFeedActions>
        )}
      </Feed>
    </ManageableFeedContext.Provider>
  );
};
