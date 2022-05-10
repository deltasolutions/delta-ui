import { useId } from '@floating-ui/react-dom-interactions';
import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { ListItem, ListItemProps } from '../../List';

export interface AutocompleteOptionProps extends ListItemProps {
  isActive: boolean;
}

export const AutocompleteOption = forwardRef<
  HTMLLIElement,
  AutocompleteOptionProps
>(({ children, isActive, ...rest }, ref) => {
  const id = useId();
  return (
    <ListItem
      ref={ref}
      role="option"
      id={id}
      aria-selected={isActive}
      {...rest}
      sx={{
        cursor: 'default',
        width: '100%',
        paddingX: 4,
        paddingY: 1,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        overflow: 'hidden',
        ...(isActive && {
          backgroundColor: 'inversePrimary',
          color: 'onInversePrimary'
        }),
        fontWeight: 400
      }}
    >
      {children}
    </ListItem>
  );
});
