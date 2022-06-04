import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { forwardRef, useRef, useMemo } from 'react';
import { Theme } from '../../../defaults';
import { mergeRefs } from '../../../utils';
import { Button, ButtonProps } from '../../Button';

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
