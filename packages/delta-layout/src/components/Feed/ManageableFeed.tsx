import { jsx } from '@theme-ui/core';
import { Fragment, useCallback, useMemo } from 'react';
import { BiColumns } from 'react-icons/bi';
import { HiViewGridAdd } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useModal } from 'restyler';
import { Button, useThemed } from 'restyler';
import { useFeedManager } from '../../hooks';
import { FeedDef, FeedComponentDef } from '../../models';
import { ColumnsModal } from './ColumnsModal';
import { Feed } from './Feed';
import { FeedItemIdContext } from './FeedItemIdContext';
import { FeedSection } from './FeedSection';
import { ManageableFeedContext } from './ManageableFeedContext';
import { RegistryModal } from './RegistryModal';

export interface ManageableFeedProps extends FeedDef {
  registry: FeedComponentDef[];
}

export const ManageableFeed = ({ registry, sections }: ManageableFeedProps) => {
  const ThemedFeedActions = useThemed('div', 'feed.actions');
  const componentMap = useMemo(
    () =>
      Object.values(registry).reduce(
        (p, v) => p.set(v.id, v),
        new Map<string, FeedComponentDef>()
      ),
    [registry]
  );
  const manager = useFeedManager(sections);
  const { targetSections, isUpdating, addSection, removeSection } = manager;
  const { openModal } = useModal();
  const openColumnsModal = useCallback(
    (sectionId: string) => {
      openModal({
        kind: 'small',
        render: props => (
          <ColumnsModal manager={manager} sectionId={sectionId} {...props} />
        )
      });
    },
    [openModal, manager]
  );
  const openItemsModal = useCallback(
    (sectionId: string) => {
      openModal({
        kind: 'small',
        render: props => (
          <RegistryModal
            manager={manager}
            sectionId={sectionId}
            registry={registry}
            {...props}
          />
        )
      });
    },
    [openModal, manager, registry]
  );
  const getSectionActions = useCallback(
    (sectionId: string) => {
      if (!isUpdating) {
        return null;
      }
      return (
        <Fragment>
          <Button kind="icon" onClick={() => openItemsModal(sectionId)}>
            <HiViewGridAdd />
          </Button>
          <Button kind="icon" onClick={() => openColumnsModal(sectionId)}>
            <BiColumns />
          </Button>
          <Button kind="icon" onClick={() => removeSection(sectionId)}>
            <RiDeleteBin2Fill />
          </Button>
        </Fragment>
      );
    },
    [isUpdating, removeSection]
  );
  return (
    <ManageableFeedContext.Provider value={manager}>
      <Feed>
        {targetSections.map(({ id, columns, items }) => {
          return (
            <FeedSection
              key={id}
              id={id}
              actions={getSectionActions(id)}
              columns={columns ?? { count: 1 }}
            >
              {items.map(({ id, componentId, managerComponentId, ...rest }) => {
                const componentDef = componentMap.get(componentId);
                if (!componentDef) {
                  console.warn('Unknown feed item component:', componentId);
                  return null;
                }
                const { component: Component } = componentDef;
                return (
                  <FeedItemIdContext.Provider key={id} value={id}>
                    <Component {...rest} />
                  </FeedItemIdContext.Provider>
                );
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
