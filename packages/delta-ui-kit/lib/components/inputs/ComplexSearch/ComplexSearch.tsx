import { jsx } from '@theme-ui/core';
import { hash } from 'delta-jsf';
import { isEqual } from 'lodash-es';
import { lighten } from 'polished';
import {
  createContext,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useState,
  useRef,
  useContext,
  useEffect,
  forwardRef,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropRendererProps,
  useDeltaTheme,
  useDrop,
  useImperativePortal,
  useUpdateEffect,
} from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { mergeRefs } from '../../../utils';
import { Box, SystemContext } from '../../containers';
import { Loader, Skeleton } from '../../displays';
import { DropMenu, DropMenuItem } from '../DropMenu';
import { TextInput, TextInputProps } from '../TextInput';

export interface Propose {
  id: string;
  label: string;
  itemId: string;
  operators: string[];
  getItems: (query) => unknown[] | Promise<unknown[]>;
  renderSelectial: (datum) => ReactNode;
  renderOption: (datum) => ReactNode;
}

export interface ItemType {
  id?: string;
  operator?: string;
  value?: string;
}

export interface ComplexSearchProps
  extends Omit<
      HTMLAttributes<HTMLLabelElement>,
      'children' | keyof FormWidgetProps
    >,
    FormWidgetProps<unknown> {
  value?: ItemType[];
  proposes: Propose[];
}

export const ComplexSearch = ({
  value = [],
  proposes,
  onChange,
}: ComplexSearchProps) => {
  const [editingIndex, setEditingIndex] = useState<number | undefined>(
    undefined
  );
  const [itemsValueOptions, setItemsValueOptions] = useState<{
    [key: string]: unknown[] | 'loading';
  }>({});
  const [items, setItems] = useState<ItemType[]>(value);

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
    (index: number, key: string, value: string) => {
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
    [proposes]
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

const ComplexSearchContext = createContext({} as ComplexSearchContext);

interface ComplexSearchContext {
  proposes: Propose[];
  editingIndex?: number;
  setEditingIndex;
  fetchItemValueOptions;
  itemsValueOptions;
  items;
  removeItem;
  updateItem;
  addItem;
}
const List = props => {
  return (
    <ul
      sx={{
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        width: '1px',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
      {...props}
    />
  );
};

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  item: ItemType;
  index: number;
}

const AddListItem = forwardRef(() => {
  const { floatingPortal } = useContext(SystemContext);
  const { items, setEditingIndex, editingIndex, addItem } =
    useContext(ComplexSearchContext);
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeDropRef = useRef<() => void | void>();
  const [inputValue, setInputValue] = useState('');
  const portal = useImperativePortal(floatingPortal);
  const [openDrop, anchorRef] = useDrop<any>(
    ({ handleClose }) => {
      return (
        <DropContent
          ref={dropRef}
          handleClose={handleClose}
          onItemClick={onOptionClick}
        />
      );
    },
    {
      deps: [],
      placement: 'bottom-start',
      blurResistant: true,
      tailored: false,
      portal,
      style: { width: '250px', marginTop: '2px' },
    }
  );
  const stableRef = useMemo(
    () => mergeRefs([inputRef, anchorRef]),
    [inputRef, anchorRef]
  );
  const handleClose = useCallback(() => {
    closeDropRef.current?.();
  }, []);

  const handleOpen = useCallback(() => {
    closeDropRef.current = openDrop();
  }, [openDrop]);
  const itemsLengthRef = useRef(items.length);

  useEffect(() => {
    itemsLengthRef.current = items.length;
  }, [items]);

  const onOptionClick = (value: string) => {
    handleClose();
    addItem(value);
    setEditingIndex(itemsLengthRef.current);
  };
  useEffect(() => {
    if (editingIndex === -1) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [editingIndex]);
  const onBlur = ev => {
    if (
      !ev.relatedTarget ||
      !dropRef.current ||
      !dropRef.current.contains(ev.relatedTarget)
    ) {
      handleClose();
    }
  };

  const onFocus = useCallback(() => {
    handleOpen();
  }, [handleOpen]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('focus', onFocus);
      inputRef.current.addEventListener('blur', onBlur);
    }
    return () => {
      inputRef.current?.removeEventListener('focus', onFocus);
      inputRef.current?.removeEventListener('blur', onBlur);
    };
  }, [inputRef.current]);
  return (
    <Box sx={{ flex: 1 }}>
      <Input
        ref={stableRef}
        value={inputValue}
        onChange={setInputValue}
        onKeyDown={(ev: any) => {
          if (ev.key === 'Backspace' && ev.target.selectionStart === 0) {
            if (items.length > 0) {
              setEditingIndex(items.length - 1);
            }
          }
        }}
      />
      <DropContext.Provider value={{ query: inputValue }}>
        {portal}
      </DropContext.Provider>
    </Box>
  );
});

const DropContext = createContext({} as DropContextOptions);

interface DropContextOptions {
  query?: string;
}

const ListItem = ({ item, index, ...props }: ListItemProps) => {
  const { removeItem, updateItem, editingIndex, setEditingIndex, proposes } =
    useContext(ComplexSearchContext);
  const { floatingPortal } = useContext(SystemContext);
  const editing = useMemo(() => editingIndex === index, [editingIndex, index]);
  const [inputValue, setInputValue] = useState<string | undefined>(
    typeof item.value === 'string'
      ? item.value
      : typeof item.operator === 'string'
      ? item.operator
      : item.id
  );
  const dropRef = useRef<HTMLDivElement>(null);
  const portal = useImperativePortal(floatingPortal);
  const [openDrop, anchorRef] = useDrop<any>(
    ({ handleClose }) => {
      return (
        <DropContent
          ref={dropRef}
          handleClose={handleClose}
          onItemClick={onOptionClick}
        />
      );
    },
    {
      deps: [],
      placement: 'bottom-start',
      blurResistant: true,
      tailored: false,
      portal,
      style: { width: '250px', marginTop: '2px' },
    }
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const closeDropRef = useRef<() => void | void>();
  const stableRef = useMemo(
    () => mergeRefs([inputRef, anchorRef]),
    [inputRef, anchorRef]
  );
  const handleClose = useCallback(() => {
    closeDropRef.current?.();
  }, []);

  const handleOpen = useCallback(() => {
    closeDropRef.current = openDrop();
  }, [openDrop, index]);

  const onOptionClick = useCallback(
    (value: string) => {
      handleClose();
      const key =
        typeof item.value === 'string'
          ? 'value'
          : typeof item.operator === 'string'
          ? 'operator'
          : 'id';
      updateItem(index, key, value);
      if (key === 'id') {
        updateItem(index, 'operator', '');
      }
      if (key === 'operator') {
        updateItem(index, 'value', '');
      }
      if (key === 'value') {
        setEditingIndex(-1);
      } else {
        setEditingIndex(index);
      }
    },
    [index, item]
  );
  const onItemClick = useCallback(() => {
    setEditingIndex(index);
  }, [index, item, handleOpen]);

  useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [editingIndex, item]);
  const onBlur = ev => {
    if (
      !ev.relatedTarget ||
      !dropRef.current ||
      !dropRef.current.contains(ev.relatedTarget)
    ) {
      handleClose();
      if (ev.target.value && item.operator) {
        setEditingIndex(undefined);
      }
    }
  };

  useEffect(() => {
    const onFocus = ev => {
      handleOpen();
    };

    const onKeydown = ev => {
      if (ev.key === 'Backspace' && ev.target.selectionStart === 0) {
        if (typeof item.value === 'string') {
          updateItem(index, 'value', undefined);
          return;
        }
        if (typeof item.operator === 'string') {
          updateItem(index, 'operator', undefined);
          return;
        }
        setEditingIndex(index - 1);
        removeItem(index);
      }
    };
    if (inputRef.current) {
      inputRef.current.addEventListener('focus', onFocus);
      inputRef.current.addEventListener('keydown', onKeydown);
      inputRef.current.addEventListener('blur', onBlur);
    }
    return () => {
      inputRef.current?.removeEventListener('focus', onFocus);
      inputRef.current?.removeEventListener('keydown', onKeydown);
      inputRef.current?.removeEventListener('blur', onBlur);
    };
  }, [inputRef.current]);
  return (
    <li {...props} sx={{ display: 'flex', mr: 1 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 0,
          mr: 1,
          alignItems: 'center',
        }}
        onClick={onItemClick}
      >
        {Object.entries(item)
          .filter(([_, keyValue]) => typeof keyValue === 'string')
          .map(([key, keyValue], itemIndex, arr) => {
            if (editingIndex === index && itemIndex === arr.length - 1) {
              return null;
            } else {
              if (key === 'value') {
                return (
                  <ListItemTokenValue
                    key={keyValue}
                    id={item['id']}
                    value={keyValue}
                  />
                );
              }
              return (
                <ListItemToken key={key} id={key}>
                  {keyValue}
                </ListItemToken>
              );
            }
          })}
      </Box>
      <Input
        key={hash(item)}
        ref={stableRef}
        style={{ width: editing ? '200px' : '0px' }}
        tabIndex={editing ? 0 : -1}
        value={inputValue}
        onChange={setInputValue}
      />
      <DropContext.Provider value={{ query: inputValue }}>
        {portal}
      </DropContext.Provider>
    </li>
  );
};

const ComplexSearchContainer = props => {
  return (
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Box
        sx={{
          pl: 2,
          whiteSpace: 'nowrap',
          overflowX: 'auto',
          backgroundColor: 'accentContext',
          borderRadius: 4,
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          '&:focus-within': {
            outline: '2px solid',
            outlineColor: 'primary',
          },
        }}
        {...props}
      />
    </Box>
  );
};

const Input = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <TextInput ref={ref} sx={{ height: '32px' }} variant="pure" {...props} />
  );
});

const DropContent = forwardRef<
  HTMLDivElement,
  DropRendererProps & { onItemClick }
>(({ handleClose, onItemClick }, ref) => {
  const { items, editingIndex, proposes } = useContext(ComplexSearchContext);
  const currentItem =
    (editingIndex as number) >= 0 && (items[editingIndex as number] ?? {});
  const propose = proposes.find(propose => propose.id === currentItem?.id);
  const token =
    typeof currentItem.value === 'string'
      ? 'value'
      : typeof currentItem.operator === 'string'
      ? 'operator'
      : 'id';

  const TokenMenu = {
    id: Ids,
    value: Values,
    operator: Operators,
  }[token];

  return (
    <Box ref={ref}>
      <DropContentContext.Provider value={{ handleClose, onItemClick }}>
        <TokenMenu propose={propose} />
      </DropContentContext.Provider>
    </Box>
  );
});
const DropContentContext = createContext({} as DropContentContextOptions);

interface DropContentContextOptions {
  handleClose;
  onItemClick;
}

const Ids = () => {
  const { handleClose, onItemClick } = useContext(DropContentContext);
  const { proposes } = useContext(ComplexSearchContext);
  return (
    <DropMenu handleClose={handleClose} onItemClick={onItemClick}>
      {proposes.map(({ label, id }) => (
        <DropMenuItem key={id} value={id}>
          {label}
        </DropMenuItem>
      ))}
    </DropMenu>
  );
};
const Values = ({ propose }) => {
  const [t] = useTranslation('common');
  const { itemsValueOptions, fetchItemValueOptions } =
    useContext(ComplexSearchContext);
  const { handleClose, onItemClick } = useContext(DropContentContext);
  const { query } = useContext(DropContext);
  const items = itemsValueOptions[propose.id];
  useEffect(() => {
    fetchItemValueOptions(propose.id);
  }, [propose]);

  if (!Array.isArray(items)) {
    return <Loader size="large" />;
  }
  return (
    <DropMenu handleClose={handleClose} onItemClick={onItemClick}>
      {items
        ?.map(option => (
          <DropMenuItem key={option.id} value={option.id}>
            {propose?.renderOption(option)}
          </DropMenuItem>
        ))
        .concat(
          query
            ? [
                <DropMenuItem key={query} value={query ?? ''}>
                  {t('actions.searchForThisText')}
                </DropMenuItem>,
              ]
            : []
        )
        .filter(Boolean)}
    </DropMenu>
  );
};
const Operators = ({ propose }) => {
  const { handleClose, onItemClick } = useContext(DropContentContext);
  return (
    <DropMenu handleClose={handleClose} onItemClick={onItemClick}>
      {propose.operators?.map(operator => (
        <DropMenuItem key={operator} value={operator}>
          {operator}
        </DropMenuItem>
      ))}
    </DropMenu>
  );
};

const ListItemTokenValue = ({ id, value }) => {
  const { proposes, itemsValueOptions, fetchItemValueOptions } =
    useContext(ComplexSearchContext);
  const propose = useMemo(
    () => proposes.find(p => p.id === id),
    [proposes, id]
  );
  if (!propose) {
    return <span>{value}</span>;
  }
  const maybeItems = itemsValueOptions[propose.id];
  const item =
    maybeItems !== 'loading' && maybeItems?.find(i => i.id === value);
  useEffect(() => {
    if (maybeItems !== 'loading' && !Array.isArray(maybeItems)) {
      fetchItemValueOptions(propose.id);
    }
  }, [maybeItems]);

  if (item) {
    return <ListItemToken>{propose?.renderSelectial(item)}</ListItemToken>;
  }
  if (!Array.isArray(maybeItems)) {
    return (
      <ListItemToken sx={{ width: '100px', height: '1.5em' }}>
        <Skeleton />
      </ListItemToken>
    );
  }
  return <ListItemToken>{value}</ListItemToken>;
};

const ListItemToken = props => {
  const { colors } = useDeltaTheme();
  return (
    <Box
      sx={{
        px: 1,
        py: '2px',
        backgroundColor: lighten(0.08, colors.accentContext),
      }}
      {...props}
    />
  );
};
