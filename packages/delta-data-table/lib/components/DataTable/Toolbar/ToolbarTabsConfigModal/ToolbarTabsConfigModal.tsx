import { jsx } from '@theme-ui/core';
import { Fragment, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  hash,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRendererProps
} from 'restyler';
import { DataTableManager } from '../../../../models';
import { Item, ItemDef } from './Item';

export interface ToolbarTabsConfigModalProps extends ModalRendererProps {
  manager: DataTableManager<object>;
}

export const ToolbarTabsConfigModal = ({
  manager: { initialTab, layout, setLayout, activeTabName, setActiveTabName },
  handleClose
}: ToolbarTabsConfigModalProps) => {
  const [t] = useTranslation('common');
  const [items, setItems] = useState<ItemDef[]>(() =>
    layout.tabs.map(v => ({ ...v, id: hash(v) }))
  );
  const canAdd = items.length < 6;
  const canRemove = items.length > 1;
  const canSubmit =
    items.every(v => Boolean(v.name)) &&
    new Map(items.map(v => [v.name, v])).size === items.length;
  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prior: ItemDef[]) => {
      const removed = prior.splice(dragIndex, 1).pop()!;
      prior.splice(hoverIndex, 0, removed);
      return prior.slice();
    });
  }, []);
  const removeItem = useCallback((index: number) => {
    setItems((prior: ItemDef[]) => prior.filter((_, i) => i !== index));
  }, []);
  const renameItem = useCallback((index: number, name: string) => {
    setItems((prior: ItemDef[]) =>
      prior.map((v, i) => (i === index ? { ...v, name } : v))
    );
  }, []);
  const addItem = useCallback(() => {
    const { name, ...rest } = initialTab;
    const randomId = Math.random().toString().slice(-4);
    setItems((prior: ItemDef[]) =>
      prior.concat([{ rest, name: '', id: randomId }])
    );
  }, []);
  const renderItem = useCallback(
    (item: ItemDef, index: number) => {
      return (
        <Item
          key={item.id}
          index={index}
          def={item}
          onMove={moveItem}
          onRemove={canRemove ? () => removeItem(index) : undefined}
          onRename={v => renameItem(index, v)}
        />
      );
    },
    [canRemove]
  );
  const handleSave = useCallback(
    (items: ItemDef[]) => {
      const tabs = items.map(v => {
        const { id, ...rest } = v;
        return rest;
      });
      setLayout({ ...layout, tabs });
      if (!tabs.some(v => v.name === activeTabName)) {
        setActiveTabName(tabs[0].name);
      }
      handleClose();
    },
    [layout, setLayout, activeTabName, setActiveTabName, handleClose]
  );
  return (
    <Fragment>
      <ModalHeader>
        <Heading kind="modal">{t('sections.tabsConfig')}</Heading>
      </ModalHeader>
      <ModalBody sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((card, i) => renderItem(card, i))}
      </ModalBody>
      <ModalFooter>
        <Button
          kind="secondary"
          sx={{ mr: 'auto' }}
          onClick={addItem}
          disabled={!canAdd}
        >
          {t('actions.add')}
        </Button>
        <Button kind="secondary" onClick={handleClose}>
          {t('actions.cancel')}
        </Button>
        <Button
          kind="primary"
          type="submit"
          disabled={!canSubmit}
          onClick={() => handleSave(items)}
        >
          {t('actions.save')}
        </Button>
      </ModalFooter>
    </Fragment>
  );
};
