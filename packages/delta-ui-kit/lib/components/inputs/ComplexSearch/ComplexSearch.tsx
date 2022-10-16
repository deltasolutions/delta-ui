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
import { ComplexSearchItemType, ComplexSearchPropose } from './types';

export interface ComplexSearchProps
  extends Omit<
      HTMLAttributes<HTMLLabelElement>,
      'children' | keyof FormWidgetProps
    >,
    FormWidgetProps<unknown> {
  value?: ComplexSearchItemType[];
  renderOperator?: (operator: string) => ReactNode;
  proposes: ComplexSearchPropose[];
}

export const ComplexSearch = ({
  value = [],
  proposes,
  onChange,
  renderOperator,
}: ComplexSearchProps) => {
  const [editingIndex, setEditingIndex] = useState<number | undefined>(
    undefined
  );
  const [itemsValueOptions, setItemsValueOptions] = useState<{
    [key: string]: unknown[] | 'loading';
  }>({});
  const [items, setItems] = useState<ComplexSearchItemType[]>(value);

  const addItem = useCallback(id => {
    setItems(curr => {
      return [...curr, { id, operator: '' }];
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
      const propose = proposes.find(i => i.id === key);
      const itemsFetched = Array.isArray(itemsValueOptions[key]);
      if (itemsFetched) {
        return;
      }
      const maybeOptions = propose?.getItems(query);
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
    [proposes, itemsValueOptions]
  );

  const contextValue = {
    proposes,
    addItem,
    removeItem,
    items,
    updateItem,
    fetchItemValueOptions,
    setEditingIndex,
    itemsValueOptions,
    editingIndex,
    renderOperator,
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
