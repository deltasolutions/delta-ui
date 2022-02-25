import { jsx } from '@theme-ui/core';
import { useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { IoFolderOpenOutline } from 'react-icons/io5';
import { BoxProps, Input, useThemedFactory } from 'restyler';
import { useDebounce } from '../../../..';
import { Item, ItemOptions, ItemProps, itemType } from './Item';

export interface ListProps extends BoxProps {
  title: string;
  items: ItemOptions[];
  acceptItem: (item: ItemOptions) => void;
  moveItem?: ItemProps['onMove'];
  hasQuery?: boolean;
}

export const List = ({
  title,
  items,
  acceptItem,
  moveItem,
  hasQuery
}: ListProps) => {
  const [t] = useTranslation('common');
  const useThemed = useThemedFactory<{ isDroppable?: boolean }>();
  const ThemedList = useThemed('div', 'dataTable.toolbar.columnsEditor.list');
  const ThemedListTitle = useThemed(
    'div',
    'dataTable.toolbar.columnsEditor.list.title'
  );
  const ThemedListQuery = useThemed(
    'div',
    'dataTable.toolbar.columnsEditor.list.query'
  );
  const ThemedListContent = useThemed(
    'div',
    'dataTable.toolbar.columnsEditor.list.content'
  );
  const [query, setQuery] = useState('');
  const debouncedLowercasedQuery = useDebounce(query.toLocaleLowerCase(), 300);
  const filtered = useMemo(
    () =>
      debouncedLowercasedQuery
        ? items.filter(v =>
            v.header?.toLocaleLowerCase().includes(debouncedLowercasedQuery)
          )
        : items,
    [items, debouncedLowercasedQuery]
  );
  const content = useMemo(
    () =>
      filtered.length > 0 ? (
        filtered.map((v, i) => (
          <Item key={v.id} options={v} index={i} onMove={moveItem} />
        ))
      ) : (
        <IoFolderOpenOutline />
      ),
    [filtered, moveItem]
  );
  const itemIdSet = useMemo(() => new Set(items.map(v => v.id)), [items]);
  const [isDroppable, dropRef] = useDrop<
    Pick<ItemProps, 'options' | 'index'>,
    void,
    boolean
  >({
    accept: itemType,
    drop: v => acceptItem(v.options),
    canDrop: v => !itemIdSet.has(v.options.id),
    collect: monitor => Boolean(monitor.canDrop() && monitor.isOver())
  });
  return (
    <ThemedList>
      <ThemedListTitle>{title}</ThemedListTitle>
      {hasQuery && (
        <ThemedListQuery>
          <Input
            value={query}
            placeholder={t('labels.search')}
            onChange={(v: string) => setQuery(v)}
          />
        </ThemedListQuery>
      )}
      <ThemedListContent ref={dropRef} isDroppable={isDroppable}>
        {content}
      </ThemedListContent>
    </ThemedList>
  );
};
