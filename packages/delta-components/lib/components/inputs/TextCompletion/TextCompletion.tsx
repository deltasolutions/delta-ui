import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import {
  Children,
  cloneElement,
  createContext,
  ReactElement,
  useContext,
} from 'react';
import { useEffect, useRef, useState, useMemo, forwardRef } from 'react';
import { Theme } from '../../../defaults';
import {
  DropRendererProps,
  useDrop,
  useImperativePortal,
} from '../../../hooks';
import { FormWidgetProps } from '../../../types';
import { getChildrenKey, mergeRefs } from '../../../utils';
import { Button, ButtonProps } from '../../Button';
import { Box, BoxProps, SystemContext } from '../../containers';
import { TextInput } from '../TextInput';

export interface TextCompletionProps
  extends Omit<BoxProps, 'children' | keyof FormWidgetProps>,
    FormWidgetProps<string> {
  placeholder?: string;
  children: (
    | ReactElement<TextCompletionOptionProps>
    | null
    | undefined
    | false
  )[];
}

export const TextCompletionContext = createContext({} as any);

/**
 * @unstable
 */
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
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { floatingPortal } = useContext(SystemContext);
    const portal = useImperativePortal(floatingPortal);
    const [innerValue, setInnerValue] = useState<string>(value);
    const childrenArray = Children.toArray(children).filter(
      Boolean
    ) as ReactElement<TextCompletionOptionProps>[];
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
        deps: [],
        tailored: true,
        portal,
        placement: 'bottom-start',
      }
    );
    const mergedRef = useMemo(
      () => mergeRefs([ref, anchorRef]),
      [ref, anchorRef]
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
            onKeyDown={ev => ev.key === 'ArrowDown' && openDrop()}
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
            // FIXME
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
