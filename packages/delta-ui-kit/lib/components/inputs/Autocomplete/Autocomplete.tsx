import { jsx } from '@theme-ui/core';
import { HTMLAttributes, useState } from 'react';
import {
  Children,
  createContext,
  forwardRef,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { IoSearch } from 'react-icons/io5';
import { useDrop, useImperativePortal, useUpdateEffect } from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { getChildrenKey, hash, mergeRefs } from '../../../utils';
import { Box, SystemContext } from '../../containers';
import { TextInput } from '../TextInput';
import { AutocompleteDrop } from './AutocompleteDrop';
import { AutocompleteOptionProps } from './AutocompleteOption';
import { AutocompleteSelection } from './AutocompleteSelection';
import { getInitialInnerValue, getTitleByValue } from './utils';

export interface AutocompleteSelection {
  value: unknown;
  title: string;
}

export interface AutocompleteContextValue {
  childrenArray: ReactElement<AutocompleteOptionProps>[];
  selections: AutocompleteSelection[];
  handleRemoval: (value: unknown) => void;
  handleAddition: (value: unknown, title: string) => void;
}

export const AutocompleteContext = createContext<AutocompleteContextValue>({
  childrenArray: [],
  selections: [],
  handleRemoval: () => {},
  handleAddition: () => {},
});

export type AutocompleteChild =
  | ReactElement<AutocompleteOptionProps>
  | null
  | undefined
  | false;

export interface AutocompleteProps
  extends Omit<
      HTMLAttributes<HTMLLabelElement>,
      'children' | keyof FormWidgetProps
    >,
    FormWidgetProps<unknown> {
  children: AutocompleteChild[] | ((query: string) => AutocompleteChild[]);
  multiple?: boolean;
  placeholder?: string;
  query?: string;
  onQuery?: (query: string) => void;
}

export const Autocomplete = forwardRef<HTMLLabelElement, AutocompleteProps>(
  (
    {
      children,
      multiple,
      placeholder,
      query,
      onQuery,
      value,
      disabled,
      invalid, // TODO
      onChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { floatingPortal } = useContext(SystemContext);
    const portal = useImperativePortal(floatingPortal);
    const [innerQuery, setInnerQuery] = useState(query ?? '');
    const childrenArray = useMemo(
      () =>
        (children instanceof Function
          ? children(innerQuery)
          : Children.toArray(children).filter(
              Boolean
            )) as ReactElement<AutocompleteOptionProps>[],
      [
        children instanceof Function
          ? hash(children) + hash(innerQuery)
          : getChildrenKey(children, { pivots: ['value'] }),
      ]
    );
    const [backspacePressed, setBackspacePressed] = useState(false);
    const valueItems = useMemo(
      () =>
        multiple
          ? Array.isArray(value)
            ? value
            : []
          : value === undefined
          ? []
          : [value],
      [multiple, value]
    );
    const [selections, setSelections] = useState<AutocompleteSelection[]>(() =>
      getInitialInnerValue(childrenArray, valueItems)
    );
    const handleAddition = useCallback(
      (value: unknown, title: string) => {
        setBackspacePressed(false);
        const addition = [{ value, title }];
        const nextSelections = multiple
          ? selections.filter(v => v.value !== value).concat(addition)
          : addition;
        setSelections(nextSelections);
        setInnerQuery('');
        onChange?.(multiple ? nextSelections.map(v => v.value) : value);
        onQuery?.('');
        multiple && inputRef.current?.focus();
      },
      [selections, onChange, onQuery, multiple]
    );
    const handleRemoval = useCallback(
      (value: unknown) => {
        setBackspacePressed(false);
        const nextSelections = selections.filter(v => v.value !== value);
        setSelections(nextSelections);
        onChange?.(
          multiple ? nextSelections.map(v => v.value) : nextSelections[0]?.value
        );
      },
      [selections, onChange]
    );
    const dropRef = useRef<HTMLDivElement>(null);
    const closeDropRef = useRef<undefined | (() => void)>();
    const [openDrop, anchorRef] = useDrop<HTMLLabelElement>(
      props => <AutocompleteDrop ref={dropRef} {...props} />,
      {
        deps: [],
        portal,
        tailored: true,
        blurResistant: true,
        placement: 'bottom-start',
      }
    );
    const mergedRef = useMemo(
      () => mergeRefs([ref, anchorRef]),
      [ref, anchorRef]
    );
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
        setInnerQuery(query);
        onQuery?.(query);
      },
      [onQuery, handleOpen]
    );
    const contextValue = useMemo<AutocompleteContextValue>(
      () => ({ childrenArray, selections, handleRemoval, handleAddition }),
      [childrenArray, selections, handleRemoval, handleAddition]
    );
    useUpdateEffect(() => {
      if (
        valueItems.length !== selections.length ||
        valueItems.some(item => selections.every(v => v.value !== item))
      ) {
        setSelections(
          valueItems.map(v => ({
            value: v,
            title: getTitleByValue(childrenArray, v),
          }))
        );
      }
    }, [valueItems]);
    useUpdateEffect(() => {
      !multiple && handleClose();
    }, [selections]);
    useUpdateEffect(() => {
      query !== innerQuery && setInnerQuery(query ?? '');
    }, [query]);
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
        if (ev.key === 'Backspace') {
          if (ev.target.selectionStart === 0) {
            if (backspacePressed) {
              setBackspacePressed(false);
              if (selections.length > 0) {
                handleRemoval(selections[selections.length - 1].value);
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
      <AutocompleteContext.Provider value={contextValue}>
        {portal}
        <label
          ref={mergedRef}
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
              ref={inputRef}
              autoComplete="off"
              placeholder={placeholder}
              style={{ paddingLeft: selections?.length ? '0.45em' : 0 }}
              sx={{ fontSize: 2 }}
              value={innerQuery}
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
          {selections.map(({ value, title }, index) => {
            const removing =
              backspacePressed && index === selections.length - 1;
            return (
              <AutocompleteSelection
                key={hash(value)}
                style={{ opacity: removing ? 0.5 : 1 }}
                onClick={() => handleRemoval(value)}
              >
                {title}
              </AutocompleteSelection>
            );
          })}
          <IoSearch
            sx={{
              position: 'absolute',
              top: '50%',
              right: 2,
              width: '1.25em',
              height: '1.25em',
              transform: 'translateY(-50%)',
            }}
          />
        </label>
      </AutocompleteContext.Provider>
    );
  }
);
