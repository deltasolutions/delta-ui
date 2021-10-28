import { useCallback, useContext, useMemo } from 'react';
import { clone } from 'restyler';
import { LayoutUpdateContext } from '../components';
import {
  FeedManager,
  FeedManagerOptions,
  FeedSectionDef,
  LayoutUpdateTarget
} from '../models';

export const useFeedManager = (options?: FeedManagerOptions) => {
  const isActive = !!options;
  const { sections = [], registry = [] } = options ?? {};
  const { updates, update, checkIfUpdating } = useContext(LayoutUpdateContext);
  const isUpdating = isActive && checkIfUpdating(LayoutUpdateTarget.Feed);
  const targetSections: FeedSectionDef[] = isUpdating
    ? updates[LayoutUpdateTarget.Feed] ?? sections
    : sections;
  const insure = useCallback(() => {
    if (!isActive) {
      throw new Error('Feed section is unmanageable');
    }
  }, [isActive]);
  const findItem = useCallback((sections: FeedSectionDef[], id: string) => {
    insure();
    for (const [sectionIndex, section] of sections.entries()) {
      for (const [itemIndex, item] of section.items.entries()) {
        if (item.id === id) {
          return { item, itemIndex, section, sectionIndex };
        }
      }
    }
    throw new Error('Unable to find item');
  }, []);
  const findSection = useCallback((sections: FeedSectionDef[], id: string) => {
    insure();
    const sectionIndex = sections.findIndex(v => v.id === id);
    if (sectionIndex < 0) {
      throw new Error('Unable to find section');
    }
    return { sectionIndex, section: sections[sectionIndex] };
  }, []);
  const moveItemToItem = useCallback(
    (sourceId: string, targetId: string) => {
      insure();
      const clonedSections = clone(targetSections);
      const source = findItem(clonedSections, sourceId);
      const target = findItem(clonedSections, targetId);
      source.section.items.splice(source.itemIndex, 1);
      target.section.items.splice(target.itemIndex, 0, source.item);
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections, update]
  );
  const moveItemToSection = useCallback(
    (sourceId: string, targetId: string) => {
      insure();
      const clonedSections = clone(targetSections);
      const source = findItem(clonedSections, sourceId);
      const target = findSection(clonedSections, targetId);
      source.section.items.splice(source.itemIndex, 1);
      target.section.items.push(source.item);
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections, update]
  );
  const moveSectionToSection = useCallback(
    (sourceId: string, targetId: string) => {
      insure();
      const clonedSections = clone(targetSections);
      const source = findSection(clonedSections, sourceId);
      const target = findSection(clonedSections, targetId);
      clonedSections.splice(source.sectionIndex, 1);
      clonedSections.splice(target.sectionIndex, 0, source.section);
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections, update]
  );
  const removeItem = useCallback(
    (id: string) => {
      insure();
      const clonedSections = clone(targetSections);
      const source = findItem(clonedSections, id);
      source.section.items.splice(source.itemIndex, 1);
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections]
  );
  const removeSection = useCallback(
    (id: string) => {
      insure();
      const clonedSections = clone(targetSections);
      const { sectionIndex } = findSection(clonedSections, id);
      clonedSections.splice(sectionIndex, 1);
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections]
  );
  const addSection = useCallback(() => {
    insure();
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
  const addItemToSection = useCallback(
    (componentId: string, sectionId: string) => {
      insure();
      const clonedSections = clone(targetSections);
      const target = findSection(clonedSections, sectionId);
      target.section.items.push({
        id: Math.random().toString().slice(-4),
        componentId
      });
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections, update]
  );
  const getSectionChildIds = useCallback(
    (id: string) => {
      insure();
      const { section } = findSection(targetSections, id);
      return section.items.map(v => v.id);
    },
    [targetSections]
  );
  const setSectionColumns = useCallback(
    (id: string, columns: FeedSectionDef['columns']) => {
      insure();
      const clonedSections = clone(targetSections);
      const source = findSection(clonedSections, id);
      source.section.columns = columns;
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections]
  );
  const manager: FeedManager = {
    isActive,
    isUpdating,
    registry,
    targetSections,
    addItemToSection,
    addSection,
    getSectionChildIds,
    moveItemToItem,
    moveItemToSection,
    moveSectionToSection,
    removeItem,
    removeSection,
    setSectionColumns
  };
  return useMemo(() => manager, [Object.values(manager)]);
};
