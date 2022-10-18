import { jsx } from '@theme-ui/core';
import { hash } from 'delta-jsf';
import { isEqual } from 'lodash-es';
import {
  HTMLAttributes,
  ReactNode,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useUpdateEffect } from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { AddListItem } from './AddListItem';
import { ComplexSearchContainer } from './ComplexSearchContainer';
import { ComplexSearchContext } from './contexts';
import { List, ListItem } from './List';
import { ComplexSearchSegment, ComplexSearchProposal } from './types';

export interface ComplexSearchProps
  extends Omit<
      HTMLAttributes<HTMLLabelElement>,
      'children' | keyof FormWidgetProps
    >,
    FormWidgetProps<unknown> {
  value?: ComplexSearchSegment[];
  proposals: ComplexSearchProposal[];
}

export const ComplexSearch = ({
  value = [],
  proposals,
  onChange,
}: ComplexSearchProps) => {
  const [editingIndex, setEditingIndex] = useState<number | undefined>(
    undefined
  );
  const [itemsValueOptions, setItemsValueOptions] = useState<{
    [key: string]: unknown[] | 'loading';
  }>({});
  const [items, setItems] = useState<ComplexSearchSegment[]>(value);

  const addItem = useCallback(key => {
    setItems(curr => {
      return [...curr, { key, operator: '' }];
    });
  }, []);
  const removeItem = useCallback((index: number) => {
    setItems(curr => {
      const next = [...curr];
      next.splice(index, 1);
      return next;
    });
  }, []);
  const updateItem = useCallback(
    (index: number, key: string, value?: string) => {
      setItems(curr => {
        const next = [...curr];
        next[index][key] = value;
        return next;
      });
    },
    []
  );
  const _accumulateItemsValueOptions = useCallback(
    (key: string, options: unknown[] | 'loading') => {
      setItemsValueOptions(curr => {
        const prev = { ...curr };
        prev[key] = options;
        return prev;
      });
    },
    []
  );
  const fetchItemValueOptions = useCallback(
    (key: string, query: string) => {
      const propose = proposals.find(i => i['key'] === key);
      const itemsFetched = Array.isArray(itemsValueOptions[key]);
      if (itemsFetched) {
        return;
      }
      const maybeOptions = propose?.getOptions?.(query);
      if (Array.isArray(maybeOptions)) {
        _accumulateItemsValueOptions(key, maybeOptions);
      } else {
        _accumulateItemsValueOptions(key, 'loading');
        maybeOptions
          ?.then(options => {
            _accumulateItemsValueOptions(key, options);
          })
          .catch(e => {
            console.warn(e);
            _accumulateItemsValueOptions(key, []);
          });
      }
    },
    [proposals, itemsValueOptions]
  );

  const contextValue = {
    proposals,
    addItem,
    removeItem,
    items,
    updateItem,
    fetchItemValueOptions,
    setEditingIndex,
    itemsValueOptions,
    editingIndex,
  };
  const memoizedContextValue = useMemo(
    () => contextValue,
    Object.values(contextValue)
  );
  useUpdateEffect(() => {
    onChange?.(items);
  }, [items]);

  useEffect(() => {
    if (!isEqual(value, items)) {
      setEditingIndex(undefined);
      setItems(value);
    }
  }, [value]);

  return (
    <ComplexSearchContext.Provider value={memoizedContextValue}>
      <ComplexSearchContainer>
        <List>
          {items.map((item, index) => (
            <ListItem
              key={`${hash(item)}-${index}`}
              index={index}
              item={item}
            />
          ))}
          <AddListItem key={items.length} />
        </List>
      </ComplexSearchContainer>
    </ComplexSearchContext.Provider>
  );
};
