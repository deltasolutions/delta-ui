import { keyframes } from '@emotion/react';
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
import React, {
  forwardRef,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  FocusEvent,
  ChangeEvent
} from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Box } from '../Box';
import { Button } from '../Button';
import { EllipsisText } from '../EllipsisText';
import { List, ListItem, ListItemProps } from '../List';
import { Tooltip } from '../Tooltip';
import { TextField, TextFieldProps } from './TextField';

interface ItemProps extends ListItemProps {
  isActive: boolean;
}

const Item = forwardRef<HTMLLIElement, ItemProps>(
  ({ children, isActive, ...rest }, ref) => {
    const id = useId();
    return (
      <ListItem
        ref={ref}
        role="option"
        id={id}
        aria-selected={isActive}
        {...rest}
        sx={{
          cursor: 'default',
          width: '100%',
          paddingX: 4,
          paddingY: 1,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 4,
          overflow: 'hidden',
          ...(isActive && {
            backgroundColor: 'inversePrimary',
            color: 'onInversePrimary'
          }),
          fontWeight: 400
        }}
      >
        {children}
      </ListItem>
    );
  }
);
export interface MultipleAutocompleteProps extends TextFieldProps {
  data: string[];
}
export const MultipleAutocomplete = ({
  data,
  color,
  size: inputSize,
  onFocus: propsOnFocus,
  variant,
  ...rest
}: MultipleAutocompleteProps) => {
  const [backspacePressed, setBackspacePressed] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (activeIndex != null) {
        listRef.current[activeIndex]?.scrollIntoView({
          block: 'nearest'
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);
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
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
    setBackspacePressed(false);
    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }
  function onFocus(event: FocusEvent<HTMLInputElement>) {
    if (event.target.value) {
      setOpen(true);
      setActiveIndex(0);
    }
    propsOnFocus?.(event);
  }
  useEffect(() => {
    if (open && refs.reference.current && refs.floating.current) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
    return () => {};
  }, [open, update, refs.reference, refs.floating]);
  const [activeList, setActiveList] = useState<string[]>([]);

  const items = data.filter(
    item =>
      item.toLowerCase().includes(inputValue.toLowerCase()) &&
      !activeList.map(i => i.toLowerCase()).includes(item.toLowerCase())
  );
  if (open && items.length === 0 && activeIndex !== null) {
    setActiveIndex(null);
  }

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
      htmlFor={id}
    >
      {activeList.length > 0 &&
        activeList.map((item, index, arr) => (
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
              opacity: backspacePressed && index === arr.length - 1 ? '70%' : 2,
              backgroundColor: 'surfaceTint',
              color: 'onInversePrimary'
            }}
          >
            <Tooltip label={item}>
              <span>{item}</span>
            </Tooltip>
            <Button
              onClick={e => {
                setActiveList(prev =>
                  prev.filter(prevItem => prevItem !== item)
                );
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'onTertiaryContainer'
              }}
            >
              <IoCloseCircleOutline size={14} />
            </Button>
          </Box>
        ))}
      <TextField
        id={id}
        autoComplete="off"
        size={inputSize}
        color={color}
        {...getReferenceProps({
          ref: reference,
          onChange,
          onFocus,
          value: inputValue,
          ...rest,
          'aria-autocomplete': 'list',
          onKeyDown(event: any) {
            if (
              (event.key === 'Backspace' && !event.target.value) ||
              (event.target.selectionStart === 0 && event.key === 'Backspace')
            ) {
              if (backspacePressed) {
                setActiveList(prev => {
                  const copy = [...prev];
                  copy.pop();
                  return copy;
                });
                setBackspacePressed(false);
              } else {
                setBackspacePressed(true);
              }
            }
            if (
              event.key === 'Enter' &&
              activeIndex != null &&
              items[activeIndex]
            ) {
              setActiveList(prev => [...prev, items[activeIndex]]);
              setInputValue('');
              setBackspacePressed(false);
              setActiveIndex(null);
              setOpen(false);
            }
          },
          onBlur(event) {
            if (
              !refs.floating.current?.contains(
                event.relatedTarget as HTMLElement | null
              )
            ) {
              setOpen(false);
            }
          }
        })}
        sx={{
          width: 'fit-content',
          flexGrow: 1,
          height: '22px',
          px: activeList.length > 0 ? 0 : 2
        }}
      />
      {open && items.length > 0 && (
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
            {items.map((item, index) => (
              <Item
                {...getItemProps({
                  key: item,
                  ref(node) {
                    listRef.current[index] = node;
                  },
                  onClick(e) {
                    setInputValue('');
                    setBackspacePressed(false);
                    setActiveList(prev => [...prev, item]);
                    setOpen(false);
                    //TODO if you remove the mactotask setTimeout, then after selecting an element from the list,
                    // this menu will open again, since the focus will work first and then the field clearing hook will work
                    setTimeout(() => refs.reference.current?.focus(), 0);
                  }
                })}
                isActive={activeIndex === index}
              >
                {item}
              </Item>
            ))}
          </List>
        </Box>
      )}
    </label>
  );
};
