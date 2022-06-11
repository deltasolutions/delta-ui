import { jsx } from '@theme-ui/core';
import { forwardRef, useCallback } from 'react';
import { Anchor, AnchorProps } from '../../Anchor';

export interface TabOptionProps extends Omit<AnchorProps, 'variant'> {
  id: string;
  isActive?: boolean;
  variant?: 'major' | 'gaunt';
}

export const TabOption = forwardRef<HTMLAnchorElement, TabOptionProps>(
  (
    { children, onClick, variant = 'gaunt', href, id, isActive, ...rest },
    ref
  ) => {
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
        sx={{ ...getVariantStyle({ variant, isActive }) }}
        variant="pure"
        onClick={handleClick}
        {...rest}
      >
        {children}
      </Anchor>
    );
  }
);

const getVariantStyle = ({
  variant,
  isActive,
}: Pick<TabOptionProps, 'variant' | 'isActive'>) => {
  if (variant === 'gaunt') {
    return {
      fontSize: 2,
      padding: '8px 12px',
      borderRadius: '32px',
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
    };
  }

  if (variant === 'major') {
    return {
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
    };
  }
  return {};
};
