import { jsx } from '@theme-ui/core';
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useState
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  hash,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRendererProps,
  useThemed
} from 'restyler';
import { DataTableManager } from '../../../../models';
import { ItemOptions } from './Item';
import { List } from './List';

export interface ToolbarColumnsEditorModalProps extends ModalRendererProps {
  manager: DataTableManager<object>;
}

export const ToolbarColumnsEditorModal = ({
  manager: {
    initialTab,
    columns,
    coercedColumns,
    activeTab: { columnExclusions },
    updateActiveTab
  },
  handleClose
}: ToolbarColumnsEditorModalProps) => {
  const [t] = useTranslation('common');
  const ThemedColumnsEditor = useThemed(
    'div',
    'dataTable.toolbar.columnsEditor'
  );
  const [exclusionItems, setExclusionItems] = useState<ItemOptions[]>(() =>
    columns
      .filter(v => columnExclusions?.includes(v.key))
      .map(v => ({ ...v, id: v.key }))
  );
  const [useItems, setUseItems] = useState<ItemOptions[]>(() =>
    coercedColumns.map(v => ({ ...v, id: v.key }))
  );
  const traverseItem = useCallback(
    (
      item: ItemOptions,
      setSourceItems: Dispatch<SetStateAction<ItemOptions[]>>,
      setTargetItems: Dispatch<SetStateAction<ItemOptions[]>>
    ) => {
      setSourceItems(items => items.filter(v => v.id !== item.id));
      setTargetItems(items => items.concat([item]));
    },
    []
  );
  const handleExclusionItemTraverse = useCallback(
    (item: ItemOptions) => traverseItem(item, setExclusionItems, setUseItems),
    []
  );
  const handleUseItemTraverse = useCallback(
    (item: ItemOptions) => traverseItem(item, setUseItems, setExclusionItems),
    []
  );
  const handleUseItemMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setUseItems((prior: ItemOptions[]) => {
        const removed = prior.splice(dragIndex, 1).pop()!;
        prior.splice(hoverIndex, 0, removed);
        return prior.slice();
      });
    },
    []
  );
  const canSave = useItems.length > 0;
  const handleReset = useCallback(() => {
    const initialExclusionSet = new Set(initialTab.columnExclusions);
    setExclusionItems(
      columns
        .filter(v => initialExclusionSet.has(v.key))
        .map(v => ({ ...v, id: v.key }))
    );
    setUseItems(
      columns
        .filter(v => !initialExclusionSet.has(v.key))
        .map(v => ({ ...v, id: v.key }))
    );
  }, [exclusionItems, useItems, handleClose]);
  const handleSave = useCallback(() => {
    updateActiveTab(prior => ({
      ...prior,
      columnExclusions: exclusionItems.map(v => v.key),
      columnOrder: useItems.map(v => v.key)
    }));
    handleClose();
  }, [exclusionItems, useItems, handleClose]);
  return (
    <Fragment>
      <ModalHeader>
        <Heading kind="modal">{t('sections.columnsEditor')}</Heading>
      </ModalHeader>
      <ModalBody>
        <ThemedColumnsEditor>
          <List
            isSorted
            title={t('sections.unusedColumns')}
            items={exclusionItems}
            traverseDirection="right"
            onItemTraverse={handleExclusionItemTraverse}
          />
          <List
            title={t('sections.usedColumns')}
            items={useItems}
            traverseDirection="left"
            onItemTraverse={handleUseItemTraverse}
            onItemMove={handleUseItemMove}
          />
        </ThemedColumnsEditor>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" sx={{ mr: 'auto' }} onClick={handleReset}>
          {t('actions.reset')}
        </Button>
        <Button kind="secondary" onClick={handleClose}>
          {t('actions.cancel')}
        </Button>
        <Button
          kind="primary"
          type="submit"
          disabled={!canSave}
          onClick={handleSave}
        >
          {t('actions.save')}
        </Button>
      </ModalFooter>
    </Fragment>
  );
};
