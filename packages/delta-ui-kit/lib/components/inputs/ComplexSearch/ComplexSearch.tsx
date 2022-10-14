import { jsx } from '@theme-ui/core';
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
  useReducer,
  RefObject,
} from 'react';
import ReactDOM from 'react-dom';
import {
  useDrop,
  useIsomorphicLayoutEffect,
  useUpdateEffect,
} from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { mergeRefs } from '../../../utils';
import { Button } from '../../Button';
import { Box } from '../../containers';
import { TextInput, TextInputProps } from '../TextInput';

interface Propose {
  id: string;
  operators: string[];
  getItems: (query) => unknown[] | Promise<unknown[]>;
  renderSelectial: (datum) => ReactNode;
  renderOption: (datum) => ReactNode;
}

interface ItemType {
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [itemsValueOptions, setItemsValueOptions] = useState<{
    [key: string]: unknown[] | 'loading';
  }>({});

  const [items, setItems] = useState<ItemType[]>(value);
  const [openDrop, anchorRef] = useDrop(
    props => {
      return <Box>DROP</Box>;
    },
    {
      deps: [],
      placement: 'bottom-end',
      blurResistant: true,
      style: { width: '130px' },
    }
  );
  const closeDropRef = useRef<() => void | void>();
  const stableRef = useMemo(
    () => mergeRefs([anchorRef, inputRef]),
    [inputRef, anchorRef]
  );
  const handleOpen = useCallback(() => {
    requestAnimationFrame(() => (closeDropRef.current = openDrop()));
  }, [openDrop]);

  const handleClose = useCallback(() => {
    closeDropRef.current?.();
  }, []);
  const addItem = useCallback(() => {
    setItems(curr => {
      return [...curr, {}];
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
        return curr;
      });
    },
    []
  );
  const fetchItemValueOptions = useCallback(
    (key: string, query: string) => {
      const propose = proposes.find(i => i.id === key);
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
  useEffect(() => {
    const nativeFocus = () => {
      handleOpen();
    };
    const nativeBlur = e => {
      setEditingIndex(-1);
      handleClose();
    };

    if (inputRef.current) {
      inputRef.current.addEventListener('focus', nativeFocus);
      inputRef.current.addEventListener('blur', nativeBlur);
      editingIndex !== -1 && inputRef.current?.focus();
    }

    return () => {
      inputRef.current?.removeEventListener('focus', nativeFocus);
      inputRef.current?.removeEventListener('blur', nativeBlur);
    };
  }, [inputRef?.current]);

  const onListItemClick = useCallback(index => {
    setEditingIndex(index);
  }, []);

  const contextValue = {
    proposes,
    addItem,
    removeItem,
    updateItem,
    fetchItemValueOptions,
    onListItemClick,
    editingIndex,
  };

  useUpdateEffect(() => {
    onChange?.(items);
  }, [items]);

  return (
    <ComplexSearchContext.Provider value={contextValue}>
      <Container>
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              index={index}
              inputRef={stableRef}
              item={item}
            />
          ))}

          <Box sx={{ flex: 1 }}>
            <Input ref={stableRef} />
          </Box>
        </List>
      </Container>
    </ComplexSearchContext.Provider>
  );
};

const ComplexSearchContext = createContext({} as ComplexSearchContext);

interface ComplexSearchContext {
  proposes: Propose[];
  onListItemClick;
  editingIndex: number;
}
const List = props => {
  return (
    <ul
      sx={{
        minHeight: '1.6em',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        width: '1px',
        listStyle: 'none',
        margin: '6px',
        padding: 0,
      }}
      {...props}
    />
  );
};

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  item: ItemType;
  index: number;
  inputRef;
}
const ListItem = ({ item, index, inputRef, ...props }: ListItemProps) => {
  const { onListItemClick, editingIndex } = useContext(ComplexSearchContext);
  return (
    <li {...props} sx={{ display: 'flex', mr: 2 }}>
      <Box
        sx={{ display: 'flex', gap: 1, background: 'grey' }}
        onClick={() => {
          editingIndex !== index && onListItemClick(index);
        }}
      >
        <Box>{item.id}</Box>
        <Box>{item.operator}</Box>
        <Box>{item.value}</Box>
      </Box>
      {editingIndex === index && <Input ref={inputRef} id={index.toString()} />}
    </li>
  );
};

const Container = props => {
  return (
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Box
        sx={{
          pl: 1,
          whiteSpace: 'nowrap',
          overflowX: 'auto',
          backgroundColor: 'accentContext',
          borderRadius: 4,
          display: 'flex',
          cursor: 'default',
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
    <TextInput ref={ref} sx={{ width: '130px' }} variant="pure" {...props} />
  );
});
