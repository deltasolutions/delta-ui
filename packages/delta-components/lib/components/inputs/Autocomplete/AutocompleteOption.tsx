import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { forwardRef, useContext, useMemo, useRef } from 'react';
import { Theme } from '../../../defaults';
import { mergeRefs } from '../../../utils';
import { Button, ButtonProps } from '../../Button';
import { AutocompleteDropContext } from './AutocompleteDrop';

export interface AutocompleteOptionProps
  extends Omit<ButtonProps, 'value' | 'title' | 'index' | 'active'> {
  value: unknown;
  title?: string;
  index?: number;
  active?: boolean;
}

export const AutocompleteOption = forwardRef<
  HTMLButtonElement,
  AutocompleteOptionProps
>(({ value, title, index, active, ...rest }, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mergedRef = useMemo(() => mergeRefs([ref, buttonRef]), []);
  const {
    colors: { primary, onPrimary },
  } = useTheme() as Theme;
  const { setActiveIndex } = useContext(AutocompleteDropContext);
  return (
    <Button
      tabIndex={-1}
      ref={mergedRef}
      onMouseEnter={() => setActiveIndex(index as number)}
      onMouseLeave={() => setActiveIndex(null)}
      sx={{
        paddingX: 1,
        paddingY: 1,
        textAlign: 'left',
        borderRadius: 2,
        fontSize: 2,
      }}
      style={{
        ...(active && { backgroundColor: primary, color: onPrimary }),
      }}
      {...rest}
    />
  );
});
