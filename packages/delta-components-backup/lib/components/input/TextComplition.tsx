import {
  autoUpdate,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  flip,
  offset,
  FloatingFocusManager
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import { HTMLAttributes, ReactElement } from 'react';
import {
  useLayoutEffect,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  FocusEvent,
  ChangeEvent,
  forwardRef,
  Fragment,
  KeyboardEvent,
  ReactNode
} from 'react';
import { useTheme } from '../../hooks';
import { mergeRefs } from '../../utils';
import { Box } from '../Box';
import { ListItem, List } from '../List';
import { TextField, TextFieldProps } from './TextField';

export interface TextComplitionProps extends Omit<TextFieldProps, 'onChange'> {
  suggestions: {
    value: string;
    render?: (value: string, isActive) => ReactElement;
  }[];
  onChange?: (value: string) => void;
  emptySuggestionsMessage?: ReactNode;
}

export const TextComplition = forwardRef<HTMLInputElement, TextComplitionProps>(
  (
    {
      suggestions,
      emptySuggestionsMessage,
      onChange: onOuterChange,
      onFocus: onOuterFocus,
      onBlur: onOuterBlur,
      onKeyDown: onOuterKeyDown,
      ...rest
    }: TextComplitionProps,
    ref
  ) => {
    const [value, setValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
    const listRef = useRef<(HTMLElement | null)[]>([]);
    const stableRef = useMemo(
      () => mergeRefs([ref, reference]),
      [ref, reference]
    );
    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([
        useRole(context, { role: 'listbox' }),
        useDismiss(context),
        useListNavigation(context, {
          listRef,
          onNavigate: setActiveIndex,
          //@ts-ignore
          //lib bug
          openOnArrowKeyDown: true,
          allowEscape: false,
          focusItemOnOpen: false,
          activeIndex,
          virtual: true,
          loop: false
        })
      ]);

    const onChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue(value);
        if (value) {
          setIsOpen(true);
          setActiveIndex(0);
        } else {
          setIsOpen(false);
        }
        onOuterChange?.(value);
      },
      [onOuterChange]
    );
    const onFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value) {
          setIsOpen(true);
          setActiveIndex(0);
        }
        onOuterFocus?.(e);
      },
      [onOuterFocus]
    );
    const onKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          console.log('dd');
        }
        if (
          e.key === 'Enter' &&
          activeIndex !== null &&
          suggestions[activeIndex].value
        ) {
          const value = suggestions[activeIndex].value;
          setValue(value);
          setActiveIndex(null);
          setIsOpen(false);
          onOuterChange?.(value);
        }
        onOuterKeyDown?.(e);
      },
      [suggestions, activeIndex, onOuterKeyDown, onOuterChange]
    );
    const onBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (
          !refs.floating.current?.contains(
            e.relatedTarget as HTMLElement | null
          )
        ) {
          setIsOpen(false);
        }
        onOuterBlur?.(e);
      },
      [refs.floating, onOuterBlur]
    );
    const onDoubleClick = useCallback(e => {
      setIsOpen(true);
    }, []);
    const onOptionClick = useCallback(
      (suggestion: string, index) => {
        setValue(suggestion);
        setActiveIndex(index);
        setIsOpen(false);
        onOuterChange?.(suggestion);
      },
      [onOuterChange]
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
            block: 'nearest'
          });
        }
      });
      return () => cancelAnimationFrame(frame);
    }, [activeIndex]);

    return (
      <Fragment>
        <TextField
          {...getReferenceProps({
            ref: stableRef,
            'aria-autocomplete': 'list',
            onKeyDown
          })}
          onChange={onChange}
          onDoubleClick={onDoubleClick}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          {...rest}
        />
        {isOpen && (suggestions.length > 0 || emptySuggestionsMessage) && (
          <FloatingFocusManager context={context} preventTabbing>
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
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => {
                    const onClick = () =>
                      onOptionClick(suggestion.value, index);
                    return (
                      <Option
                        {...getItemProps({
                          key: suggestion.value,
                          ref(node) {
                            listRef.current[index] = node;
                          },
                          onClick
                        })}
                        isActive={activeIndex === index}
                        {...suggestion}
                      />
                    );
                  })
                ) : (
                  <Box>{emptySuggestionsMessage}</Box>
                )}
              </List>
            </Box>
          </FloatingFocusManager>
        )}
      </Fragment>
    );
  }
);

interface OptionProps extends HTMLAttributes<HTMLLIElement> {
  render?: TextComplitionProps['suggestions'][0]['render'];
  isActive: boolean;
  value: TextComplitionProps['suggestions'][0]['value'];
}

const Option = forwardRef<HTMLLIElement>(
  ({ render, value, isActive, ...rest }: OptionProps, ref) => {
    const { colors } = useTheme();
    return (
      <ListItem ref={ref} role="option" aria-selected={isActive} {...rest}>
        {render ? (
          render?.(value, isActive)
        ) : (
          <Box
            style={{
              ...(isActive && {
                backgroundColor: colors.inversePrimary,
                color: colors.onInversePrimary
              })
            }}
            sx={{
              cursor: 'default',
              width: '100%',
              paddingX: 4,
              paddingY: 1,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 4,
              overflow: 'hidden',
              fontWeight: 400
            }}
          >
            {value}
          </Box>
        )}
      </ListItem>
    );
  }
);
