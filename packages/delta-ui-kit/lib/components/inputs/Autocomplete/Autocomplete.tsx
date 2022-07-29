import { jsx } from '@theme-ui/core';
import { HTMLAttributes, ReactNode, useState } from 'react';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
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
import { TextInput } from '../TextInput';
import { AutocompleteDrop } from './AutocompleteDrop';
import { AutocompleteSelection } from './AutocompleteSelection';

export interface AutocompleteContextValue {
  options: unknown[];
  selections: unknown[];
  handleRemoval: (v: unknown) => void;
  handleAddition: (v: unknown) => void;
  renderOption?: (v: unknown) => ReactNode;
  renderSelection?: (v: unknown) => ReactNode;
}

export const AutocompleteContext = createContext<AutocompleteContextValue>({
  options: [],
  selections: [],
  handleRemoval: () => {},
  handleAddition: () => {},
});

export interface AutocompleteProps
  extends Omit<
      HTMLAttributes<HTMLLabelElement>,
      'children' | keyof FormWidgetProps
    >,
    FormWidgetProps<unknown> {
  multiple?: boolean;
  placeholder?: string;
  initialQuery?: string;
  getOptions?: (query: string) => unknown[] | Promise<unknown[]>;
  renderOption?: (v: unknown) => ReactNode;
  renderSelection?: (v: unknown) => ReactNode;
}

export const Autocomplete = forwardRef<HTMLLabelElement, AutocompleteProps>(
  (
    {
      multiple,
      placeholder,
      initialQuery,
      getOptions,
      renderOption,
      renderSelection,
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
    const [query, setQuery] = useState(initialQuery ?? '');
    const debouncedQuery = useDebounce(query, 300);
    const [backspacePressed, setBackspacePressed] = useState(false);
    const valueArray = useMemo(
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
    const [options, setOptions] = useState<unknown[]>([]);
    const [selections, setSelections] = useState<unknown[]>(
      () => valueArray ?? []
    );
    const handleAddition = useCallback(
      (value: unknown) => {
        setBackspacePressed(false);
        const nextSelections = multiple
          ? selections.filter(v => v !== value).concat([value])
          : [value];
        setSelections(nextSelections);
        setQuery('');
        onChange?.(multiple ? nextSelections : value);
        multiple && inputRef.current?.focus();
      },
      [selections, onChange, multiple]
    );
    const handleRemoval = useCallback(
      (value: unknown) => {
        setBackspacePressed(false);
        const nextSelections = selections.filter(v => v !== value);
        setSelections(nextSelections);
        onChange?.(multiple ? nextSelections : nextSelections[0]);
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
        setQuery(query);
      },
      [handleOpen]
    );
    const contextValue = useMemo<AutocompleteContextValue>(
      () => ({
        options,
        selections,
        handleRemoval,
        handleAddition,
        renderOption,
        renderSelection,
      }),
      [
        options,
        selections,
        handleRemoval,
        handleAddition,
        renderOption,
        renderSelection,
      ]
    );
    useEffect(() => {
      if (!getOptions) {
        return;
      }
      const maybeOptions = getOptions(debouncedQuery);
      if (Array.isArray(maybeOptions)) {
        setOptions(maybeOptions);
      } else {
        maybeOptions.then(v => Array.isArray(v) && setOptions(v));
      }
    }, [debouncedQuery]);
    useUpdateEffect(() => {
      if (
        valueArray.length !== selections.length ||
        valueArray.some(v => !selections.includes(v))
      ) {
        setSelections(valueArray);
      }
    }, [valueArray]);
    useUpdateEffect(() => {
      !multiple && handleClose();
    }, [selections]);
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
          {selections.map((value, index) => {
            const removing =
              backspacePressed && index === selections.length - 1;
            return (
              <AutocompleteSelection
                key={hash(value)}
                style={{ opacity: removing ? 0.5 : 1 }}
                onClick={() => handleRemoval(value)}
              >
                {renderSelection?.(value) ?? String(value)}
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
