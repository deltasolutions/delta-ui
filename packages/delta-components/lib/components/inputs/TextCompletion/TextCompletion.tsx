import { useTheme } from '@emotion/react';
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
  FloatingFocusManager,
} from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import FocusTrap from 'focus-trap-react';
import {
  Children,
  cloneElement,
  createContext,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  Ref,
  useContext,
} from 'react';
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
  ReactNode,
} from 'react';
import { Theme } from '../../../defaults';
import {
  DropRendererProps,
  useDrop,
  useImperativePortal,
  useUpdateEffect,
} from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { getChildrenKey, mergeRefs } from '../../../utils';
import { Button, ButtonProps } from '../../Button';
import { Box, BoxProps, SystemContext } from '../../containers';
import { SelectDrop, SelectOption, SelectOptionProps } from '../Select';
import { TextInput, TextInputProps } from '../TextInput';

// export interface TextCompletionProps extends Omit<TextInputProps, 'onChange'> {
//   suggestions: {
//     value: string;
//     render?: (value: string, isActive) => ReactElement;
//   }[];
//   onChange?: (value: string) => void;
//   emptySuggestionsMessage?: ReactNode;
// }

// export const TextCompletion = forwardRef<HTMLInputElement, TextCompletionProps>(
//   (
//     {
//       suggestions,
//       emptySuggestionsMessage,
//       onChange: onOuterChange,
//       onFocus: onOuterFocus,
//       onBlur: onOuterBlur,
//       onKeyDown: onOuterKeyDown,
//       ...rest
//     }: TextCompletionProps,
//     ref
//   ) => {
//     const [value, setValue] = useState<string>('');
//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const [activeIndex, setActiveIndex] = useState<number | null>(null);
//     const { x, y, reference, floating, strategy, context, refs, update } =
//       useFloating<HTMLInputElement>({
//         open: isOpen,
//         onOpenChange: setIsOpen,
//         middleware: [
//           offset(3),
//           flip(),
//           size({
//             apply({ reference, height }) {
//               Object.assign(refs.floating.current?.style ?? {}, {
//                 width: `${reference.width}px`,
//                 maxHeight: `${height}px`,
//               });
//             },
//             padding: 10,
//           }),
//         ],
//       });
//     const listRef = useRef<(HTMLElement | null)[]>([]);
//     const stableRef = useMemo(
//       () => mergeRefs([ref, reference]),
//       [ref, reference]
//     );
//     const { getReferenceProps, getFloatingProps, getItemProps } =
//       useInteractions([
//         useRole(context, { role: 'listbox' }),
//         useDismiss(context),
//         useListNavigation(context, {
//           listRef,
//           onNavigate: setActiveIndex,
//           //@ts-ignore
//           //lib bug
//           openOnArrowKeyDown: true,
//           allowEscape: false,
//           focusItemOnOpen: false,
//           activeIndex,
//           virtual: true,
//           loop: false,
//         }),
//       ]);

//     const onChange = useCallback(
//       (e: ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setValue(value);
//         if (value) {
//           setIsOpen(true);
//           setActiveIndex(0);
//         } else {
//           setIsOpen(false);
//         }
//         onOuterChange?.(value);
//       },
//       [onOuterChange]
//     );
//     const onFocus = useCallback(
//       (e: FocusEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         if (value) {
//           setIsOpen(true);
//           setActiveIndex(0);
//         }
//         onOuterFocus?.(e);
//       },
//       [onOuterFocus]
//     );
//     const onKeyDown = useCallback(
//       (e: KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
//           console.log('dd');
//         }
//         if (
//           e.key === 'Enter' &&
//           activeIndex !== null &&
//           suggestions[activeIndex].value
//         ) {
//           const value = suggestions[activeIndex].value;
//           setValue(value);
//           setActiveIndex(null);
//           setIsOpen(false);
//           onOuterChange?.(value);
//         }
//         onOuterKeyDown?.(e);
//       },
//       [suggestions, activeIndex, onOuterKeyDown, onOuterChange]
//     );
//     const onBlur = useCallback(
//       (e: FocusEvent<HTMLInputElement>) => {
//         if (
//           !refs.floating.current?.contains(
//             e.relatedTarget as HTMLElement | null
//           )
//         ) {
//           setIsOpen(false);
//         }
//         onOuterBlur?.(e);
//       },
//       [refs.floating, onOuterBlur]
//     );
//     const onDoubleClick = useCallback(e => {
//       setIsOpen(true);
//     }, []);
//     const onOptionClick = useCallback(
//       (suggestion: string, index) => {
//         setValue(suggestion);
//         setActiveIndex(index);
//         setIsOpen(false);
//         onOuterChange?.(suggestion);
//       },
//       [onOuterChange]
//     );
//     useEffect(() => {
//       if (isOpen && refs.reference.current && refs.floating.current) {
//         autoUpdate(refs.reference.current, refs.floating.current, update);
//       }
//     }, [isOpen, update, refs.reference, refs.floating]);
//     useLayoutEffect(() => {
//       const frame = requestAnimationFrame(() => {
//         if (activeIndex != null) {
//           listRef.current[activeIndex]?.scrollIntoView({
//             block: 'nearest',
//           });
//         }
//       });
//       return () => cancelAnimationFrame(frame);
//     }, [activeIndex]);

//     return (
//       <Fragment>
//         <TextInput
//           {...getReferenceProps({
//             ref: stableRef,
//             'aria-autocomplete': 'list',
//             onKeyDown,
//           })}
//           onChange={onChange}
//           onDoubleClick={onDoubleClick}
//           onFocus={onFocus}
//           onBlur={onBlur}
//           value={value}
//           {...rest}
//         />
//         {isOpen && (suggestions.length > 0 || emptySuggestionsMessage) && (
//           <FloatingFocusManager context={context} preventTabbing>
//             <Box
//               {...getFloatingProps({
//                 ref: floating,
//                 style: {
//                   position: strategy,
//                   left: x ?? '',
//                   top: y ?? '',
//                   overflowY: 'auto',
//                 },
//               })}
//             >
//               <Box
//                 sx={{
//                   p: 1,
//                   borderColor: 'outline',
//                   borderStyle: 'solid',
//                   borderWidth: 1,
//                   borderRadius: 4,
//                   color: 'onSurfaceTint',
//                   backgroundColor: 'surfaceTint',
//                 }}
//               >
//                 {suggestions.length > 0 ? (
//                   suggestions.map((suggestion, index) => {
//                     const onClick = () =>
//                       onOptionClick(suggestion.value, index);
//                     return (
//                       <Option
//                         {...getItemProps({
//                           key: suggestion.value,
//                           ref(node) {
//                             listRef.current[index] = node;
//                           },
//                           onClick,
//                         })}
//                         isActive={activeIndex === index}
//                         {...suggestion}
//                       />
//                     );
//                   })
//                 ) : (
//                   <Box>{emptySuggestionsMessage}</Box>
//                 )}
//               </Box>
//             </Box>
//           </FloatingFocusManager>
//         )}
//       </Fragment>
//     );
//   }
// );

// interface OptionProps extends HTMLAttributes<HTMLLIElement> {
//   render?: TextCompletionProps['suggestions'][0]['render'];
//   isActive: boolean;
//   value: TextCompletionProps['suggestions'][0]['value'];
// }

// const Option = forwardRef<HTMLLIElement>(
//   ({ render, value, isActive, ...rest }: OptionProps, ref) => {
//     const { colors } = useTheme() as Theme;
//     return (
//       <Box ref={ref} role="option" aria-selected={isActive} {...rest}>
//         {render ? (
//           render?.(value, isActive)
//         ) : (
//           <Box
//             style={{
//               ...(isActive && {
//                 backgroundColor: 'red',
//                 color: 'blue',
//               }),
//             }}
//             sx={{
//               cursor: 'default',
//               width: '100%',
//               paddingX: 4,
//               paddingY: 1,
//               display: 'flex',
//               alignItems: 'center',
//               borderRadius: 4,
//               overflow: 'hidden',
//               fontWeight: 400,
//             }}
//           >
//             {value}
//           </Box>
//         )}
//       </Box>
//     );
//   }
// );

export interface TextCompletionProps
  extends Omit<BoxProps, 'children' | keyof FormWidgetProps>,
    FormWidgetProps {
  value?: string;
  onChange?: (value: string) => void;
  children: (
    | ReactElement<TextCompletionOptionProps>
    | null
    | undefined
    | false
  )[];
  placeholder?: string;
}
export const TextCompletionContext = createContext({} as any);
export const TextCompletion = forwardRef<HTMLInputElement, TextCompletionProps>(
  (
    {
      children,
      value = '',
      onChange,
      onFocus,
      onBlur,
      placeholder,
      disabled,
      ...rest
    },
    propsRef
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [innerValue, setInnerValue] = useState<string>(value);
    const childrenArray = Children.toArray(children).filter(
      Boolean
    ) as ReactElement<TextCompletionOptionProps>[];

    const { floatingPortal } = useContext(SystemContext);
    const portal = useImperativePortal(floatingPortal);
    const handleChange = value => {
      setInnerValue(value);
      onChange?.(value);
      childrenArray.length > 0 && openDrop();
    };
    const [openDrop, anchorRef] = useDrop<HTMLDivElement>(
      props => (
        <TextCompletionDrop
          children={childrenArray}
          handleChange={handleChange}
          {...props}
        />
      ),
      {
        deps: [handleChange],
        tailored: true,
        portal,
        placement: 'bottom-start',
      }
    );
    const mergedRef = useMemo(
      () => mergeRefs([propsRef, anchorRef]),
      [propsRef, anchorRef]
    );
    const contextValue = useMemo(
      () => ({
        inputRef,
        children: childrenArray,
      }),
      [getChildrenKey(children, { pivots: ['value'] }), anchorRef]
    );
    return (
      <TextCompletionContext.Provider value={contextValue}>
        <Box
          ref={mergedRef}
          sx={{
            position: 'relative',
            width: '100%',
            minWidth: '100px',
          }}
          {...rest}
        >
          {portal}
          <TextInput
            ref={inputRef}
            value={innerValue}
            disabled={disabled}
            placeholder={placeholder}
            onChange={handleChange}
            onClick={openDrop}
            onKeyDown={ev => ev.key === 'Enter' && openDrop()}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </Box>
      </TextCompletionContext.Provider>
    );
  }
);
export interface TextCompletionDropProps extends DropRendererProps {
  children: ReactElement<TextCompletionOptionProps>[];
  handleChange: (v: unknown) => void;
}

export const TextCompletionDrop = ({
  handleChange,
  handleClose,
}: TextCompletionDropProps) => {
  const { children, inputRef } = useContext(TextCompletionContext);
  useEffect(() => {
    return () => {
      inputRef?.current?.focus();
    };
  }, []);
  return (
    <Box
      sx={{
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 3,
      }}
    >
      {children?.map(v =>
        cloneElement(v, {
          onClick: () => {
            handleChange(v.props.value);
            //TODO
            setTimeout(handleClose, 10);
          },
        })
      )}
    </Box>
  );
};
export interface TextCompletionOptionProps
  extends Omit<ButtonProps, 'value' | 'children'> {
  value: unknown;
  children: string;
}
export const TextCompletionOption = forwardRef<
  HTMLButtonElement,
  TextCompletionOptionProps
>(({ value, ...rest }, propsRef) => {
  const ref = useRef<HTMLButtonElement>(null);
  const mergedRef = useMemo(() => mergeRefs([ref, propsRef]), [ref, propsRef]);
  const {
    colors: { primary, onPrimary },
  } = useTheme() as Theme;
  return (
    <Button
      ref={mergedRef}
      onMouseEnter={() => {
        if (ref.current) {
          ref.current.style.backgroundColor = primary;
          ref.current.style.color = onPrimary;
        }
      }}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.style.backgroundColor = 'inherit';
          ref.current.style.color = 'inherit';
        }
      }}
      sx={{
        paddingX: 1,
        paddingY: 1,
        textAlign: 'left',
        fontSize: 2,
        outline: 'none',
        borderRadius: 2,
        transition: 'background-color 30ms ease-out, color 30ms ease-out',
      }}
      {...rest}
    />
  );
});
