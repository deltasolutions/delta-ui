import { jsx } from '@theme-ui/core';
import { forwardRef, ReactNode } from 'react';
import { BoxProps, Box } from '../Box';

export interface AutocompleteOptionProps extends BoxProps {
  isActive?: boolean;
  value: string | number;
}
export const AutocompleteOption = forwardRef<
  HTMLDivElement,
  AutocompleteOptionProps
>(({ value, isActive, ...rest }: AutocompleteOptionProps, ref) => {
  return (
    <Box
      style={{
        ...(isActive && {
          backgroundColor: 'blue',
          color: 'white',
        }),
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
        fontWeight: 400,
      }}
      {...rest}
      ref={ref}
    />
  );
});
