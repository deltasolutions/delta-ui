import {
  useFloating,
  offset,
  flip,
  useListNavigation,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  FloatingFocusManager,
  autoUpdate,
  size,
  FloatingOverlay,
  ContextData,
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import { HTMLAttributes, ReactElement } from 'react';
import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import { FormWidgetProps } from '../../types';
import { Button } from '../Button';
import { Box, BoxProps, Drop } from '../containers';
import { EmptyOptions } from './EmptyOptions';

export interface SelectProps
  extends Omit<BoxProps, 'children' | keyof FormWidgetProps>,
    FormWidgetProps {
  children: (ReactElement<SelectOptionProps> | null | undefined | false)[];
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}

export interface SelectOptionProps extends BoxProps {
  value: string;
  index?: number;
}

export const SelectOption = ({
  children,
  index = 0,
  value,
}: SelectOptionProps) => {
  const {
    selectedIndex,
    setSelectedIndex,
    listRef,
    setOpen,
    onChange,
    activeIndex,
    setActiveIndex,
    getItemProps,
    dataRef,
  } = useContext(SelectContext);

  function handleSelect() {
    setSelectedIndex(index);
    onChange?.(value);
    setOpen(false);
    setActiveIndex(null);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSelect();
    }

    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  function handleKeyUp(event: React.KeyboardEvent) {
    if (event.key === ' ' && !dataRef.current.typing) {
      handleSelect();
    }
  }

  return (
    <li
      ref={node => (listRef.current[index] = node)}
      aria-selected={activeIndex === index}
      data-selected={selectedIndex === index}
      role="option"
      sx={{
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '2px',
        gap: 2,
        fontSize: 2,
        fontFamily: 'inherit',
        cursor: 'default',
        p: 1,
        '&:focus, &:active, &:focus-visible': {
          backgroundColor: 'accentContext',
          color: 'onPrimary',
          outline: '1px solid',
          outlineColor: 'primary',
        },
      }}
      tabIndex={activeIndex === index ? 0 : 1}
      {...getItemProps({
        onClick: handleSelect,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
      })}
    >
      <Box>{children}</Box> {selectedIndex === index && <CheckIcon />}
    </li>
  );
};

export const Select: React.FC<SelectProps> = ({
  children,
  value,
  disabled,
  onChange,
  placeholder,
  ...rest
}) => {
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const listContentRef = useRef(
    Children.map(
      children,
      child => isValidElement(child) && child.props.value
    ) ?? []
  );
  const childrenArray = Children.map(
    children,
    child => isValidElement(child) && child.props.children
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(
    Math.max(0, listContentRef.current.indexOf(value))
  );
  const [pointer, setPointer] = useState(false);

  if (!open && pointer) {
    setPointer(false);
  }

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({ padding: 8 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useClick(context),
      useRole(context, { role: 'listbox' }),
      useDismiss(context),
      useListNavigation(context, {
        listRef: listItemsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
      }),
      useTypeahead(context, {
        listRef: listContentRef,
        onMatch: open ? setActiveIndex : setSelectedIndex,
        activeIndex,
        selectedIndex,
      }),
    ]
  );
  useLayoutEffect(() => {
    if (open && activeIndex != null && !pointer) {
      requestAnimationFrame(() => {
        listItemsRef.current[activeIndex]?.scrollIntoView({
          block: 'nearest',
        });
      });
    }
  }, [open, activeIndex, pointer]);

  let optionIndex = 0;
  const options =
    Children.map(children, child => {
      return (
        isValidElement(child) &&
        cloneElement(child as ReactElement<any>, { index: optionIndex++ })
      );
    }) ?? [];

  return (
    <SelectContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        activeIndex,
        setActiveIndex,
        listRef: listItemsRef,
        setOpen,
        onChange,
        getItemProps,
        dataRef: context.dataRef,
      }}
    >
      <Button
        sx={{
          opacity: disabled ? 0.5 : 1,
          fontSize: 2,
          borderRadius: 4,
          display: 'flex',
          gap: 2,
          width: '250px',
          alignItems: 'center',
          justifyContent: 'space-between',
          letterSpacing: 'normal',
          paddingX: '0.55em',
          paddingY: '0.60em',
          minWidth: '100px',
          backgroundColor: 'accentContext',
          color: 'onContext',
          '&:focus': {
            outline: '2px solid',
            outlineColor: 'primary',
          },
          '&::placeholder': {
            color: 'onContext',
            opacity: 0.5,
          },
        }}
        {...getReferenceProps({
          ref: reference,
        })}
        {...rest}
      >
        {childrenArray?.[selectedIndex] ?? (
          <span sx={{ opacity: 0.5 }}>{placeholder}</span>
        )}
        <Arrow dir="down" />
      </Button>
      {open && (
        <FloatingOverlay lockScroll>
          <FloatingFocusManager context={context} initialFocus={selectedIndex}>
            <Drop
              sx={{
                p: 1,
                outline: 'none',
                maxHeight: '140px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 4,
                listStyleType: 'none',
                backgroundColor: '',
                margin: '0',
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                overflow: 'auto',
              }}
              {...getFloatingProps({
                ref: floating,
                onPointerMove() {
                  setPointer(true);
                },
                onKeyDown(event) {
                  setPointer(false);

                  if (event.key === 'Tab') {
                    setOpen(false);
                  }
                },
              })}
            >
              {options.length > 0 ? (
                <ul sx={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {options}
                </ul>
              ) : (
                <EmptyOptions />
              )}
            </Drop>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </SelectContext.Provider>
  );
};

interface SelectContextValue {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.MutableRefObject<(HTMLLIElement | null)[]>;
  setOpen: (open: boolean) => void;
  onChange?: (value: string) => void;
  getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => any;
  dataRef: ContextData;
}

const SelectContext = createContext({} as SelectContextValue);

function Arrow({ dir }: { dir: 'down' | 'up' }) {
  return (
    <div
      style={{
        display: 'flex',
        transform: dir === 'up' ? 'rotate(180deg)' : undefined,
      }}
    >
      <svg height={12} viewBox="0 0 512 512" width={12}>
        <g
          fill="currentColor"
          stroke="none"
          transform={`translate(0,512) scale(0.1,-0.1)`}
        >
          <path
            d="M783 3543 c-29 -6 -63 -49 -63 -79 0 -15 20 -46 52 -81 29 -32 434
-451 901 -930 834 -858 849 -873 887 -873 38 0 53 15 887 873 467 479 872 898
901 930 59 65 64 91 28 134 l-24 28 -1774 1 c-975 1 -1783 -1 -1795 -3z"
          />
        </g>
      </svg>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg height={12} viewBox="0 0 512 512" width={12}>
      <g
        fill="currentColor"
        stroke="none"
        transform="translate(0,512) scale(0.1,-0.1)"
      >
        <path
          d="M4468 4401 c-36 -10 -88 -31 -115 -46 -32 -18 -446 -425 -1245 -1224
l-1198 -1196 -532 531 c-293 292 -555 546 -581 563 -163 110 -396 111 -563 3
-174 -113 -264 -327 -221 -529 34 -158 -4 -114 824 -944 509 -510 772 -766
808 -788 108 -65 264 -87 389 -55 146 38 67 -37 1582 1478 896 896 1411 1418
1428 1447 52 92 69 156 69 269 0 155 -42 259 -146 363 -127 127 -320 176 -499
128z"
        />
      </g>
    </svg>
  );
}
