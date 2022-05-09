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
  forwardRef,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  Fragment,
  ChangeEvent,
  FocusEvent
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
export interface AutocompleteProps extends TextFieldProps {
  data: string[];
}
export const Autocomplete = ({
  data,
  color,
  multiple,
  size: inputSize,
  onChange: propsOnChange,
  onFocus: propsOnFocus,
  variant = 'contained',
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
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
    propsOnChange?.(event);
  }
  function onFocus(event: FocusEvent<HTMLInputElement>) {
    propsOnFocus?.(event);
    if (event.target.value) {
      setOpen(true);
      setActiveIndex(0);
    }
  }
  useEffect(() => {
    if (open && refs.reference.current && refs.floating.current) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
    return () => {};
  }, [open, update, refs.reference, refs.floating]);
  const items = data.filter(item =>
    item.toLowerCase().includes(inputValue.toLowerCase())
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
          onFocus,
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
