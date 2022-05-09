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
  useState
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
          '&:hover, &:active, &:focus, &:focus-visible': {
            backgroundColor: 'inversePrimary',
            color: 'onInversePrimary'
          },
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
const activeListItemWidth = 90;
const activeListItemsSpace = 3;

export const MultipleAutocomplete = ({
  data,
  color,
  size: inputSize,
  variant,
  ...rest
}: MultipleAutocompleteProps) => {
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
  const [activeList, setActiveList] = useState<string[]>([]);
  return (
    <Box sx={{ position: 'relative', width: '500px' }}>
      {activeList.length > 0 &&
        activeList.map((item, index) => (
          <Box
            key={item}
            sx={{
              position: 'absolute',
              top: '50%',
              px: 2,
              transform: 'translateY(-50%)',
              fontSize: 1,
              borderRadius: 4,
              py: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'surfaceTint',
              color: 'onInversePrimary'
            }}
            style={{
              width: activeListItemWidth,
              left: `${
                (activeListItemWidth + activeListItemsSpace) * index + 7
              }px`
            }}
          >
            <Tooltip label={item}>
              <EllipsisText>{item}</EllipsisText>
            </Tooltip>
            <Button
              onClick={() => {
                setActiveList(prev =>
                  prev.filter(prevItem => prevItem !== item)
                );
              }}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <IoCloseCircleOutline size={14} />
            </Button>
          </Box>
        ))}
      <TextField
        size={inputSize}
        color={color}
        variant={variant}
        sx={{ width: '100%' }}
        {...getReferenceProps({
          ref: reference,
          onChange,
          value: inputValue,
          ...rest,
          'aria-autocomplete': 'list',
          onKeyDown(event: any) {
            if (event.key === 'Backspace' && !event.target.value) {
              setActiveList(prev => {
                const copy = [...prev];
                copy.pop();
                return copy;
              });
            }
            if (
              event.key === 'Enter' &&
              activeIndex != null &&
              items[activeIndex]
            ) {
              setActiveList(prev => [...prev, items[activeIndex]]);
              setInputValue('');
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
        style={{
          ...(activeList.length > 0 && {
            paddingLeft:
              activeList.length * (activeListItemWidth + activeListItemsSpace) +
              7
          })
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
                  onClick() {
                    setActiveList(prev => [...prev, item]);
                    setInputValue('');
                    setOpen(false);
                    refs.reference.current?.focus();
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
    </Box>
  );
};
