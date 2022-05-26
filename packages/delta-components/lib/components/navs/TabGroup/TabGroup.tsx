import { jsx } from '@theme-ui/core';
import {
  Children,
  cloneElement,
  FC,
  forwardRef,
  HTMLAttributes,
  ReactElement,
} from 'react';
import { Box } from '../../containers';
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
          display: 'inline-flex',
        }}
        {...rest}
      >
        {Children.map(children, (child: ReactElement<TabOptionProps>) => (
          <li
            sx={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              textDecoration: 'none',
            }}
          >
            {cloneElement(child, { isActive: activeId === child.props.id })}
          </li>
        ))}
      </ul>
    </Box>
  );
});
