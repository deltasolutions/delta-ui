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
    const sectionIndex = sections.findIndex(v => v.id === id);
    if (sectionIndex < 0) {
      throw new Error('Unable to find section');
    }
    return { sectionIndex, section: sections[sectionIndex] };
  }, []);
  const moveItemToItem = useCallback(
    (sourceId: string, targetId: string) => {
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
      const clonedSections = clone(targetSections);
      const source = findSection(clonedSections, sourceId);
      const target = findSection(clonedSections, targetId);
      clonedSections.splice(source.sectionIndex, 1);
      clonedSections.splice(target.sectionIndex, 0, source.section);
      update(LayoutUpdateTarget.Feed, clonedSections);
    },
    [targetSections, update]
  );
  const removeSection = useCallback(
    (id: string) => {
      const clonedSections = clone(targetSections);
      const { sectionIndex } = findSection(clonedSections, id);
      clonedSections.splice(sectionIndex, 1);
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
      const { section } = findSection(targetSections, id);
      return section.items.map(v => v.id);
    },
    [targetSections]
  );
  const setSectionColumns = useCallback(
    (id: string, columns: FeedSectionDef['columns']) => {
      const clonedSections = clone(targetSections);
      const source = findSection(clonedSections, id);
      source.section.columns = columns;
      update(LayoutUpdateTarget.Feed, clonedSections);
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
    getSectionChildIds,
    setSectionColumns
  };
};
