import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box } from '../../Box';
import { Checkbox, CheckboxProps } from '../Checkbox';

export interface CheckboxListItemProps extends CheckboxProps {
  isLast?: boolean;
}

export const CheckboxListItem = forwardRef<
  HTMLInputElement,
  CheckboxListItemProps
>(({ children, id, disabled, isLast, ...rest }: CheckboxListItemProps, ref) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <Checkbox size="small" ref={ref} id={id} {...rest}></Checkbox>
      <label
        sx={{
          paddingY: 4,
          width: '100%',
          color: 'onBackgroundAccent',
          ...(!isLast && {
            borderBottomWidth: 1,
            borderBottomColor: 'outline',
            borderBottomStyle: 'solid'
          })
        }}
        htmlFor={id}
      >
        {children}
      </label>
    </Box>
  );
});
