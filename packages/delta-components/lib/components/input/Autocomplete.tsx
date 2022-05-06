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
  Fragment
} from 'react';
import { Box } from '../Box';
import { List, ListItem, ListItemProps } from '../List';
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
          width: '100%',
          paddingX: '8px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 0,
          '&:hover, &:active, &:focus, &:focus-visible': {
            backgroundColor: 'rgba(255,255,255,.1)'
          },
          ...(isActive && { backgroundColor: 'rgba(255,255,255,.1)' }),
          color: 'text_base',
          fontWeight: 400
        }}
      >
        {children}
      </ListItem>
    );
  }
);
export interface AutocompleteProps extends TextFieldProps {
  data: string[];
}
export const Autocomplete = ({
  data,
  size: inputSize,
  color,
  variant,
  ...rest
}: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<(HTMLElement | null)[]>([]);
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
        loop: true
      })
    ]
  );
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }
  useEffect(() => {
    if (open && refs.reference.current && refs.floating.current) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
    return () => {};
  }, [open, update, refs.reference, refs.floating]);
  const items = data.filter(item =>
    item.toLowerCase().startsWith(inputValue.toLowerCase())
  );
  if (open && items.length === 0 && activeIndex !== null) {
    setActiveIndex(null);
  }
  return (
    <Fragment>
      <TextField
        size={inputSize}
        color={color}
        variant={variant}
        {...getReferenceProps({
          ref: reference,
          onChange,
          value: inputValue,
          ...rest,
          'aria-autocomplete': 'list',
          onKeyDown(event) {
            if (
              event.key === 'Enter' &&
              activeIndex != null &&
              items[activeIndex]
            ) {
              setInputValue(items[activeIndex]);
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
              backgroundColor: 'decorative_subdued',
              borderRadius: 5,
              borderWidth: '0.1px',
              borderStyle: 'solid',
              borderColor: 'border_base',

              boxShadow:
                '0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)'
            }}
          >
            {items.map((item, index) => (
              <Item
                {...getItemProps({
                  key: item,
                  ref(node) {
                    listRef.current[index] = node;
                  },
                  onClick() {
                    setInputValue(item);
                    setOpen(false);
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
    </Fragment>
  );
};
