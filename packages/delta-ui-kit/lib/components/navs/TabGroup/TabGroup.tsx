import { jsx } from '@theme-ui/core';
import { FC, forwardRef, HTMLAttributes, ReactElement } from 'react';
import { Box } from '../../containers';
import { TabContext } from './TabContext';
import { TabOptionProps } from './TabOption';

export interface TabGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'value' | 'children'> {
  activeId?: string;
  children: ReactElement<TabOptionProps> | ReactElement<TabOptionProps>[];
}

export const TabGroup: FC<TabGroupProps> = forwardRef<
  HTMLDivElement,
  TabGroupProps
>(({ children, activeId = '', ...rest }, ref) => {
  return (
    <TabContext.Provider value={{ activeId }}>
      <Box
        ref={ref}
        sx={{
          position: 'relative',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
        {...rest}
      >
        {children}
      </Box>
    </TabContext.Provider>
  );
});
