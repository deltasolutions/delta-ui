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
  autoUpdate,
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import {
  forwardRef,
  HTMLAttributes,
  Ref,
  useRef,
  ReactElement,
  useState,
  useLayoutEffect,
  useMemo,
  useEffect,
  useCallback,
  cloneElement,
  Children,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useDataStack, useStack } from '../../hooks';
import { mergeRefs } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { ContainerProps } from '../Container';
import { TextField, TextFieldProps } from '../input';
import { AutocompleteOptionProps } from './AutocompleteOption';

export interface OptionsProps<T> {
  value: T;
  isActive: boolean;
}

export interface ValueOptions<T> {
  value: T;
  onRemove: () => void;
}

export interface AutocompleteProps<T extends unknown>
  extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange' | 'children'> {
  children: ReactElement<AutocompleteOptionProps>[];
  value?: (string | number)[];
  onQuery?: (value: string) => void;
  query?: string;
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
  inputProps?: TextFieldProps;
  renderContainer?: (props: ContainerProps) => ReactElement;
  renderInput?: (props: TextFieldProps) => ReactElement;
  onChange?: (value: AutocompleteOptionProps['value'][]) => void;
  onSearch?: (query: string) => void;
  onOpen?: (query: string) => void;
}

const InnerAutocomplete = <T extends unknown>(
  {
    value: propsValues,
    query: propsQuery,
    onChange: propsOnChange,
    isOpen: propsIsOpen,
    setIsOpen: propsSetIsOpen,
    onQuery: propsOnQuery,
    inputProps,
    children,
    ...rest
  }: AutocompleteProps<T>,
  ref: Ref<HTMLInputElement>
) => {
  const [_inputValue, _setInputValue] =
    useState<InputHTMLAttributes<HTMLInputElement>['value']>('');
  const [_isOpen, _setIsOpen] = useState<boolean>(false);
  const [_values, _setValues] = useState<AutocompleteProps<T>['value']>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const onQuery = propsOnQuery ?? (value => _setInputValue(value));
  const query = propsQuery ?? _inputValue;
  const isOpen = propsIsOpen ?? _isOpen;
  const setIsOpen = propsSetIsOpen ?? _setIsOpen;
  const value = propsValues ?? _values;
  const onChange = propsOnChange ?? _setValues;
  const [__, cacheStack, cacheStackReducer] =
    useDataStack<{ value: string; index: number }>();
  const options: ReactElement<AutocompleteOptionProps>[] =
    Children.toArray(children);
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
              maxHeight: `${height}px`,
            });
          },
          padding: 10,
        }),
      ],
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
        loop: false,
      }),
    ]
  );
  const stableRef = useMemo(
    () => mergeRefs([ref, reference]),
    [ref, reference]
  );
  if (isOpen && options.length === 0 && activeIndex !== null) {
    setActiveIndex(null);
  }
  const addValue = useCallback(
    (newValue, index = -1) => {
      if (index === -1) {
        value?.push(newValue);
      } else {
        value?.splice(index, 0, newValue);
      }
      console.log('addValue.value');
      onChange(value ?? []);
    },
    [value, onChange]
  );
  const removeValue = useCallback(
    (valueToRemove, index) => {
      cacheStack.push({ value: valueToRemove, index });
      onChange(value?.filter(v => v !== valueToRemove) ?? []);
    },
    [value, onChange, cacheStack]
  );
  const returnLastValue = useCallback(() => {
    const valueToReturn = cacheStack.pop();
    if (!valueToReturn) {
      return;
    }
    addValue(valueToReturn.value, valueToReturn.index);
  }, [cacheStack, addValue]);
  const onInputFocus = useCallback(() => {
    if (!!query) {
      setIsOpen(true);
    }
  }, [setIsOpen, query]);
  const onInputKeyDown = useCallback(
    e => {
      if (e.keyCode === 90 && (e.ctrlKey || e.metaKey)) {
        returnLastValue();
      }
      if (e.key === 'Enter' && activeIndex != null && options[activeIndex]) {
        const option = options[activeIndex];
        onQuery('');
        setActiveIndex(null);
        setIsOpen(false);
        addValue(option.props.value);
        return;
      }
      if (e.key === 'Backspace' && e.target.selectionStart === 0) {
        setIsOpen(false);
        setActiveIndex(null);
        removeValue(
          value?.[value?.length - 1],
          value?.indexOf(value?.[value?.length - 1])
        );
        return;
      }
    },
    [options, addValue, activeIndex]
  );
  const onInputClick = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const onOptionClick = useCallback(
    value => {
      onQuery('');
      addValue(value);
      setIsOpen(false);
    },
    [refs.reference, addValue]
  );
  useEffect(() => {
    if (isOpen && refs.reference.current && refs.floating.current) {
      autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [isOpen, update, refs.reference, refs.floating]);
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (activeIndex != null) {
        listRef.current[activeIndex]?.scrollIntoView({
          block: 'nearest',
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, options]);
  return (
    <label
      htmlFor={id}
      sx={{
        width: '100%',
        position: 'relative',
        backgroundColor: 'tertiary',
        borderRadius: 4,
        p: '5px',
        gap: '2px',
        height: '100%',
        lineHeight: '1rem',
        letterSpacing: 'normal',
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        '&:focus-within': {
          outline: '5px auto -webkit-focus-ring-color',
        },
      }}
      {...rest}
    >
      {value?.map((item, index) => {
        console.log(item, index);

        return (
          <Box
            sx={{
              px: 2,
              fontSize: 1,
              borderRadius: 4,
              gap: 2,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            {item}
            <Button
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'white',
              }}
              onClick={() => removeValue(item, index)}
              tabIndex={-1}
            >
              <IoCloseCircleOutline size={14} />
            </Button>
          </Box>
        );
      })}
      {isOpen && options.length > 0 && (
        <Box
          sx={{
            p: 1,
            borderColor: 'outline',
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 4,
            backgroundColor: 'black',
          }}
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              left: x ?? '',
              top: y ?? '',
              overflowY: 'auto',
            },
          })}
        >
          {options.map((option, index) => {
            const { value } = option.props;
            return cloneElement(option, {
              ...getItemProps({
                key: value,
                ref(node) {
                  listRef.current[index] = node;
                },
                onClick: () => onOptionClick(value),
              }),
              isActive: index === activeIndex,
            });
          })}
        </Box>
      )}
      <TextField
        {...{
          id,
          autoComplete: 'off',
          sx: {
            width: 'fit-content',
            flexGrow: 1,
            height: '22px',
            outline: 'none',
          },
          ...getReferenceProps({
            ref: stableRef,
            value: query,
            'aria-autocomplete': 'list',
            onKeyDown: onInputKeyDown,
            onClick: onInputClick,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              onQuery(e.target.value),
            onFocus: onInputFocus,
          }),
        }}
        {...inputProps}
      />
    </label>
  );
};

export const Autocomplete = forwardRef(InnerAutocomplete) as <
  T extends unknown
>(
  p: AutocompleteProps<T> & { ref?: Ref<HTMLLabelElement> }
) => ReactElement;
