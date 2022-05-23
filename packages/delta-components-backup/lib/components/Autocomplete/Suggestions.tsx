import { jsx } from '@theme-ui/core';
import { forwardRef, ReactNode } from 'react';
import { useTheme } from '../../hooks';
import { Box, BoxProps } from '../Box';
import { List, ListProps } from '../List';

export interface SuggestionsProps extends ListProps {}
export const Suggestions = forwardRef<HTMLUListElement, SuggestionsProps>(
  ({ children }: SuggestionsProps, ref) => {
    return (
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
        ref={ref}
      >
        {children}
      </List>
    );
  }
);

export interface SuggestionProps extends BoxProps {
  value: unknown;
  isActive: boolean;
}
export const Suggestion = forwardRef<HTMLDivElement, SuggestionProps>(
  ({ value, isActive, ...rest }: SuggestionProps, ref) => {
    const { colors } = useTheme();
    return (
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
        {...rest}
        ref={ref}
      >
        {value as ReactNode}
      </Box>
    );
  }
);
