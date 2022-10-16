import { jsx } from '@theme-ui/core';
import { hash } from 'delta-jsf';
import {
  HTMLAttributes,
  useContext,
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { useDrop, useImperativePortal } from '../../../../hooks';
import { mergeRefs } from '../../../../utils';
import { Box, SystemContext } from '../../../containers';
import { ComplexSearchContext, DropContext } from '../contexts';
import { DropContent } from '../Drop';
import { Input } from '../Input';
import { ComplexSearchItemType } from '../types';
import { ListItemToken } from './ListItemToken';
import { ListItemTokenValue } from './ListItemTokenValue';

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  item: ComplexSearchItemType;
  index: number;
}

export const ListItem = ({ item, index, ...props }: ListItemProps) => {
  const {
    removeItem,
    updateItem,
    editingIndex,
    renderOperator,
    setEditingIndex,
    proposes,
  } = useContext(ComplexSearchContext);
  const { floatingPortal } = useContext(SystemContext);
  const editing = useMemo(() => editingIndex === index, [editingIndex, index]);
  const [inputValue, setInputValue] = useState<string | undefined>(
    typeof item.value === 'string'
      ? item.value
      : typeof item.operator === 'string'
      ? item.operator
      : item.id
  );
  const propose = proposes.find(pr => pr.id === item?.id);
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
      const key =
        typeof item.value === 'string'
          ? 'value'
          : typeof item.operator === 'string'
          ? 'operator'
          : 'id';

      if (ev.target.value && item.operator && key === 'id') {
        setEditingIndex(undefined);
      }
    }
  };

  useEffect(() => {
    const onFocus = ev => {
      handleOpen();
    };

    const onKeydown = ev => {
      if (
        ev.key === 'Backspace' &&
        ev.target.selectionStart === 0 &&
        !ev.target.value
      ) {
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
              if (key === 'operator') {
                return (
                  <ListItemToken key={key}>
                    {renderOperator ? renderOperator(keyValue) : keyValue}
                  </ListItemToken>
                );
              }
              if (key === 'id') {
                return (
                  <ListItemToken key={key}>
                    {propose ? propose?.label : key}
                  </ListItemToken>
                );
              }
              return null;
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
