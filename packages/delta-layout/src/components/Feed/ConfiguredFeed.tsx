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
  const moveItemToItem = useCallback(
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
  const moveItemToSection = useCallback(
    (sourceId: string, targetId: string) => {
      const clonedSections = clone(targetSections);
      const source = locateItem(clonedSections, sourceId);
      const target = clonedSections.find(v => hash(v) === targetId);
      if (!source || !target) {
        throw new Error('Unable to locate feed item or section');
      }
      source.section.items.splice(source.index, 1);
      target.items.push(source.item);
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections, update]
  );
  const moveSectionToSection = useCallback(
    (sourceId: string, targetId: string) => {
      const clonedSections = clone(targetSections) as FeedSectionOptions[];
      const sourceIndex = clonedSections.findIndex(v => hash(v) === sourceId);
      const targetIndex = clonedSections.findIndex(v => hash(v) === targetId);
      if (sourceIndex < 0 || targetIndex < 0) {
        throw new Error('Unable to locate feed section');
      }
      const source = clonedSections[sourceIndex];
      clonedSections.splice(sourceIndex, 1);
      clonedSections.splice(targetIndex, 0, source);
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections, update]
  );
  return (
    <ConfiguredFeedContext.Provider
      value={{
        sections: targetSections,
        moveItemToItem,
        moveItemToSection,
        moveSectionToSection
      }}
    >
      <Feed>
        {targetSections.map(section => {
          const key = hash(section);
          const { columns, items } = section;
          return (
            <FeedSection key={key} id={key} columns={columns ?? { count: 1 }}>
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
