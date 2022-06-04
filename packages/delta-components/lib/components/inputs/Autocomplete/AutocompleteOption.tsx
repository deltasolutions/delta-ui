import { useTheme } from '@emotion/react';
import { jsx } from '@theme-ui/core';
import { forwardRef, useContext, useMemo, useRef } from 'react';
import { Theme } from '../../../defaults';
import { mergeRefs } from '../../../utils';
import { Button, ButtonProps } from '../../Button';
import { AutocompleteDropContext } from './Autocomplete';

export interface AutocompleteOptionProps extends Omit<ButtonProps, 'value'> {
  value: string;
  isActive?: boolean;
  index?: number;
}

export const AutocompleteOption = forwardRef<
  HTMLButtonElement,
  AutocompleteOptionProps
>(({ value, isActive, index, ...rest }, propsRef) => {
  const ref = useRef<HTMLButtonElement>(null);
  const mergedRef = useMemo(() => mergeRefs([ref, propsRef]), [ref, propsRef]);
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
        fontSize: 2,
        outline: 'none',
        borderRadius: 2,
        transition: 'background-color 30ms ease-out, color 30ms ease-out',
      }}
      style={{
        ...(isActive && { backgroundColor: primary, color: onPrimary }),
      }}
      {...rest}
    />
  );
});
