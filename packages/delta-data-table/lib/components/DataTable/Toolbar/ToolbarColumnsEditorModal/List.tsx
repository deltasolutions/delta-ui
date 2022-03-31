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
  isSorted?: boolean;
  traverseDirection?: ItemProps['traverseDirection'];
  onItemTraverse?: ItemProps['onTraverse'];
  onItemMove?: ItemProps['onMove'];
}

export const List = ({
  title,
  items,
  isSorted,
  traverseDirection,
  onItemTraverse,
  onItemMove
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
        ? items.filter(
            v =>
              (typeof v.header === 'string' &&
                v.header
                  .toLocaleLowerCase()
                  .includes(debouncedLowercasedQuery)) ||
              (typeof v.description === 'string' &&
                v.description
                  .toLocaleLowerCase()
                  .includes(debouncedLowercasedQuery)) ||
              (typeof v.query === 'string' &&
                v.query.toLocaleLowerCase().includes(debouncedLowercasedQuery))
          )
        : items,
    [items, debouncedLowercasedQuery]
  );
  const content = useMemo(
    () =>
      filtered.length > 0 ? (
        (isSorted
          ? filtered.sort((a, b) =>
              typeof a.header === 'string' && typeof b.header === 'string'
                ? a.header.localeCompare(b.header)
                : typeof a.query === 'string' && typeof b.query === 'string'
                ? a.query.localeCompare(b.query)
                : 0
            )
          : filtered
        ).map((v, i) => (
          <Item
            key={v.id}
            options={v}
            index={i}
            traverseDirection={traverseDirection}
            onTraverse={onItemTraverse}
            onMove={onItemMove}
          />
        ))
      ) : (
        <IoFolderOpenOutline />
      ),
    [filtered, isSorted, traverseDirection, onItemTraverse, onItemMove]
  );
  return (
    <ThemedList>
      <ThemedListTitle>{title}</ThemedListTitle>
      <ThemedListQuery>
        <Input
          value={query}
          placeholder={t('labels.search')}
          onChange={(v: string) => setQuery(v)}
        />
      </ThemedListQuery>
      <ThemedListContent>{content}</ThemedListContent>
    </ThemedList>
  );
};
