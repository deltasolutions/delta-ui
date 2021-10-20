import { jsx } from '@theme-ui/core';
import { ComponentType, useCallback, useContext } from 'react';
import { clone, hash } from 'restyler';
import {
  FeedOptions,
  FeedSectionOptions,
  LayoutUpdateTarget
} from '../../models';
import { LayoutUpdateContext } from '../LayoutUpdateContext';
import { ConfiguredFeedContext } from './ConfiguredFeedContext';
import { Feed } from './Feed';
import { FeedItemIdContext } from './FeedItemIdContext';
import { FeedSection } from './FeedSection';

export interface ConfiguredFeedProps extends FeedOptions {
  registry: {
    [key: string]: ComponentType;
  };
}

export const ConfiguredFeed = ({ sections, registry }: ConfiguredFeedProps) => {
  const { updates, update, checkIfUpdating } = useContext(LayoutUpdateContext);
  const isUpdating = checkIfUpdating(LayoutUpdateTarget.Feed);
  const targetSections = isUpdating
    ? updates[LayoutUpdateTarget.Feed] ?? sections
    : sections;
  const locateItem = useCallback(
    (sections: FeedSectionOptions[], id: string) => {
      for (const section of sections) {
        for (const [index, item] of section.items.entries()) {
          if (hash(item) === id) {
            return { item, index, section };
          }
        }
      }
      return undefined;
    },
    []
  );
  const moveItem = useCallback(
    (sourceId: string, targetId: string) => {
      const clonedSections = clone(targetSections);
      const source = locateItem(clonedSections, sourceId);
      const target = locateItem(clonedSections, targetId);
      if (!source || !target) {
        throw new Error('Unable to locate feed item');
      }
      source.section.items.splice(source.index, 1);
      target.section.items.splice(target.index, 0, source.item);
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections, update]
  );
  return (
    <ConfiguredFeedContext.Provider
      value={{
        sections: targetSections,
        moveItem
      }}
    >
      <Feed>
        {targetSections.map(section => {
          const key = hash(section);
          const { columns, items } = section;
          return (
            <FeedSection key={key} columns={columns ?? { count: 1 }}>
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
      </Feed>
    </ConfiguredFeedContext.Provider>
  );
};
