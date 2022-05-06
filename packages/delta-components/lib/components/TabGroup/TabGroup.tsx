import { jsx } from '@theme-ui/core';
import { Children, FC, forwardRef, HTMLAttributes, ReactElement } from 'react';
import { Box } from '../Box';
import { TabContext } from './TabContext';
import { TabOptionProps } from './TabOption';

export interface TabGroupProps
  extends Omit<HTMLAttributes<HTMLUListElement>, 'value' | 'children'> {
  activeId?: string;
  children: ReactElement<TabOptionProps> | ReactElement<TabOptionProps>[];
}
export const TabGroup: FC<TabGroupProps> = forwardRef<
  HTMLUListElement,
  TabGroupProps
>(({ children, activeId = '', ...rest }, ref) => {
  return (
    <Box>
      <ul
        ref={ref}
        sx={{
          textDecoration: 'none',
          padding: 0,
          margin: 0,
          listStyle: 'none',
          position: 'relative',
          display: 'inline-flex'
        }}
        {...rest}
      >
        <TabContext.Provider value={{ activeId }}>
          {Children.map(children, (child: ReactElement<TabOptionProps>) => (
            <li
              sx={{
                textDecoration: 'none',
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}
            >
              {child}
            </li>
          ))}
        </TabContext.Provider>
      </ul>
    </Box>
  );
});
