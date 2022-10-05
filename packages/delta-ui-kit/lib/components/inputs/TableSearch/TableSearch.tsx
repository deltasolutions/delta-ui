import { jsx } from '@theme-ui/core';
import { at } from 'lodash-es';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { HTMLAttributes, ReactNode, useContext, useRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import {
  useDebounce,
  useDrop,
  useImperativePortal,
  useUpdateEffect,
} from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { hash, mergeRefs } from '../../../utils';
import { Box, SystemContext } from '../../containers';
import { Loader } from '../../displays';
import { TextInput } from '../TextInput';
import {
  TableSearchContext,
  TableSearchContextOptions,
} from './TableSearchContext';
import { TableSearchDrop } from './TableSearchDrop';

export interface TableSearchProps
  extends Omit<
      HTMLAttributes<HTMLLabelElement>,
      'children' | keyof FormWidgetProps
    >,
    FormWidgetProps<unknown> {
  value?: string[];
  initialItems?: { [key: string]: unknown[] };
  queryables?: QueryableOptions[];
  onChange?: (v: string[]) => void;
}

export interface QueryableOptions {
  id: string;
  label?: string;
  operators: string[];
  getItems: (query: string) => Promise<unknown[]>;
  renderSelection: (datum) => ReactNode;
  renderOption: (datum) => ReactNode;
}

export const TableSearch = forwardRef<HTMLInputElement, TableSearchProps>(
  (
    {
      placeholder,
      value: propsValue,
      queryables,
      initialItems: propsInitialItems,
      disabled,
      onChange: propsOnChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const { floatingPortal } = useContext(SystemContext);
    const [items, setItems] = useState<{ [key: string]: unknown[] }>(
      propsInitialItems ?? {}
    );
    const portal = useImperativePortal(floatingPortal);
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 100);
    const [backspacePressed, setBackspacePressed] = useState(false);
    const [options, setOptions] = useState<string[]>([]);
    const [selections, setSelections] = useState<string[]>(propsValue ?? []);
    const handleAddition = useCallback(
      (value: string) => {
        setQuery('');
        setBackspacePressed(false);
        const nextSelections = selections
          .filter(v => v !== value)
          .concat([value]);
        setOptions([]);
        setSelections(nextSelections);
        propsOnChange?.(nextSelections);
        inputRef.current?.focus();
      },
      [selections, propsOnChange]
    );

    const handleRemoval = useCallback(
      (value: unknown) => {
        setBackspacePressed(false);
        const nextSelections = selections.filter(v => v !== value);
        setSelections(nextSelections);
        propsOnChange?.(nextSelections);
        setOptions([]);
      },
      [selections, propsOnChange]
    );
    const dropRef = useRef<HTMLDivElement>(null);
    const closeDropRef = useRef<undefined | (() => void)>();
    const [openDrop, anchorRef] = useDrop<HTMLLabelElement>(
      props => <TableSearchDrop ref={dropRef} {...props} />,
      {
        deps: [],
        portal,
        tailored: true,
        style: {
          width: '220px',
          marginTop: '12px',
          maxHeight: '400px',
          overflow: 'auto',
        },
        blurResistant: true,
        placement: 'bottom-start',
      }
    );
    const mergedRef = useMemo(() => {
      const refs = [ref, anchorRef, inputRef].filter(Boolean) as any;
      return mergeRefs(refs);
    }, [ref, anchorRef, inputRef]);
    const handleOpen = useCallback(() => {
      closeDropRef.current = openDrop();
    }, [openDrop]);

    const handleClose = useCallback(() => {
      closeDropRef.current?.();
    }, []);
    const handleQueryChange = useCallback(
      query => {
        handleOpen();
        setBackspacePressed(false);
        setQuery(query);
      },
      [handleOpen]
    );

    const renderSelection = (id, index, arr) => {
      const maybeInput = id.slice(0, 6) === '_query';
      if (maybeInput) {
        return id.split(':').at(-1);
      }
      if (id.includes('|')) {
        return id.split('|')[1];
      }
      const queryable = queryables?.find(q => q.id === id);
      if (queryable) {
        return queryable.label;
      }
      const itemQueryableId = arr[index - 1].split('|')[0];
      if (itemQueryableId) {
        const queryable = queryables?.find(q => q.id === itemQueryableId);
        return queryable?.renderSelection(
          items[itemQueryableId].find((i: any) => i.id === id)
        );
      }
    };
    const contextValue = useMemo<TableSearchContextOptions>(
      () => ({
        options,
        selections,
        handleRemoval,
        queryables,
        handleAddition,
        loading,
        items,
      }),
      [
        options,
        selections,
        handleRemoval,
        handleAddition,
        queryables,
        items,
        loading,
      ]
    );
    useUpdateEffect(() => {
      if (propsValue) {
        setSelections(propsValue);
      }
    }, [propsValue]);

    useEffect(() => {
      setOptions([]);
      const lastId = selections.at(-1) ?? '';
      if (!lastId.includes('|')) {
        setLoading(false);
      }
      const queryableIds = queryables?.map(q => q.id);
      if (queryableIds?.includes(lastId)) {
        const queryableId = selections.at(-1);
        const queryable = queryables?.find(q => q.id === queryableId);
        const filteredOperators =
          queryable?.operators.filter(o => o.includes(debouncedQuery)) ?? [];
        setOptions(filteredOperators.map(operator => `${lastId}|${operator}`));
        return;
      }

      if (lastId.includes('|')) {
        const queryKey = lastId.split('|')[0];
        const queryable = queryables?.find(q => q.id === queryKey);
        if (queryable) {
          setLoading(true);

          if (debouncedQuery) {
            setOptions([`_query:${lastId.split('|')[0]}:${debouncedQuery}`]);
          }
          queryable
            .getItems(debouncedQuery)
            .then(items => {
              setSelections(prev => {
                setItems(prev => ({ ...prev, [queryable.id]: items }));
                if (prev.at(-1) === lastId) {
                  const ids = items.map((i: any) => i.id);
                  setOptions(
                    [
                      ...ids,
                      debouncedQuery
                        ? `_query:${lastId.split('|')[0]}:${debouncedQuery}`
                        : undefined,
                    ].filter(Boolean)
                  );
                }
                return prev;
              });
            })
            .catch(e => {
              console.error(e);
            })
            .finally(() => {
              setLoading(false);
            });
          return;
        }
      }
      const filteredIds =
        queryables
          ?.filter(q => {
            if (selections?.includes(q.id)) {
              return false;
            }
            if (
              q.label
                ?.toLocaleLowerCase()
                .includes(debouncedQuery.toLocaleLowerCase())
            ) {
              return true;
            }
            return false;
          })
          .map(i => i.id) ?? [];
      setOptions(
        [...filteredIds, debouncedQuery && `_query:${debouncedQuery}`].filter(
          Boolean
        ) as string[]
      );
    }, [selections, queryables, debouncedQuery]);
    useEffect(() => {
      const handleNativeBlur = ev => {
        if (
          !ev.relatedTarget ||
          !dropRef.current ||
          !dropRef.current.contains(ev.relatedTarget)
        ) {
          setBackspacePressed(false);
          handleClose();
        }
      };
      const handleKeydown = ev => {
        if (ev.key === 'ArrowDown') {
          handleOpen();
          return;
        }

        if (ev.metaKey && ev.key === 'Backspace') {
          setSelections([]);
          return;
        }
        if (ev.key === 'Backspace') {
          if (ev.target.selectionStart === 0) {
            if (backspacePressed) {
              setBackspacePressed(false);
              if (selections.length > 0) {
                handleRemoval(selections[selections.length - 1]);
              }
            } else {
              setBackspacePressed(true);
            }
          }
          return;
        }
      };
      inputRef.current?.addEventListener('blur', handleNativeBlur);
      inputRef.current?.addEventListener('keydown', handleKeydown);

      return () => {
        inputRef.current?.removeEventListener('blur', handleNativeBlur);
        inputRef.current?.removeEventListener('keydown', handleKeydown);
      };
    }, [handleOpen, backspacePressed, selections]);

    return (
      <TableSearchContext.Provider value={contextValue}>
        {portal}
        <label
          sx={{
            boxSizing: 'border-box',
            width: '100%',
            position: 'relative',
            backgroundColor: 'accentContext',
            borderRadius: 4,
            padding: '0.55em 0.60em',
            paddingRight: '2em',
            gap: '2px',
            height: '100%',
            letterSpacing: 'normal',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            cursor: disabled ? 'not-allowed' : 'text',
            '&:focus-within': {
              outline: '2px solid',
              outlineColor: 'primary',
            },
          }}
          {...rest}
        >
          <Box sx={{ width: 'fit-content', flexGrow: 1, order: 1000 }}>
            <TextInput
              ref={mergedRef}
              autoComplete="off"
              placeholder={placeholder}
              style={{ paddingLeft: selections?.length ? '0.45em' : 0 }}
              sx={{ fontSize: 2 }}
              value={query}
              variant="pure"
              onBlur={onBlur}
              onChange={handleQueryChange}
              onClick={handleOpen}
              onFocus={() => {
                handleOpen();
                onFocus?.();
              }}
            />
          </Box>

          {selections.map((id, index, arr) => {
            const removing =
              backspacePressed && index === selections.length - 1;

            return (
              <Box
                key={hash(id)}
                style={{
                  opacity: removing ? 0.5 : 1,
                  marginLeft:
                    index === 0 ||
                    arr[index - 1]?.includes('|') ||
                    id.split('|').length === 2
                      ? 0
                      : 8,
                }}
                sx={{
                  px: 2,
                  py: '2px',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                }}
              >
                {renderSelection(id, index, arr)}
              </Box>
            );
          })}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              display: 'flex',
              alignItems: 'center',
              transform: 'translateY(-50%)',
              right: 2,
            }}
          >
            {loading ? (
              <Loader size="small" />
            ) : (
              <IoSearch sx={{ width: '1.4em', height: '1.4em' }} />
            )}
          </Box>
        </label>
      </TableSearchContext.Provider>
    );
  }
);
