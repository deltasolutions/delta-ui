import {
  autoUpdate,
  size,
  useId,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  flip,
  offset
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  useMemo,
  FocusEvent,
  useCallback,
  ChangeEvent,
  HTMLAttributes
} from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { List, ListItemProps } from '../../List';
import { Tooltip } from '../../Tooltip';
import { TextField, TextFieldProps } from '../TextField';
import { AutocompleteOption } from './AutocompleteOption';

export interface MultipleAutocompleteProps
  extends HTMLAttributes<HTMLLabelElement> {
  data: string[];
  onSearch?: (inputValue: string) => void;
  inputProps?: TextFieldProps;
  optionProps?: ListItemProps;
}
export const MultipleAutocomplete = ({
  data,
  onSearch,
  onFocus: propsOnLabelFocus,
  onChange: propsOnLabelChange,
  onDoubleClick: propsOnLabelDoubleClick,
  inputProps,
  optionProps,
  ...rest
}: MultipleAutocompleteProps) => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [selectedListCache, setSelectedListCache] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLastItemExposed, setIsLastItemExposed] = useState(false);
  const [open, setOpen] = useState(false);
  const listRef = useRef<(HTMLElement | null)[]>([]);
  const id = useId();
  const { x, y, reference, floating, strategy, context, refs, update } =
    useFloating<HTMLInputElement>({
      open,
      onOpenChange: setOpen,
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
  const optionList = useMemo(
    () =>
      data.filter(
        item =>
          item.toLowerCase().includes(inputValue.toLowerCase()) &&
          !selectedList.map(i => i.toLowerCase()).includes(item.toLowerCase())
      ),
    [data, selectedList, inputValue]
  );
  if (open && optionList.length === 0 && activeIndex !== null) {
    setActiveIndex(null);
  }

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      setIsLastItemExposed(false);
      setActiveIndex(0);
      if (value) {
        setOpen(true);
      } else {
        setOpen(false);
      }
      inputProps?.onChange?.(event);
    },
    [inputProps?.onChange]
  );
  const onInputFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.value) {
        setOpen(true);
        setActiveIndex(0);
      }
      inputProps?.onFocus?.(event);
    },
    [inputProps?.onFocus]
  );
  const onInputKeyDown = useCallback(
    (e: any) => {
      if (!e.target.value) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
          setIsLastItemExposed(false);
          const lastRemoved = selectedListCache[selectedListCache.length - 1];
          if (!lastRemoved) {
            return;
          }
          setSelectedListCache(prev => prev.filter(i => i !== lastRemoved));
          setSelectedList(prev => [...prev, lastRemoved]);
          return;
        }
      }
      if (
        (e.key === 'Backspace' && !e.target.value) ||
        (e.target.selectionStart === 0 && e.key === 'Backspace')
      ) {
        if (isLastItemExposed) {
          const itemToRemove = selectedList[selectedList.length - 1];
          if (itemToRemove) {
            setSelectedListCache(prev => [...prev, itemToRemove]);
            setSelectedList(prev => {
              const copy = [...prev];
              copy.pop();
              return copy;
            });
            setIsLastItemExposed(false);
          }
          return;
        }
        setIsLastItemExposed(true);
        return;
      }
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !open) {
        setIsLastItemExposed(false);
        setOpen(true);
        setActiveIndex(0);
        return;
      }

      if (e.key === 'Enter' && activeIndex != null && optionList[activeIndex]) {
        setSelectedList(prev => [...prev, optionList[activeIndex]]);
        setInputValue('');
        setIsLastItemExposed(false);
        setActiveIndex(null);
        setOpen(false);
      }
    },
    [open, isLastItemExposed, activeIndex, optionList]
  );
  const onInputDoubleClick = useCallback(() => {
    setIsLastItemExposed(false);
    setOpen(true);
    setActiveIndex(0);
  }, []);
  const onInputBlur = useCallback(event => {
    if (
      !refs.floating.current?.contains(
        event.relatedTarget as HTMLElement | null
      )
    ) {
      setOpen(false);
    }
  }, []);
  const onOptionClick = useCallback(item => {
    setInputValue('');
    setIsLastItemExposed(false);
    setSelectedList(prev => [...prev, item]);
    setSelectedListCache(prev => [...prev, item]);
    setOpen(false);
    //TODO if you remove the mactotask setTimeout, then after selecting an element from the list,
    // this menu will open again, since the focus will work first and then the field clearing hook will work
    setTimeout(() => refs.reference.current?.focus(), 0);
  }, []);
  const onActiveListButtonClick = useCallback(item => {
    setSelectedList(prev => prev.filter(prevItem => prevItem !== item));
    setSelectedListCache(prev => [...prev, item]);
  }, []);
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (activeIndex != null) {
        listRef.current[activeIndex]?.scrollIntoView({
          block: 'nearest'
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, data]);
  useEffect(() => {
    setActiveIndex(0);
  }, [data]);
  useEffect(() => {
    if (open && refs.reference.current && refs.floating.current) {
      autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, update, refs.reference, refs.floating]);

  return (
    <label
      sx={{
        width: '100%',
        position: 'relative',
        backgroundColor: 'tertiary',
        borderRadius: 4,
        p: '5px',
        gap: 1,
        height: '100%',
        lineHeight: '1rem',
        letterSpacing: 'normal',
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        '&:focus-within': {
          outline: '5px auto -webkit-focus-ring-color'
        }
      }}
      onDoubleClick={propsOnLabelDoubleClick}
      onFocus={propsOnLabelFocus}
      htmlFor={id}
      {...rest}
    >
      {selectedList.length > 0 &&
        selectedList.map((item, index, arr) => {
          const onClick = () => onActiveListButtonClick(item);
          return (
            <Box
              key={item}
              sx={{
                px: 2,
                fontSize: 1,
                borderRadius: 4,
                gap: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity:
                  isLastItemExposed && index === arr.length - 1 ? '70%' : 2,
                backgroundColor: 'surfaceTint',
                color: 'onInversePrimary'
              }}
            >
              <Tooltip label={item}>
                <span>{item}</span>
              </Tooltip>
              <Button
                onClick={onClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'onTertiaryContainer'
                }}
              >
                <IoCloseCircleOutline size={14} />
              </Button>
            </Box>
          );
        })}

      <TextField
        autoComplete="off"
        id={id}
        {...getReferenceProps({
          ref: reference,
          value: inputValue,
          'aria-autocomplete': 'list',
          onChange: onInputChange,
          onFocus: onInputFocus,
          onKeyDown: onInputKeyDown,
          onBlur: onInputBlur,
          onDoubleClick: onInputDoubleClick
        })}
        {...inputProps}
        sx={{
          width: 'fit-content',
          flexGrow: 1,
          height: '22px'
        }}
        {...inputProps}
      />
      {open && optionList.length > 0 && (
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
          <List
            sx={{
              p: 1,
              borderColor: 'outline',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 4,
              color: 'onSurfaceTint',
              backgroundColor: 'surfaceTint'
            }}
          >
            {optionList.map((item, index) => {
              const onClick = () => onOptionClick(item);
              return (
                <AutocompleteOption
                  {...getItemProps({
                    key: item,
                    ref(node) {
                      listRef.current[index] = node;
                    },
                    onClick
                  })}
                  isActive={activeIndex === index}
                  {...optionProps}
                >
                  {item}
                </AutocompleteOption>
              );
            })}
          </List>
        </Box>
      )}
    </label>
  );
};
