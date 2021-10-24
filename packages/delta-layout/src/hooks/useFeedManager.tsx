import { useCallback, useContext } from 'react';
import { clone, hash } from 'restyler';
import { LayoutUpdateContext } from '../components';
import { FeedSectionOptions, LayoutUpdateTarget } from '../models';

export const useFeedManager = (sections: FeedSectionOptions[]) => {
  const { updates, update, checkIfUpdating } = useContext(LayoutUpdateContext);
  const isUpdating = checkIfUpdating(LayoutUpdateTarget.Feed);
  const targetSections: FeedSectionOptions[] = isUpdating
    ? updates[LayoutUpdateTarget.Feed] ?? sections
    : sections;
  const findItem = useCallback((sections: FeedSectionOptions[], id: string) => {
    for (const section of sections) {
      for (const [index, item] of section.items.entries()) {
        if (hash(item) === id) {
          return { item, index, section };
        }
      }
    }
    return undefined;
  }, []);
  const moveItemToItem = useCallback(
    (sourceId: string, targetId: string) => {
      const clonedSections = clone(targetSections);
      const source = findItem(clonedSections, sourceId);
      const target = findItem(clonedSections, targetId);
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
      const source = findItem(clonedSections, sourceId);
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
  const removeSection = useCallback(
    (id: string) => {
      const clonedSections = clone(targetSections) as FeedSectionOptions[];
      const index = clonedSections.findIndex(v => hash(v) === id);
      if (index < 0) {
        throw new Error('Unable to locate feed section');
      }
      clonedSections.splice(index, 1);
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections]
  );
  const addSection = useCallback(() => {
    update(
      LayoutUpdateTarget.Feed,
      targetSections.concat([
        {
          items: [],
          columns: { count: 1 }
        }
      ])
    );
  }, [targetSections]);
  const getSectionChildIds = useCallback(
    (id: string) => {
      const section = targetSections.find(v => hash(v) === id);
      if (!section) {
        throw new Error('Unable to locate feed section');
      }
      return section.items.map(v => hash(v));
    },
    [targetSections]
  );
  return {
    isUpdating,
    targetSections,
    moveItemToItem,
    moveItemToSection,
    moveSectionToSection,
    removeSection,
    addSection,
    getSectionChildIds
  };
};
