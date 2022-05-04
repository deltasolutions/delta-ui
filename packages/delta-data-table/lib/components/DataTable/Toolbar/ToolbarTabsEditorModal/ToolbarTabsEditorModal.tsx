import { jsx } from '@theme-ui/core';
import { Fragment, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Form,
  FormField,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalRendererProps,
  Select,
  SelectOption,
  useFormManager,
  useThemed
} from 'restyler';
import { DataTableManager } from '../../../../models';
import { Item, ItemDef } from './Item';

export interface ToolbarTabsEditorModalProps extends ModalRendererProps {
  manager: DataTableManager<object>;
}

export const ToolbarTabsEditorModal = ({
  manager: { initialTab, layout, setLayout, activeTabName, setActiveTabName },
  handleClose
}: ToolbarTabsEditorModalProps) => {
  const [t] = useTranslation('common');
  const ThemedList = useThemed('div', 'dataTable.toolbar.tabsEditor.list');
  const formManager = useFormManager({ values: { templateTab: initialTab } });
  const [items, setItems] = useState<ItemDef[]>(() =>
    layout.tabs.map(v => ({ ...v, id: v.name }))
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
    const { name, ...rest } = formManager.values.templateTab ?? initialTab;
    const randomId = Math.random().toString().slice(-6);
    setItems((prior: ItemDef[]) =>
      prior.concat([{ ...rest, name: '', id: randomId }])
    );
  }, [formManager.values]);
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
        <Heading kind="modal">{t('sections.tabsEditor')}</Heading>
      </ModalHeader>
      <ModalBody>
        <ThemedList>{items.map((card, i) => renderItem(card, i))}</ThemedList>
        <Form manager={formManager} sx={{ mt: 3 }}>
          <FormField name="templateTab" label={t('labels.templateTab')}>
            <Select>
              {[
                <SelectOption key="default" value={initialTab}>
                  {t('labels.initialTab')}
                </SelectOption>
              ].concat(
                Object.values(layout.tabs).map(v => (
                  <SelectOption key={v.name} value={v}>
                    {v.name}
                  </SelectOption>
                ))
              )}
            </Select>
          </FormField>
        </Form>
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
