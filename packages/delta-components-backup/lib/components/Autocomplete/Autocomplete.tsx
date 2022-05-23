/* eslint-disable @typescript-eslint/naming-convention */
import {
  size,
  useId,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  flip,
  offset,
  autoUpdate
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  HTMLAttributes,
  Ref,
  useRef,
  ReactElement,
  useState,
  Fragment,
  useLayoutEffect,
  useMemo,
  useEffect,
  useCallback
} from 'react';
import { mergeRefs } from '../../utils';
import { Box, BoxProps } from '../Box';
import { Container, ContainerProps } from '../Container';
import { TextField, TextFieldProps } from '../input';
import { Suggestions, SuggestionsProps, Suggestion } from './Suggestions';
import { Values } from './Values';
interface RenderSelectedValueOptions extends BoxProps {
  onClose: () => void;
  value: unknown;
}
export interface SuggestionOptions<T> {
  value: T;
  isActive: boolean;
}
export interface ValueOptions<T> {
  value: T;
  onRemove: () => void;
}
export interface AutocompleteProps<T extends unknown>
  extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  suggestions: {
    value: T;
    id: string | number;
    render?: (options: SuggestionOptions<T>) => ReactElement;
  }[];
  values?: {
    value: unknown;
    id: number | string;
    render: (options: ValueOptions<T>) => ReactElement;
  }[];
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  inputProps?: TextFieldProps;
  renderContainer?: (props: ContainerProps) => ReactElement;
  renderInput?: (props: TextFieldProps) => ReactElement;
  renderSuggestions?: (props: SuggestionsProps) => ReactElement;
  renderSelectedValue?: (options: RenderSelectedValueOptions) => ReactElement;
  onChange?: (values: AutocompleteProps<T>['values']) => void;
  onSearch?: (query: string) => void;
  onOpen?: (query: string) => void;
}

const InnerAutocomplete = <T extends unknown>(
  {
    inputProps = {},
    renderInput,
    renderSuggestions,
    renderContainer,
    suggestions,
    values: propsValues,
    onChange: propsOnChange,
    isOpen: propsIsOpen,
    setIsOpen: propsSetIsOpen,
    ...rest
  }: AutocompleteProps<T>,
  ref: Ref<HTMLInputElement>
) => {
  const [_inputValue, _setInputValue] = useState('');
  const [_isOpen, _setIsOpen] = useState<boolean>(false);
  const [_values, _setValues] = useState<AutocompleteProps<T>['values']>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const {
    onChange: onInputChange = e => _setInputValue(e.target.value),
    value: inputValue = _inputValue,
    ...restInputProps
  } = inputProps;
  const isOpen = propsIsOpen ?? _isOpen;
  const setIsOpen = propsSetIsOpen ?? _setIsOpen;
  const values = propsValues ?? _values;
  const onChange = propsOnChange ?? _setValues;
  //refs
  const listRef = useRef<(HTMLElement | null)[]>([]);
  const id = useId();
  const { x, y, reference, floating, strategy, context, refs, update } =
    useFloating<HTMLInputElement>({
      open: isOpen,
      onOpenChange: setIsOpen,
      middleware: [
        offset(3),
        flip(),
        size({
          apply({ reference, height }) {
            Object.assign(refs.floating.current?.style ?? {}, {
              width: `${reference.width}px`,
              maxHeight: `${height}px`
            });
          },
          padding: 10
        })
      ]
    });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useRole(context, { role: 'listbox' }),
      useDismiss(context),
      useListNavigation(context, {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
        virtual: true,
        loop: false
      })
    ]
  );
  const stableRef = useMemo(
    () => mergeRefs([ref, reference]),
    [ref, reference]
  );
  if (isOpen && suggestions.length === 0 && activeIndex !== null) {
    setActiveIndex(null);
  }
  //events
  const addValue = useCallback(
    (id, value) => {
      //TODO
      onChange([{ ...values, [id]: value }]);
    },
    [values, onChange]
  );
  const removeValue = useCallback(
    id => {
      const copy = JSON.parse(JSON.stringify(values));
      delete copy[id];
      onChange(copy);
    },
    [values, onChange]
  );
  const onInputFocus = useCallback(() => {
    if (!!inputValue) {
      setIsOpen(true);
    }
  }, [setIsOpen, inputValue]);
  const onInputKeyDown = useCallback(
    e => {
      if (
        e.key === 'Enter' &&
        activeIndex != null &&
        suggestions[activeIndex]
      ) {
        const sugg = suggestions[activeIndex];
        onInputChange({ target: { value: '' } } as any);
        setActiveIndex(null);
        setIsOpen(false);
        addValue(sugg.id, sugg.value);
        return;
      }
      if (e.key === '') {
      }
    },
    [suggestions, addValue, activeIndex]
  );
  const onInputBlur = useCallback(() => {}, []);
  const onInputDoubleClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const onOptionClick = useCallback(
    (suggestion, index, id) => {
      onInputChange({ target: { value: '' } } as any);
      addValue(id, suggestion);
    },
    [refs.reference, addValue]
  );
  //jsx Elements
  const jsxInputProps = {
    id,
    autoComplete: 'off',
    sx: {
      width: 'fit-content',
      flexGrow: 1,
      height: '22px',
      outline: 'none'
    },
    ...getReferenceProps({
      ref: stableRef,
      value: inputValue,
      'aria-autocomplete': 'list',
      onKeyDown: onInputKeyDown,
      onDoubleClick: onInputDoubleClick,
      onChange: onInputChange,
      onFocus: onInputFocus
    }),
    ...restInputProps
  };

  const jsxSuggestionListProps = {
    children: (
      <Fragment>
        {suggestions.map((suggestion, index) => {
          const onClick = () =>
            onOptionClick(suggestion.value, index, suggestion.id);
          const jsxSuggestionProps = {
            isActive: index === activeIndex,
            ...suggestion
          };
          const wrapperProps = getItemProps({
            key: suggestion.id,
            ref(node) {
              listRef.current[index] = node;
            },
            onClick
          });
          return suggestion?.render ? (
            <Box {...wrapperProps}>
              {suggestion?.render?.(jsxSuggestionProps)}
            </Box>
          ) : (
            <Suggestion {...wrapperProps} {...jsxSuggestionProps} />
          );
        })}
      </Fragment>
    )
  };

  const jsxContainerProps = {
    htmlFor: id,
    children: (
      <Fragment>
        <Values values={values} onRemove={removeValue} />
        {isOpen && suggestions.length > 0 && (
          <Box
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                left: x ?? '',
                top: y ?? '',
                overflowY: 'auto'
              }
            })}
          >
            {renderSuggestions?.(jsxSuggestionListProps) ?? (
              <Suggestions {...jsxSuggestionListProps} />
            )}
          </Box>
        )}
        {renderInput?.(jsxInputProps) ?? <TextField {...jsxInputProps} />}
      </Fragment>
    )
  };

  //effects
  useEffect(() => {
    if (isOpen && refs.reference.current && refs.floating.current) {
      autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [isOpen, update, refs.reference, refs.floating]);
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (activeIndex != null) {
        listRef.current[activeIndex]?.scrollIntoView({
          block: 'nearest'
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, suggestions]);
  return (
    renderContainer?.(jsxContainerProps) ?? <Container {...jsxContainerProps} />
  );
};

export const Autocomplete = forwardRef(InnerAutocomplete) as <
  T extends unknown
>(
  p: AutocompleteProps<T> & { ref?: Ref<HTMLLabelElement> }
) => ReactElement;
