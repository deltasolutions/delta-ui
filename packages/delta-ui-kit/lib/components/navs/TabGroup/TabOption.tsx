import { jsx } from '@theme-ui/core';
import { forwardRef, useCallback, useContext } from 'react';
import { Anchor, AnchorProps } from '../../Anchor';
import { TabContext } from './TabContext';

export interface TabOptionProps extends Omit<AnchorProps, 'variant'> {
  id: string;
  isActive?: boolean;
}

export const TabOption = forwardRef<HTMLAnchorElement, TabOptionProps>(
  ({ children, onClick, href, id, ...rest }, ref) => {
    const { activeId } = useContext(TabContext);
    const isActive = id === activeId;
    const handleClick = useCallback(
      e => {
        if (!href) {
          onClick?.(e);
          e.preventDefault();
        } else {
          onClick?.(e);
        }
      },
      [href]
    );
    return (
      <Anchor
        ref={ref}
        href={href ?? '#'}
        sx={{
          display: 'block',
          fontSize: 2,
          padding: '8px 12px',
          borderRadius: 5,
          mx: '3px',
          ...(isActive
            ? {
                backgroundColor: 'accentOnSurface',
                color: '#000000',
                '&:hover, &:focus-visible, &:active': {
                  color: '#000000',
                },
              }
            : {
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                color: 'accentOnSurface',
                '&:hover, &:active, &:focus-visible': {
                  backgroundColor: 'rgba(255, 255, 255, 0.09)',
                },
              }),
        }}
        variant="pure"
        onClick={handleClick}
        {...rest}
      >
        {children}
      </Anchor>
    );
  }
);
