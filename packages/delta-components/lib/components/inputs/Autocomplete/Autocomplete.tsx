import { jsx } from '@theme-ui/core';
import { Dispatch, useState } from 'react';
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  ReactElement,
  useCallback,
  useMemo,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import {
  DropRendererProps,
  useDrop,
  useImperativePortal,
} from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { getChildrenKey, mergeRefs } from '../../../utils';
import { Button } from '../../Button';
import { Box, BoxProps, SystemContext } from '../../containers';
import { AutocompleteOptionProps } from '../Autocomplete';
import { TextInput } from '../TextInput';

export interface AutocompleteProps
  extends Omit<BoxProps, 'children' | keyof FormWidgetProps>,
    Omit<FormWidgetProps, 'onChange'> {
  value?: unknown[];
  onChange?: (value: unknown[], query: string) => void;
  children: (
    | ReactElement<AutocompleteOptionProps>
    | null
    | undefined
    | false
  )[];
  placeholder?: string;
  query?: string;
  onQuery?: (value: string) => void;
  data: { render?: (value: string) => ReactElement; value: string }[];
}
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    { value, children, data, onChange, query = '', onQuery, ...rest },
    propsRef
  ) => {
    const [isBackspacePressed, setIsBackspacePressed] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { floatingPortal } = useContext(SystemContext);
    const portal = useImperativePortal(floatingPortal);
    const childrenArray = Children.toArray(children).filter(
      Boolean
    ) as ReactElement<AutocompleteOptionProps>[];
    const addValue = useCallback(
      v => {
        setIsBackspacePressed(false);
        const query = '';
        onQuery?.(query);
        onChange?.([...(value ? value : []), v], query);
      },
      [onChange, query, value]
    );
    const removeValue = useCallback(
      vToRemove => {
        setIsBackspacePressed(false);
        const newValue = value?.filter(v => v !== vToRemove);
        onChange?.(newValue ?? [], query);
      },
      [value, query, onChange]
    );
    const dropRef = useRef<HTMLDivElement>(null);
    const closeDropRef = useRef<undefined | (() => void)>();
    const [openDrop, anchorRef] = useDrop<HTMLDivElement>(
      props => (
        <AutocompleteDrop ref={dropRef} addValue={addValue} {...props} />
      ),
      {
        deps: [],
        tailored: true,
        portal,
        placement: 'bottom-start',
      }
    );
    const handleOpen = useCallback(() => {
      if (children.length > 0) {
        closeDropRef.current = openDrop();
      }
    }, [openDrop, getChildrenKey(children, { pivots: ['value'] })]);

    const handleClose = useCallback(() => {
      closeDropRef.current?.();
    }, []);
    const handleInputChange = useCallback(
      value => {
        setIsBackspacePressed(false);
        onQuery?.(value);
        handleOpen();
      },
      [onQuery, handleOpen]
    );
    const mergedRef = useMemo(
      () => mergeRefs([propsRef, anchorRef]),
      [propsRef, anchorRef]
    );
    const contextValue = useMemo(
      () => ({ children: childrenArray, inputRef }),
      [inputRef, getChildrenKey(children, { pivots: ['value'] })]
    );

    useEffect(() => {
      const handleNativeBlur = e => {
        if (
          !e.relatedTarget ||
          !dropRef.current ||
          !dropRef.current.contains(e.relatedTarget)
        ) {
          handleClose();
        }
      };
      const handleKeydown = e => {
        if (e.key === 'ArrowDown') {
          handleOpen();
          return;
        }
        if (e.key === 'Backspace') {
          if (e.target.selectionStart === 0) {
            if (isBackspacePressed) {
              removeValue(value?.[value?.length - 1]);
              setIsBackspacePressed(false);
              return;
            }
            setIsBackspacePressed(true);
            return;
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
    }, [handleOpen, isBackspacePressed, value]);

    return (
      <AutocompleteContext.Provider value={contextValue}>
        {portal}
        <label
          htmlFor="1"
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
            '&:focus-within': {
              outlineColor: 'primary',
              outlineStyle: 'solid',
              outlineWidth: '2px',
            },
          }}
        >
          {value?.map((v, index) => {
            const item = data.find(datum => datum.value === v);
            return (
              <Box
                key={item?.value}
                sx={{
                  px: 1,
                  borderRadius: 4,
                  gap: 2,
                  py: 1,
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'space-between',
                  backgroundColor: 'surface',
                }}
                style={{
                  opacity:
                    isBackspacePressed && index === value.length - 1 ? 0.5 : 1,
                }}
              >
                <Box sx={{ color: 'onSurface' }}>
                  {item?.render?.(item.value) ?? item?.value}
                </Box>
                <Button
                  sx={{
                    display: 'flex',
                    marginLeft: 'auto',
                    alignItems: 'center',
                    color: 'onSurface',
                  }}
                  onClick={() => removeValue(item?.value)}
                  tabIndex={-1}
                >
                  <IoCloseCircleOutline size={14} />
                </Button>
              </Box>
            );
          })}
          <Box
            ref={mergedRef}
            sx={{
              width: 'fit-content',
              flexGrow: 1,
            }}
          >
            <TextInput
              autoComplete="off"
              id="1"
              variant="pure"
              onClick={handleOpen}
              value={query}
              onFocus={handleOpen}
              onChange={handleInputChange}
              sx={{
                '&:focus': {
                  outline: 'none',
                },
              }}
              ref={inputRef}
              {...rest}
            />
          </Box>
        </label>
      </AutocompleteContext.Provider>
    );
  }
);

const AutocompleteContext = createContext({} as { children: ReactElement[] });

export interface AutocompleteDropProps extends DropRendererProps {
  addValue: (v: unknown) => void;
}
export const AutocompleteDropContext = createContext(
  {} as {
    activeIndex: number | null;
    setActiveIndex: Dispatch<React.SetStateAction<number | null>>;
  }
);
const AutocompleteDrop = forwardRef<HTMLDivElement, AutocompleteDropProps>(
  ({ addValue, handleClose }, ref) => {
    const { children } = useContext(AutocompleteContext);
    const [activeIndex, setActiveIndex] = useState(0);
    const contextValue = useMemo(
      () => ({ activeIndex, setActiveIndex }),
      [activeIndex]
    );
    const hueref = useRef(children);
    useEffect(() => {
      hueref.current = children;
    }, [children]);
    const keydownEvent = e => {
      if (e.key === 'Enter') {
        setActiveIndex(prev => {
          addValue(hueref.current?.[prev]?.props?.value);
          handleClose();
          return 0;
        });
        return;
      }
      if (e.key === 'ArrowDown') {
        setActiveIndex(prev => {
          if (children.length - 1 === prev) {
            return prev;
          }
          return prev + 1;
        });
        return;
      }
      if (e.key === 'ArrowUp') {
        setActiveIndex(prev => {
          if (prev === 0) {
            return prev;
          }
          return prev - 1;
        });
        return;
      }
    };

    useEffect(() => {
      addEventListener('keydown', keydownEvent);
      return () => {
        removeEventListener('keydown', keydownEvent);
      };
    }, []);
    if (children.length === 0) {
      return null;
    }
    return (
      <AutocompleteDropContext.Provider value={contextValue}>
        <Box
          ref={ref}
          sx={{
            padding: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 3,
          }}
        >
          {children?.map((v, index) =>
            cloneElement(v, {
              isActive: activeIndex === index,
              index: index,
              onClick: () => {
                addValue(v?.props?.value);
                handleClose();
              },
            })
          )}
        </Box>
      </AutocompleteDropContext.Provider>
    );
  }
);
