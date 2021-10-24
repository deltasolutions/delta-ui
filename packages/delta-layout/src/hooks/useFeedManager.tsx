import { useCallback, useContext } from 'react';
import { clone, hash } from 'restyler';
import { LayoutUpdateContext } from '../components';
import { FeedSectionDef, LayoutUpdateTarget } from '../models';

export const useFeedManager = (sections: FeedSectionDef[]) => {
  const { updates, update, checkIfUpdating } = useContext(LayoutUpdateContext);
  const isUpdating = checkIfUpdating(LayoutUpdateTarget.Feed);
  const targetSections: FeedSectionDef[] = isUpdating
    ? updates[LayoutUpdateTarget.Feed] ?? sections
    : sections;
  const findItem = useCallback((sections: FeedSectionDef[], id: string) => {
    for (const section of sections) {
      for (const [index, item] of section.items.entries()) {
        if (item.id === id) {
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
      const target = clonedSections.find(v => v.id === targetId);
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
      const clonedSections = clone(targetSections) as FeedSectionDef[];
      const sourceIndex = clonedSections.findIndex(v => v.id === sourceId);
      const targetIndex = clonedSections.findIndex(v => v.id === targetId);
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
      const clonedSections = clone(targetSections) as FeedSectionDef[];
      const index = clonedSections.findIndex(v => v.id === id);
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
          id: Math.random().toString().slice(-4),
          columns: { count: 1 },
          items: []
        }
      ])
    );
  }, [targetSections]);
  const getSectionChildIds = useCallback(
    (id: string) => {
      const section = targetSections.find(v => v.id === id);
      if (!section) {
        throw new Error('Unable to locate feed section');
      }
      return section.items.map(v => v.id);
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
