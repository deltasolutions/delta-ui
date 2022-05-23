import { jsx } from '@theme-ui/core';
import { forwardRef, useCallback } from 'react';
import { Anchor, AnchorProps } from '../Anchor';
import { Heading } from '../Heading';
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
        underline="none"
        sx={{
          paddingX: 6,
          paddingY: 4,
          borderRadius: 5,
          textAlign: 'center',
          display: 'inline-block',
          ...(isActive && {
            backgroundColor: 'surfaceTint'
          })
        }}
        href={href ?? '#'}
        onClick={handleClick}
        {...rest}
      >
        <Heading level={5}>{children}</Heading>
      </Anchor>
    );
  }
);
