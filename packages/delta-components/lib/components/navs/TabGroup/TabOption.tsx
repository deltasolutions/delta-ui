import { jsx } from '@theme-ui/core';
import { forwardRef, useCallback } from 'react';
import { Anchor, AnchorProps } from '../../Anchor';

export interface TabOptionProps extends AnchorProps {
  id: string;
  isActive?: boolean;
}

export const TabOption = forwardRef<HTMLAnchorElement, TabOptionProps>(
  ({ children, onClick, href, id, isActive, ...rest }, ref) => {
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
        variant="pure"
        sx={{
          position: 'relative',
          paddingX: 4,
          paddingY: 3,
          borderRadius: 5,
          textAlign: 'center',
          display: 'block',
          cursor: 'default',
          color: 'accentOnSurface',
          '&, &:hover, &:active, &:focus-visible': {
            fontWeight: 600,
          },
          '&:focus-visible': {
            zIndex: 1,
            outline: '2px solid',
            outlineColor: 'primary',
          },
          ...(isActive && {
            backgroundColor: 'accentSurface',
          }),
        }}
        href={href ?? '#'}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </Anchor>
    );
  }
);
