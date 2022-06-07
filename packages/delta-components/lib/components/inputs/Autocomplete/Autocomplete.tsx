import { jsx } from '@theme-ui/core';
import { HTMLAttributes, useState } from 'react';
import {
  Children,
  createContext,
  forwardRef,
  ReactElement,
  useCallback,
  useMemo,
  useContext,
  useEffect,
  useRef,
} from 'react';
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
  availables: ReactElement<AutocompleteOptionProps>[];
  selections: AutocompleteSelection[];
  handleAddition: (value: unknown, title: string) => void;
}

export const AutocompleteContext = createContext<AutocompleteContextValue>({
  childrenArray: [],
  availables: [],
  selections: [],
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
    FormWidgetProps<unknown[]> {
  children: AutocompleteChild[] | ((query: string) => AutocompleteChild[]);
  placeholder?: string;
  query?: string;
  onQuery?: (query: string) => void;
}

export const Autocomplete = forwardRef<HTMLLabelElement, AutocompleteProps>(
  (
    {
      children,
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
    const inputId = useMemo(() => crypto.randomUUID(), []);
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
    const [selections, setSelections] = useState<AutocompleteSelection[]>(() =>
      getInitialInnerValue(childrenArray, value)
    );
    const availables = useMemo(
      () =>
        childrenArray.filter(
          child => !selections.some(v => v.value === child.props.value)
        ),
      [childrenArray, selections]
    );
    const handleAddition = useCallback(
      (value: unknown, title: string) => {
        setBackspacePressed(false);
        const nextSelections = selections
          .filter(v => v.value !== value)
          .concat([{ value, title }]);
        setSelections(nextSelections);
        setInnerQuery('');
        onChange?.(nextSelections.map(v => v.value));
        onQuery?.('');
        inputRef.current?.focus();
      },
      [selections, onChange, onQuery]
    );
    const handleRemoval = useCallback(
      (value: unknown) => {
        setBackspacePressed(false);
        const nextSelections = selections.filter(v => v.value !== value);
        setSelections(nextSelections);
        onChange?.(nextSelections.map(v => v.value));
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
        placement: 'bottom-start',
      }
    );
    const mergedRef = useMemo(
      () => mergeRefs([ref, anchorRef]),
      [ref, anchorRef]
    );
    const handleOpen = useCallback(() => {
      closeDropRef.current = openDrop();
    }, [openDrop, availables]);
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
      () => ({ childrenArray, availables, selections, handleAddition }),
      [childrenArray, availables, selections, handleAddition]
    );
    useUpdateEffect(() => {
      const items = value ?? [];
      if (
        items.length !== selections.length ||
        items.some(item => selections.every(v => v.value !== item))
      ) {
        setSelections(
          items.map(v => ({
            value: v,
            title: getTitleByValue(childrenArray, v),
          }))
        );
      }
    }, [value]);
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
              handleRemoval(selections[selections.length - 1].value);
              setBackspacePressed(false);
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
          htmlFor={inputId}
          sx={{
            width: '100%',
            position: 'relative',
            backgroundColor: 'accentSurface',
            borderRadius: 4,
            paddingX: '0.55em',
            paddingY: '0.60em',
            gap: 2,
            height: '100%',
            lineHeight: '1rem',
            letterSpacing: 'normal',
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            cursor: disabled ? 'not-allowed' : 'text',
            '&:focus-within': {
              outlineColor: 'primary',
              outlineStyle: 'solid',
              outlineWidth: '2px',
            },
          }}
          {...rest}
        >
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
          <Box sx={{ width: 'fit-content', flexGrow: 1 }}>
            <TextInput
              autoComplete="off"
              id={inputId}
              variant="pure"
              ref={inputRef}
              value={innerQuery}
              placeholder={placeholder}
              onClick={handleOpen}
              onChange={handleQueryChange}
              onFocus={() => {
                handleOpen();
                onFocus?.();
              }}
              onBlur={onBlur}
            />
          </Box>
        </label>
      </AutocompleteContext.Provider>
    );
  }
);